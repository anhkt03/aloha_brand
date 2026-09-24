"use server";

import { CourseStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeAuditLog } from "@/lib/audit";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { courseFromForm, courseSchema } from "@/lib/validation/course";

const invalidate = () => {
  revalidatePath("/admin/courses");
  revalidatePath("/vi/training");
};

export type CourseFormState = { message?: string; success?: boolean };

export async function saveCourse(_previous: CourseFormState, formData: FormData): Promise<CourseFormState> {
  const actor = await requireAdminUser();
  const parsed = courseSchema.safeParse(courseFromForm(formData));
  if (!parsed.success) return { message: "Dữ liệu khóa học không hợp lệ. Vui lòng kiểm tra lại các trường bắt buộc." };
  const { id, categoryId, levelId, translations, ...data } = parsed.data;

  try {
    await prisma.$transaction(async (tx) => {
      const item = id
        ? await tx.course.update({ where: { id }, data: { ...data, categoryId, levelId, translations: { deleteMany: {}, create: translations } } })
        : await tx.course.create({ data: { ...data, categoryId, levelId, translations: { create: translations } } });
      await writeAuditLog({ actorUserId: actor.id, action: id ? "UPDATE" : "CREATE", entity: "Course", entityId: item.id }, tx);
    });
  } catch (error) {
    if ((error as { code?: string }).code === "P2003") return { message: "Danh mục hoặc cấp độ đã chọn không hợp lệ." };
    throw error;
  }
  invalidate();
  if (!id) redirect("/admin/courses?created=1");
  return { success: true };
}

export async function setCourseStatus(id: number, status: CourseStatus) {
  const actor = await requireAdminUser();
  await prisma.$transaction(async (tx) => {
    await tx.course.update({ where: { id }, data: { status } });
    await writeAuditLog({ actorUserId: actor.id, action: "UPDATE_STATUS", entity: "Course", entityId: id, metadata: { status } }, tx);
  });
  invalidate();
}

export async function deleteCourse(id: number) {
  const actor = await requireAdminUser();
  await prisma.$transaction(async (tx) => {
    const count = await tx.enrollment.count({ where: { courseId: id } });
    if (count) await tx.course.update({ where: { id }, data: { status: "HIDDEN" } });
    else await tx.course.delete({ where: { id } });
    await writeAuditLog({ actorUserId: actor.id, action: count ? "HIDE" : "DELETE", entity: "Course", entityId: id }, tx);
  });
  invalidate();
}
