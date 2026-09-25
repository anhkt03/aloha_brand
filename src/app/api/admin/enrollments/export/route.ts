import ExcelJS from "exceljs";
import { NextRequest, NextResponse } from "next/server";
import { EnrollmentStatus, EnrollmentType } from "@prisma/client";
import { z } from "zod";
import { requireAdminUser } from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit";
import { listEnrollments } from "@/lib/dal/enrollments";

const TYPE_LABELS: Record<EnrollmentType, string> = { TRIAL: "Học thử", REAL: "Học chính thức" };
const STATUS_LABELS: Record<EnrollmentStatus, string> = {
  PENDING: "Chờ xử lý",
  CONFIRMED: "Đã xác nhận",
  CANCELLED: "Đã hủy",
  COMPLETED: "Hoàn thành",
};

// DB timestamps are stored as Vietnam wall-clock; force `timeZone: "UTC"` on
// read so this doesn't get shifted by the server process's own timezone —
// same convention as `formatDate` in `@/lib/utils`.
function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(date);
}

export async function GET(request: NextRequest) {
  const actor = await requireAdminUser();
  const params = request.nextUrl.searchParams;

  const statusParam = z.nativeEnum(EnrollmentStatus).safeParse(params.get("status"));
  const status = statusParam.success ? statusParam.data : undefined;
  const dateFrom = params.get("dateFrom") ?? undefined;
  const dateTo = params.get("dateTo") ?? undefined;
  const page = Number(params.get("page")) || 1;
  const pageSize = Number(params.get("pageSize")) || 20;

  // Same DAL call as the admin list page, with the same page/pageSize/filters
  // it was given — the export always matches exactly what's on screen rather
  // than dumping the whole table.
  const { items: enrollments, page: currentPage, pageSize: size, total } = await listEnrollments({ status, dateFrom, dateTo, page, pageSize });

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "ALOHA Admin";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("Đăng ký học");
  sheet.columns = [
    { header: "Mã đăng ký", key: "id", width: 12 },
    { header: "Họ tên", key: "name", width: 24 },
    { header: "Số điện thoại", key: "phone", width: 16 },
    { header: "Email", key: "email", width: 26 },
    { header: "Loại đăng ký", key: "type", width: 16 },
    { header: "Khóa học", key: "course", width: 28 },
    { header: "Danh mục", key: "category", width: 20 },
    { header: "Cấp độ", key: "level", width: 16 },
    { header: "Trạng thái", key: "status", width: 16 },
    { header: "Ghi chú", key: "note", width: 32 },
    { header: "Ngày đăng ký", key: "createdAt", width: 18 },
    { header: "Cập nhật lần cuối", key: "updatedAt", width: 18 },
  ];
  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE5E7EB" } };
  sheet.views = [{ state: "frozen", ySplit: 1 }];
  sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: sheet.columns.length } };

  for (const item of enrollments) {
    sheet.addRow({
      id: item.id,
      name: item.name,
      phone: item.phone,
      email: item.email ?? "",
      type: TYPE_LABELS[item.type],
      course: item.course.translations[0]?.title ?? `Khóa học ${item.course.id}`,
      category: item.course.category.translations[0]?.name ?? "",
      level: item.course.level.translations[0]?.name ?? "",
      status: STATUS_LABELS[item.status],
      note: item.note ?? "",
      createdAt: formatDateTime(item.createdAt),
      updatedAt: formatDateTime(item.updatedAt),
    });
  }

  await writeAuditLog({
    actorUserId: actor.id,
    action: "EXPORT",
    entity: "Enrollment",
    metadata: { count: enrollments.length, total, page: currentPage, pageSize: size, status, dateFrom, dateTo },
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const fileName = `dang-ky-hoc-vien-trang${currentPage}-${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${fileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
      "Content-Length": String(buffer.byteLength),
    },
  });
}
