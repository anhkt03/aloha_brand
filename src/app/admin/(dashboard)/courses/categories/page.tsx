import { listCourseCategories } from "@/lib/dal/course-taxonomy";
import { DataTable } from "@/components/admin/data-table";
import { PageHeader, buttonBase, buttonVariants } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Icon, ICON_PATHS } from "@/components/admin/icons";
import { cn } from "@/lib/utils";
import { TaxonomyDialog } from "../taxonomy-dialog";
import { deleteCourseCategory, saveCourseCategory } from "../taxonomy-actions";

export default async function CourseCategoriesPage() {
  const categories = await listCourseCategories();
  return (
    <>
      <PageHeader
        eyebrow="Đào tạo"
        title="Danh mục khóa học"
        actions={
          <TaxonomyDialog
            action={saveCourseCategory}
            title="Thêm danh mục khóa học"
            trigger="+ Thêm danh mục"
            triggerClassName={cn(buttonBase, buttonVariants.primary)}
          />
        }
      />
      <DataTable headers={["Tên", "Khóa học", "Thao tác"]} isEmpty={!categories.length}>
        {categories.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-3 font-semibold text-slate-900">{item.translations.find((t) => t.locale === "vi")?.name ?? "—"}</td>
            <td className="px-4 py-3">{item._count.courses}</td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1">
                <TaxonomyDialog
                  action={saveCourseCategory}
                  item={item}
                  title="Chỉnh sửa danh mục khóa học"
                  trigger={<Icon path={ICON_PATHS.edit} />}
                  triggerLabel="Chỉnh sửa"
                  triggerClassName="grid h-8 w-8 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                />
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
                    <SubmitButton variant="danger" pendingText="Đang xóa..." disabled={item._count.courses > 0}>Xác nhận xóa</SubmitButton>
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
