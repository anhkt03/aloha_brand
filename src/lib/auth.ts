import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export type CurrentAdmin = {
  id: number;
  authUserId: string;
  name: string;
  email: string;
  role: UserRole;
};

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;

  return prisma.user.findFirst({
    where: { authUserId: user.id, active: true },
    select: { id: true, authUserId: true, name: true, email: true, role: true },
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
