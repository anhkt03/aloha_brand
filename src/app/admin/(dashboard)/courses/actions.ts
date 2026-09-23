"use server";

import { CourseStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeAuditLog } from "@/lib/audit";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteManagedImages } from "@/lib/storage";
import { courseFromForm, courseSchema } from "@/lib/validation/course";

const invalidate = () => {
  revalidatePath("/admin/courses");
  revalidatePath("/vi/training");
};

export type CourseFormState = { message?: string };

export async function saveCourse(_previous: CourseFormState, formData: FormData): Promise<CourseFormState> {
  const actor = await requireAdminUser();
  const parsed = courseSchema.safeParse(courseFromForm(formData));
  if (!parsed.success) return { message: "Dữ liệu khóa học không hợp lệ. Vui lòng kiểm tra lại các trường bắt buộc." };
  const { id, courseLevelId, courseTypeId, translations, ...data } = parsed.data;
  const previous = id ? await prisma.course.findUnique({ where: { id }, select: { iconUrl: true } }) : null;
  const level = await prisma.courseLevel.findFirst({ where: { id: courseLevelId, courseTypeId }, select: { id: true } });
  if (!level) return { message: "Cấp độ không thuộc loại khóa học đã chọn." };

  try {
    await prisma.$transaction(async (tx) => {
      const item = id
        ? await tx.course.update({ where: { id }, data: { ...data, courseTypeId, courseLevelId, translations: { deleteMany: {}, create: translations } } })
        : await tx.course.create({ data: { ...data, courseTypeId, courseLevelId, translations: { create: translations } } });
      await writeAuditLog({ actorUserId: actor.id, action: id ? "UPDATE" : "CREATE", entity: "Course", entityId: item.id }, tx);
    });
  } catch (error) {
    if (data.iconUrl && data.iconUrl !== previous?.iconUrl) await deleteManagedImages([data.iconUrl]);
    if ((error as { code?: string }).code === "P2002") return { message: "Slug đã tồn tại." };
    throw error;
  }
  if (previous?.iconUrl && previous.iconUrl !== data.iconUrl) await deleteManagedImages([previous.iconUrl]);
  invalidate();
  if (!id) redirect("/admin/courses");
  return {};
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
  const deletedIcon = await prisma.$transaction(async (tx) => {
    const count = await tx.enrollment.count({ where: { courseId: id } });
    let iconUrl: string | null = null;
    if (count) await tx.course.update({ where: { id }, data: { status: "CLOSED" } });
    else iconUrl = (await tx.course.delete({ where: { id }, select: { iconUrl: true } })).iconUrl;
    await writeAuditLog({ actorUserId: actor.id, action: count ? "CLOSE" : "DELETE", entity: "Course", entityId: id }, tx);
    return iconUrl;
  });
  if (deletedIcon) await deleteManagedImages([deletedIcon]);
  invalidate();
}
