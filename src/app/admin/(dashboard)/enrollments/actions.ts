"use server";
import { EnrollmentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/auth";
export async function setEnrollmentStatus(id: number, status: EnrollmentStatus) { await requireAdminUser(); await prisma.enrollment.update({ where: { id }, data: { status } }); revalidatePath("/admin/enrollments"); }
