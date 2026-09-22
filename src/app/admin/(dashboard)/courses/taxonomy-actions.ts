"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/auth";
import { courseLevelSchema, courseTypeSchema, translationsFromForm } from "@/lib/validation/course-taxonomy";

function invalidate() { revalidatePath("/admin/courses"); revalidatePath("/admin/courses/types"); }

export async function saveCourseType(formData: FormData) {
  await requireAdminUser();
  const parsed = courseTypeSchema.safeParse({ id: formData.get("id") || undefined, iconUrl: formData.get("iconUrl"), sortOrder: formData.get("sortOrder"), translations: translationsFromForm(formData) });
  if (!parsed.success) throw new Error("Dữ liệu loại khóa học không hợp lệ.");
  const { id, iconUrl, sortOrder, translations } = parsed.data;
  if (id) await prisma.courseType.update({ where: { id }, data: { iconUrl: iconUrl || null, sortOrder, translations: { upsert: translations.map((item) => ({ where: { courseTypeId_locale: { courseTypeId: id, locale: item.locale } }, create: item, update: { name: item.name } })) } } });
  else await prisma.courseType.create({ data: { iconUrl: iconUrl || null, sortOrder, translations: { create: translations } } });
  invalidate();
}

export async function toggleCourseType(id: number) { await requireAdminUser(); const item = await prisma.courseType.findUniqueOrThrow({ where: { id } }); await prisma.courseType.update({ where: { id }, data: { active: !item.active } }); invalidate(); }
export async function deleteCourseType(id: number) { await requireAdminUser(); const item = await prisma.courseType.findUniqueOrThrow({ where: { id }, include: { _count: { select: { levels: true, courses: true } } } }); if (item._count.levels || item._count.courses) throw new Error("Không thể xóa loại khóa học đang có cấp độ hoặc khóa học."); await prisma.courseType.delete({ where: { id } }); invalidate(); }

export async function saveCourseLevel(formData: FormData) {
  await requireAdminUser();
  const parsed = courseLevelSchema.safeParse({ id: formData.get("id") || undefined, courseTypeId: formData.get("courseTypeId"), sortOrder: formData.get("sortOrder"), translations: translationsFromForm(formData) });
  if (!parsed.success) throw new Error("Dữ liệu cấp độ không hợp lệ.");
  const { id, courseTypeId, sortOrder, translations } = parsed.data;
  if (id) await prisma.courseLevel.update({ where: { id }, data: { courseTypeId, sortOrder, name: translations[0].name, translations: { upsert: translations.map((item) => ({ where: { courseLevelId_locale: { courseLevelId: id, locale: item.locale } }, create: item, update: { name: item.name } })) } } });
  else await prisma.courseLevel.create({ data: { courseTypeId, sortOrder, name: translations[0].name, translations: { create: translations } } });
  invalidate(); revalidatePath(`/admin/courses/types/${courseTypeId}`);
}

export async function toggleCourseLevel(id: number) { await requireAdminUser(); const item = await prisma.courseLevel.findUniqueOrThrow({ where: { id } }); await prisma.courseLevel.update({ where: { id }, data: { active: !item.active } }); invalidate(); }
export async function deleteCourseLevel(id: number) { await requireAdminUser(); const item = await prisma.courseLevel.findUniqueOrThrow({ where: { id }, include: { _count: { select: { courses: true } } } }); if (item._count.courses) throw new Error("Không thể xóa cấp độ đang có khóa học."); await prisma.courseLevel.delete({ where: { id } }); invalidate(); }
