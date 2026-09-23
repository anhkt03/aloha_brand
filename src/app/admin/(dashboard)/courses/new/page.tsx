import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/ui";
import { CourseForm } from "../course-form";
import { saveCourse } from "../actions";

export default async function NewCoursePage() {
  const types = await prisma.courseType.findMany({
    where: { active: true },
    include: { translations: { where: { locale: "vi" } }, levels: { where: { active: true }, include: { translations: { where: { locale: "vi" } } } } },
  });
  return (
    <>
      <PageHeader eyebrow="Đào tạo" title="Thêm khóa học" />
      <CourseForm action={saveCourse} types={types} />
    </>
  );
}
