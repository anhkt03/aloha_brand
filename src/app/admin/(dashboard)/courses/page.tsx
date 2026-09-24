import { CourseStatus } from "@prisma/client";
import { listCourses, PAGE_SIZE_OPTIONS } from "@/lib/dal/courses";
import { deleteCourse } from "./actions";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/admin/status-badge";
import { LinkButton, PageHeader } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";
import { ListFilters } from "@/components/admin/list-filters";
import { Pagination } from "@/components/admin/pagination";
import { PageSizeSelect } from "@/components/admin/page-size-select";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Icon, ICON_PATHS, IconLink } from "@/components/admin/icons";
import { FormSuccess } from "@/components/admin/form-success";

const STATUS_LABELS: Record<CourseStatus, string> = { HIDDEN: "Ẩn", PUBLISHED: "Công khai" };
const STATUS_TONE: Record<CourseStatus, "success" | "neutral"> = { HIDDEN: "neutral", PUBLISHED: "success" };

export default async function CoursesPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: CourseStatus; page?: string; pageSize?: string; created?: string }> }) {
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

      {search.created === "1" ? <div className="mb-4"><FormSuccess message="Đã thêm khóa học mới thành công." /></div> : null}

      <div className="mb-4 flex flex-nowrap items-center justify-between gap-3 overflow-x-auto pb-1">
        <ListFilters
          searchPlaceholder="Tìm tên khóa học"
          statusOptions={Object.values(CourseStatus).map((status) => ({ value: status, label: STATUS_LABELS[status] }))}
        />
        <PageSizeSelect value={pageSize} options={PAGE_SIZE_OPTIONS} />
      </div>

      <DataTable headers={["Khóa học", "Danh mục", "Cấp độ", "Trạng thái", "Đăng ký", "Thao tác"]} isEmpty={!items.length} maxHeight="70vh">
        {items.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-3"><b className="text-slate-900">{item.translations[0]?.title ?? `Khóa học ${item.id}`}</b></td>
            <td className="px-4 py-3 text-sm">{item.category.translations[0]?.name ?? "—"}</td>
            <td className="px-4 py-3 text-sm">{item.level.translations[0]?.name ?? "—"}</td>
            <td className="px-4 py-3"><Badge tone={STATUS_TONE[item.status]}>{STATUS_LABELS[item.status]}</Badge></td>
            <td className="px-4 py-3">{item._count.enrollments}</td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1">
                <IconLink href={`/admin/courses/${item.id}`} label="Chỉnh sửa" path={ICON_PATHS.edit} />
                <ConfirmDialog
                  trigger={<Icon path={ICON_PATHS.trash} />}
                  triggerLabel="Xóa khóa học"
                  triggerClassName="grid h-8 w-8 place-items-center rounded-md text-red-600 transition hover:bg-red-50"
                  description={
                    item._count.enrollments
                      ? "Khóa học đã có học viên đăng ký nên sẽ chỉ được ẩn đi, không xóa hẳn."
                      : "Xóa vĩnh viễn khóa học này? Thao tác không thể hoàn tác."
                  }
                >
                  <form action={deleteCourse.bind(null, item.id)}>
                    <SubmitButton variant="danger" pendingText="Đang xóa...">Xác nhận xóa</SubmitButton>
                  </form>
                </ConfirmDialog>
              </div>
            </td>
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
