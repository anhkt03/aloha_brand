import { listCourseCategories } from "@/lib/dal/course-taxonomy";
import { DataTable } from "@/components/admin/data-table";
import { Button, LinkButton, PageHeader } from "@/components/admin/ui";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Icon, IconLink, ICON_PATHS } from "@/components/admin/icons";
import { deleteCourseCategory } from "../taxonomy-actions";

export default async function CourseCategoriesPage() {
  const categories = await listCourseCategories();
  return (
    <>
      <PageHeader eyebrow="Đào tạo" title="Danh mục khóa học" actions={<LinkButton href="/admin/courses/categories/new">+ Thêm danh mục</LinkButton>} />
      <DataTable headers={["Tên", "Khóa học", "Thao tác"]} isEmpty={!categories.length}>
        {categories.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-3 font-semibold text-slate-900">{item.translations[0]?.name ?? "—"}</td>
            <td className="px-4 py-3">{item._count.courses}</td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1">
                <IconLink href={`/admin/courses/categories/${item.id}`} label="Chỉnh sửa" path={ICON_PATHS.edit} />
                <ConfirmDialog
                  trigger={<Icon path={ICON_PATHS.trash} />}
                  triggerLabel="Xóa danh mục"
                  triggerClassName="grid h-8 w-8 place-items-center rounded-md text-red-600 transition hover:bg-red-50"
                  description={
                    item._count.courses
                      ? "Danh mục này đang có khóa học nên không thể xóa. Hãy chuyển hết khóa học sang danh mục khác trước."
                      : "Xóa vĩnh viễn danh mục này? Thao tác không thể hoàn tác."
                  }
                >
                  <form action={deleteCourseCategory.bind(null, item.id)}>
                    <Button type="submit" variant="danger" disabled={item._count.courses > 0}>Xác nhận xóa</Button>
                  </form>
                </ConfirmDialog>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}
