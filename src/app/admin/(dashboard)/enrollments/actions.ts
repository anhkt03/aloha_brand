"use server";
import { EnrollmentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit";

export async function setEnrollmentStatus(id: number, status: EnrollmentStatus) {
  const actor = await requireAdminUser();
  await prisma.$transaction(async (tx) => {
    await tx.enrollment.update({ where: { id }, data: { status } });
    await writeAuditLog({ actorUserId: actor.id, action: "UPDATE_STATUS", entity: "Enrollment", entityId: id, metadata: { status } }, tx);
  });
  revalidatePath("/admin/enrollments");
}
