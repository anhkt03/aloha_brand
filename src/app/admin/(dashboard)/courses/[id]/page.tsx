import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCourse } from "@/lib/dal/courses";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button, PageHeader } from "@/components/admin/ui";
import { CourseForm } from "../course-form";
import { deleteCourse, saveCourse, setCourseStatus } from "../actions";

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  const course = await getCourse(id);
  if (!course) notFound();
  const [categories, levels] = await Promise.all([
    prisma.courseCategory.findMany({ include: { translations: { where: { locale: "vi" } } } }),
    prisma.courseLevel.findMany({ include: { translations: { where: { locale: "vi" } } } }),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Đào tạo"
        title="Chỉnh sửa khóa học"
        actions={
          <>
            <form action={setCourseStatus.bind(null, id, "HIDDEN")}>
              <Button type="submit" variant="ghost">Ẩn khóa học</Button>
            </form>
            <ConfirmDialog description="Xóa vĩnh viễn khóa học này? Nếu đã có học viên đăng ký, khóa học sẽ chỉ được ẩn thay vì xóa hẳn.">
              <form action={deleteCourse.bind(null, id)}>
                <Button type="submit" variant="danger">Xác nhận xóa</Button>
              </form>
            </ConfirmDialog>
          </>
        }
      />
      <CourseForm action={saveCourse} course={course} categories={categories} levels={levels} />
    </>
  );
}
