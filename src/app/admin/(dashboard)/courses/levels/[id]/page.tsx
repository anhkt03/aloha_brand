import { notFound } from "next/navigation";
import { getCourseLevel } from "@/lib/dal/course-taxonomy";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button, PageHeader } from "@/components/admin/ui";
import { TaxonomyForm } from "../../taxonomy-form";
import { deleteCourseLevel, saveCourseLevel } from "../../taxonomy-actions";

export default async function CourseLevelPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  const item = await getCourseLevel(id);
  if (!item) notFound();
  return (
    <>
      <PageHeader
        eyebrow="Đào tạo"
        title="Chỉnh sửa cấp độ"
        actions={
          <ConfirmDialog description="Xóa cấp độ này? Chỉ xóa được khi không còn khóa học nào thuộc cấp độ.">
            <form action={deleteCourseLevel.bind(null, id)}>
              <Button type="submit" variant="danger">Xác nhận xóa</Button>
            </form>
          </ConfirmDialog>
        }
      />
      <TaxonomyForm action={saveCourseLevel} item={item} />
    </>
  );
}
