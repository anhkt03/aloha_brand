"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/auth";
import { feedbackSchema } from "@/lib/validation/enrollment";
export async function saveFeedback(formData: FormData) { await requireAdminUser(); const p = feedbackSchema.safeParse({ id: formData.get("id") || undefined, name: formData.get("name"), rating: formData.get("rating"), comment: formData.get("comment"), active: formData.get("active") === "on" }); if (!p.success) throw new Error("Đánh giá không hợp lệ."); const { id, ...data } = p.data; if (id) await prisma.feedback.update({ where: { id }, data }); else await prisma.feedback.create({ data }); revalidatePath("/admin/feedback"); revalidatePath("/vi"); }
export async function deleteFeedback(id: number) { await requireAdminUser(); await prisma.feedback.delete({ where: { id } }); revalidatePath("/admin/feedback"); }
