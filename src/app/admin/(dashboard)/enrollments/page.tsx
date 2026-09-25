import { EnrollmentStatus, EnrollmentType } from "@prisma/client";
import { listEnrollments, PAGE_SIZE_OPTIONS } from "@/lib/dal/enrollments";
import { setEnrollmentStatus } from "./actions";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/admin/status-badge";
import { PageHeader, buttonBase, buttonVariants } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";
import { Pagination } from "@/components/admin/pagination";
import { PageSizeSelect } from "@/components/admin/page-size-select";
import { formatDate, cn } from "@/lib/utils";

const STATUS_LABELS: Record<EnrollmentStatus, string> = { PENDING: "Chờ xử lý", CONFIRMED: "Đã xác nhận", CANCELLED: "Đã hủy", COMPLETED: "Hoàn thành" };
const STATUS_TONE: Record<EnrollmentStatus, "warning" | "success" | "danger"> = { PENDING: "warning", CONFIRMED: "success", CANCELLED: "danger", COMPLETED: "success" };
const TYPE_LABELS: Record<EnrollmentType, string> = { TRIAL: "Học thử", REAL: "Học chính thức" };
const filterInputClass = "mt-1.5 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

type Search = { status?: EnrollmentStatus; dateFrom?: string; dateTo?: string; page?: string; pageSize?: string };

export default async function EnrollmentsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const search = await searchParams;
  const page = Number(search.page) || 1;
  const pageSize = Number(search.pageSize) || 20;
  const { items, page: currentPage, totalPages, total } = await listEnrollments({
    status: search.status,
    dateFrom: search.dateFrom,
    dateTo: search.dateTo,
    page,
    pageSize,
  });

  const baseParams = () => {
    const params = new URLSearchParams();
    if (search.status) params.set("status", search.status);
    if (search.dateFrom) params.set("dateFrom", search.dateFrom);
    if (search.dateTo) params.set("dateTo", search.dateTo);
    return params;
  };

  const makeHref = (overrides: { page?: number; pageSize?: number }) => {
    const params = baseParams();
    params.set("pageSize", String(overrides.pageSize ?? pageSize));
    params.set("page", String(overrides.page ?? currentPage));
    return `/admin/enrollments?${params.toString()}`;
  };

  const exportParams = baseParams();
  exportParams.set("page", String(currentPage));
  exportParams.set("pageSize", String(pageSize));
  const exportHref = `/api/admin/enrollments/export?${exportParams.toString()}`;

  return (
    <>
      <PageHeader
        eyebrow="Học viên"
        title="Đăng ký học"
        actions={
          <a href={exportHref} className={cn(buttonBase, buttonVariants.ghost)}>
            Xuất Excel (trang này)
          </a>
        }
      />

      <form className="mb-4 flex flex-wrap items-end gap-2">
        <label className="text-sm font-semibold text-slate-700">
          Trạng thái
          <select name="status" defaultValue={search.status ?? ""} className={cn(filterInputClass, "block w-44")}>
            <option value="">Tất cả</option>
            {Object.values(EnrollmentStatus).map((status) => (
              <option key={status} value={status}>{STATUS_LABELS[status]}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Từ ngày
          <input type="date" name="dateFrom" defaultValue={search.dateFrom} className={cn(filterInputClass, "block")} />
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Đến ngày
          <input type="date" name="dateTo" defaultValue={search.dateTo} className={cn(filterInputClass, "block")} />
        </label>
        <button type="submit" className="rounded-md border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          Lọc
        </button>
        <div className="ml-auto"><PageSizeSelect value={pageSize} options={PAGE_SIZE_OPTIONS} /></div>
      </form>

      <DataTable headers={["Học viên", "Khóa học", "Loại", "Trạng thái", "Ngày đăng ký", "Cập nhật"]} isEmpty={!items.length}>
        {items.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-3">
              <b className="text-slate-900">{item.name}</b>
              <small className="block text-slate-400">{item.phone} · {item.email}</small>
            </td>
            <td className="px-4 py-3 text-sm">{item.course.translations[0]?.title}</td>
            <td className="px-4 py-3 text-sm">{TYPE_LABELS[item.type]}</td>
            <td className="px-4 py-3"><Badge tone={STATUS_TONE[item.status]}>{STATUS_LABELS[item.status]}</Badge></td>
            <td className="px-4 py-3 text-sm text-slate-500">{formatDate(item.createdAt)}</td>
            <td className="px-4 py-3">
              <form
                action={async (data) => {
                  "use server";
                  await setEnrollmentStatus(item.id, data.get("status") as EnrollmentStatus);
                }}
                className="flex items-center gap-2"
              >
                <select name="status" defaultValue={item.status} className="rounded-md border border-slate-300 px-2 py-1 text-sm">
                  {Object.values(EnrollmentStatus).map((status) => (
                    <option key={status} value={status}>{STATUS_LABELS[status]}</option>
                  ))}
                </select>
                <SubmitButton pendingText="Đang lưu..." className="text-sm font-semibold text-indigo-600">Lưu</SubmitButton>
              </form>
            </td>
          </tr>
        ))}
      </DataTable>

      {items.length ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-400">Trang {currentPage}/{totalPages} — {total} đăng ký</p>
          <Pagination page={currentPage} totalPages={totalPages} makeHref={(p) => makeHref({ page: p })} />
        </div>
      ) : null}
    </>
  );
}
