"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export type LoginState = { message?: string };

export async function login(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { message: "Email hoặc mật khẩu không hợp lệ." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) return { message: "Email hoặc mật khẩu không hợp lệ." };

  const profile = await prisma.user.findFirst({
    where: { authUserId: data.user.id, active: true },
    select: { id: true },
  });
  if (!profile) {
    await supabase.auth.signOut();
    return { message: "Tài khoản không có quyền truy cập quản trị." };
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
