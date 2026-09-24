import { prisma } from "@/lib/prisma";
import { PageHeader, LinkButton } from "@/components/admin/ui";
import { Icon, ICON_PATHS } from "@/components/admin/icons";
import { CourseForm } from "../course-form";
import { saveCourse } from "../actions";

export default async function NewCoursePage() {
  const [categories, levels] = await Promise.all([
    prisma.courseCategory.findMany({ include: { translations: { where: { locale: "vi" } } } }),
    prisma.courseLevel.findMany({ include: { translations: { where: { locale: "vi" } } } }),
  ]);
  return (
    <>
      <PageHeader
        eyebrow="Đào tạo"
        title="Thêm khóa học"
        actions={<LinkButton href="/admin/courses" variant="ghost"><Icon path={ICON_PATHS.back} className="h-4 w-4" />Quay lại</LinkButton>}
      />
      <CourseForm action={saveCourse} categories={categories} levels={levels} />
    </>
  );
}
