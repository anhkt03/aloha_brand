import { notFound } from "next/navigation";
import { getCourseCategory } from "@/lib/dal/course-taxonomy";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button, PageHeader } from "@/components/admin/ui";
import { TaxonomyForm } from "../../taxonomy-form";
import { deleteCourseCategory, saveCourseCategory } from "../../taxonomy-actions";

export default async function CourseCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  const item = await getCourseCategory(id);
  if (!item) notFound();
  return (
    <>
      <PageHeader
        eyebrow="Đào tạo"
        title="Chỉnh sửa danh mục"
        actions={
          <ConfirmDialog description="Xóa danh mục này? Chỉ xóa được khi không còn khóa học nào thuộc danh mục.">
            <form action={deleteCourseCategory.bind(null, id)}>
              <Button type="submit" variant="danger">Xác nhận xóa</Button>
            </form>
          </ConfirmDialog>
        }
      />
      <TaxonomyForm action={saveCourseCategory} item={item} />
    </>
  );
}
