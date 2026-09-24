"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/auth";
import { taxonomySchema, translationsFromForm } from "@/lib/validation/course-taxonomy";

function invalidate() {
  revalidatePath("/admin/courses");
  revalidatePath("/admin/courses/categories");
  revalidatePath("/admin/courses/levels");
  revalidatePath("/vi/training");
}

export async function saveCourseCategory(formData: FormData) {
  await requireAdminUser();
  const parsed = taxonomySchema.safeParse({ id: formData.get("id") || undefined, translations: translationsFromForm(formData) });
  if (!parsed.success) throw new Error("Dữ liệu danh mục không hợp lệ.");
  const { id, translations } = parsed.data;
  if (id) {
    await prisma.courseCategory.update({
      where: { id },
      data: { translations: { upsert: translations.map((item) => ({ where: { categoryId_locale: { categoryId: id, locale: item.locale } }, create: item, update: { name: item.name } })) } },
    });
  } else {
    await prisma.courseCategory.create({ data: { translations: { create: translations } } });
  }
  invalidate();
}

export async function deleteCourseCategory(id: number) {
  await requireAdminUser();
  const item = await prisma.courseCategory.findUniqueOrThrow({ where: { id }, include: { _count: { select: { courses: true } } } });
  if (item._count.courses) throw new Error("Không thể xóa danh mục đang có khóa học.");
  await prisma.courseCategory.delete({ where: { id } });
  invalidate();
}

export async function saveCourseLevel(formData: FormData) {
  await requireAdminUser();
  const parsed = taxonomySchema.safeParse({ id: formData.get("id") || undefined, translations: translationsFromForm(formData) });
  if (!parsed.success) throw new Error("Dữ liệu cấp độ không hợp lệ.");
  const { id, translations } = parsed.data;
  if (id) {
    await prisma.courseLevel.update({
      where: { id },
      data: { translations: { upsert: translations.map((item) => ({ where: { courseLevelId_locale: { courseLevelId: id, locale: item.locale } }, create: item, update: { name: item.name } })) } },
    });
  } else {
    await prisma.courseLevel.create({ data: { translations: { create: translations } } });
  }
  invalidate();
}

export async function deleteCourseLevel(id: number) {
  await requireAdminUser();
  const item = await prisma.courseLevel.findUniqueOrThrow({ where: { id }, include: { _count: { select: { courses: true } } } });
  if (item._count.courses) throw new Error("Không thể xóa cấp độ đang có khóa học.");
  await prisma.courseLevel.delete({ where: { id } });
  invalidate();
}
