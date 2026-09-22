import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/session";

export type CurrentAdmin = {
  id: number;
  username: string;
  name: string;
  email: string | null;
  role: UserRole;
};

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const id = await getSessionUserId();
  if (!id) return null;

  return prisma.user.findFirst({
    where: { id, active: true },
    select: { id: true, username: true, name: true, email: true, role: true },
  });
}

export async function requireAdminUser(): Promise<CurrentAdmin> {
  const user = await getCurrentAdmin();
  if (!user) redirect("/admin/login");
  return user;
}

export async function requireRole(...roles: UserRole[]): Promise<CurrentAdmin> {
  const user = await requireAdminUser();
  if (!roles.includes(user.role)) redirect("/admin");
  return user;
}
