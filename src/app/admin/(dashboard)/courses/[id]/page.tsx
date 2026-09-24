import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCourse } from "@/lib/dal/courses";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { LinkButton, PageHeader } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";
import { Icon, ICON_PATHS } from "@/components/admin/icons";
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
            <LinkButton href="/admin/courses" variant="ghost"><Icon path={ICON_PATHS.back} className="h-4 w-4" />Quay lại</LinkButton>
            {course.status === "HIDDEN" ? (
              <form action={setCourseStatus.bind(null, id, "PUBLISHED")}>
                <SubmitButton variant="ghost" pendingText="Đang mở...">Mở lại</SubmitButton>
              </form>
            ) : (
              <form action={setCourseStatus.bind(null, id, "HIDDEN")}>
                <SubmitButton variant="ghost" pendingText="Đang ẩn...">Ẩn khóa học</SubmitButton>
              </form>
            )}
            <ConfirmDialog description="Xóa vĩnh viễn khóa học này? Nếu đã có học viên đăng ký, khóa học sẽ chỉ được ẩn thay vì xóa hẳn.">
              <form action={deleteCourse.bind(null, id)}>
                <SubmitButton variant="danger" pendingText="Đang xóa...">Xác nhận xóa</SubmitButton>
              </form>
            </ConfirmDialog>
          </>
        }
      />
      <CourseForm action={saveCourse} course={course} categories={categories} levels={levels} />
    </>
  );
}
