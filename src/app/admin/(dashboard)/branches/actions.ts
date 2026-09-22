"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/auth";
import { branchSchema } from "@/lib/validation/administration";
export async function saveBranch(formData: FormData) { await requireAdminUser(); const p = branchSchema.safeParse({ id: formData.get("id") || undefined, code: formData.get("code"), name: formData.get("name"), address: formData.get("address"), phone: formData.get("phone") || undefined, mapUrl: formData.get("mapUrl"), lat: formData.get("lat") || undefined, lng: formData.get("lng") || undefined, active: formData.get("active") === "on" }); if (!p.success) throw new Error("Dữ liệu cơ sở không hợp lệ."); const { id, ...data } = p.data; try { if (id) await prisma.branch.update({ where: { id }, data: { ...data, phone: data.phone || null, mapUrl: data.mapUrl || null } }); else await prisma.branch.create({ data: { ...data, phone: data.phone || null, mapUrl: data.mapUrl || null } }); } catch (e) { if ((e as { code?: string }).code === "P2002") throw new Error("Mã cơ sở đã tồn tại."); throw e; } revalidatePath("/admin/branches"); revalidatePath("/vi/branches"); }
export async function deleteBranch(id: number) { await requireAdminUser(); await prisma.branch.delete({ where: { id } }); revalidatePath("/admin/branches"); }
