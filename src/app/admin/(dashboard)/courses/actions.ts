"use server";
import { CourseStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/auth";
import { courseFromForm, courseSchema } from "@/lib/validation/course";
const invalidate = () => { revalidatePath("/admin/courses"); revalidatePath("/vi/training"); };
export async function saveCourse(formData: FormData) { await requireAdminUser(); const parsed = courseSchema.safeParse(courseFromForm(formData)); if (!parsed.success) throw new Error("Dữ liệu khóa học không hợp lệ."); const { id, courseLevelId, courseTypeId, translations, ...data } = parsed.data; const level = await prisma.courseLevel.findFirst({ where: { id: courseLevelId, courseTypeId }, select: { id: true } }); if (!level) throw new Error("Cấp độ không thuộc loại khóa học đã chọn."); try { if (id) await prisma.$transaction(async tx => tx.course.update({ where: { id }, data: { ...data, courseTypeId, courseLevelId, translations: { deleteMany: {}, create: translations } } })); else await prisma.$transaction(async tx => tx.course.create({ data: { ...data, courseTypeId, courseLevelId, translations: { create: translations } } })); } catch (error) { if ((error as { code?: string }).code === "P2002") throw new Error("Slug đã tồn tại."); throw error; } invalidate(); }
export async function setCourseStatus(id: number, status: CourseStatus) { await requireAdminUser(); await prisma.course.update({ where: { id }, data: { status } }); invalidate(); }
export async function deleteCourse(id: number) { await requireAdminUser(); const count = await prisma.enrollment.count({ where: { courseId: id } }); if (count) { await prisma.course.update({ where: { id }, data: { status: "CLOSED" } }); } else await prisma.course.delete({ where: { id } }); invalidate(); }
