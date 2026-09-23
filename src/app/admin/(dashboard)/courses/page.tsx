import { CourseStatus } from "@prisma/client";
import { listCourses, PAGE_SIZE_OPTIONS } from "@/lib/dal/courses";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/admin/status-badge";
import { LinkButton, PageHeader, inputClass } from "@/components/admin/ui";
import { SearchInput } from "@/components/admin/search-input";
import { Pagination } from "@/components/admin/pagination";
import { PageSizeSelect } from "@/components/admin/page-size-select";

const STATUS_LABELS: Record<CourseStatus, string> = { OPEN: "Đang mở", COMING_SOON: "Sắp mở", CLOSED: "Đã đóng" };
const STATUS_TONE: Record<CourseStatus, "success" | "warning" | "neutral"> = { OPEN: "success", COMING_SOON: "warning", CLOSED: "neutral" };

export default async function CoursesPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: CourseStatus; page?: string; pageSize?: string }> }) {
  const search = await searchParams;
  const page = Number(search.page) || 1;
  const pageSize = Number(search.pageSize) || 20;
  const { items, page: currentPage, totalPages, total } = await listCourses({ query: search.q, status: search.status, page, pageSize });

  const makeHref = (overrides: { page?: number; pageSize?: number }) => {
    const params = new URLSearchParams();
    if (search.q) params.set("q", search.q);
    if (search.status) params.set("status", search.status);
    params.set("pageSize", String(overrides.pageSize ?? pageSize));
    params.set("page", String(overrides.page ?? currentPage));
    return `/admin/courses?${params.toString()}`;
  };

  return (
    <>
      <PageHeader eyebrow="Đào tạo" title="Khóa học" actions={<LinkButton href="/admin/courses/new">+ Thêm khóa học</LinkButton>} />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <form className="flex flex-wrap gap-2">
          <div className="w-full max-w-xs"><SearchInput defaultValue={search.q} placeholder="Tìm slug hoặc tên khóa học" /></div>
          <select name="status" defaultValue={search.status} className={`${inputClass} mt-0 w-auto`}>
            <option value="">Tất cả trạng thái</option>
            {Object.values(CourseStatus).map((status) => <option key={status} value={status}>{STATUS_LABELS[status]}</option>)}
          </select>
          <button className="rounded-md border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Lọc</button>
        </form>
        <PageSizeSelect value={pageSize} options={PAGE_SIZE_OPTIONS} />
      </div>

      <DataTable headers={["Khóa học", "Loại / Cấp độ", "Trạng thái", "Đăng ký", ""]} isEmpty={!items.length} maxHeight="70vh">
        {items.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-3">
              <b className="text-slate-900">{item.translations[0]?.title ?? item.slug}</b>
              <small className="block text-slate-400">/{item.slug}</small>
            </td>
            <td className="px-4 py-3 text-sm">
              {item.courseType.translations[0]?.name ?? "—"}
              <small className="block text-slate-400">{item.courseLevel.translations[0]?.name ?? "—"}</small>
            </td>
            <td className="px-4 py-3"><Badge tone={STATUS_TONE[item.status]}>{STATUS_LABELS[item.status]}</Badge></td>
            <td className="px-4 py-3">{item._count.enrollments}</td>
            <td className="px-4 py-3"><a href={`/admin/courses/${item.id}`} className="font-semibold text-indigo-600 hover:text-indigo-500">Chỉnh sửa</a></td>
          </tr>
        ))}
      </DataTable>

      {items.length ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-400">
            Trang {currentPage}/{totalPages} — {total} khóa học
          </p>
          <Pagination page={currentPage} totalPages={totalPages} makeHref={(p) => makeHref({ page: p })} />
        </div>
      ) : null}
    </>
  );
}
