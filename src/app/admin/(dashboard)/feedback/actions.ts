"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit";
import { feedbackSchema } from "@/lib/validation/enrollment";
export async function saveFeedback(formData: FormData) { const actor = await requireAdminUser(); const p = feedbackSchema.safeParse({ id: formData.get("id") || undefined, name: formData.get("name"), rating: formData.get("rating"), comment: formData.get("comment"), active: formData.get("active") === "on" }); if (!p.success) throw new Error("Đánh giá không hợp lệ."); const { id, ...data } = p.data; await prisma.$transaction(async tx => { const item = id ? await tx.feedback.update({ where: { id }, data }) : await tx.feedback.create({ data }); await writeAuditLog({ actorUserId: actor.id, action: id ? "UPDATE" : "CREATE", entity: "Feedback", entityId: item.id }, tx); }); revalidatePath("/admin/feedback"); revalidatePath("/vi"); }
export async function deleteFeedback(id: number) { const actor = await requireAdminUser(); await prisma.$transaction(async tx => { await tx.feedback.delete({ where: { id } }); await writeAuditLog({ actorUserId: actor.id, action: "DELETE", entity: "Feedback", entityId: id }, tx); }); revalidatePath("/admin/feedback"); }
