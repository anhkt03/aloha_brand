import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/ui";
import { CourseForm } from "../course-form";
import { saveCourse } from "../actions";

export default async function NewCoursePage() {
  const [categories, levels] = await Promise.all([
    prisma.courseCategory.findMany({ include: { translations: { where: { locale: "vi" } } } }),
    prisma.courseLevel.findMany({ include: { translations: { where: { locale: "vi" } } } }),
  ]);
  return (
    <>
      <PageHeader eyebrow="Đào tạo" title="Thêm khóa học" />
      <CourseForm action={saveCourse} categories={categories} levels={levels} />
    </>
  );
}
