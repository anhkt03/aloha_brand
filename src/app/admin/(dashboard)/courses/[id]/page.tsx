import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCourse } from "@/lib/dal/courses";
import { CourseForm } from "../course-form";
import { deleteCourse, saveCourse, setCourseStatus } from "../actions";
export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) { const id = Number((await params).id); const course = await getCourse(id); if (!course) notFound(); const types = await prisma.courseType.findMany({ include: { translations: { where: { locale: "vi" } }, levels: { include: { translations: { where: { locale: "vi" } } } } } }); return <><div className="mb-6 flex items-center justify-between"><h1 className="text-3xl font-black">Chỉnh sửa khóa học</h1><div className="flex gap-2"><form action={setCourseStatus.bind(null, id, "CLOSED")}><button className="btn btn-ghost btn-sm">Đóng khóa học</button></form><form action={deleteCourse.bind(null, id)}><button className="btn btn-ghost btn-sm text-red-700">Xóa</button></form></div></div><CourseForm action={saveCourse} course={course} types={types} /></>; }
