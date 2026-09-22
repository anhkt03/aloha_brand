import { prisma } from "@/lib/prisma";
import { CourseForm } from "../course-form";
import { saveCourse } from "../actions";
export default async function NewCoursePage() { const types = await prisma.courseType.findMany({ include: { translations: { where: { locale: "vi" } }, levels: { include: { translations: { where: { locale: "vi" } } }, where: { active: true } } }, where: { active: true } }); return <><h1 className="mb-6 text-3xl font-black">Thêm khóa học</h1><CourseForm action={saveCourse} types={types} /></>; }
