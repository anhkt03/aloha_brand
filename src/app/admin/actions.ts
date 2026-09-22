"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, clearSession } from "@/lib/session";
import { verifyPassword } from "@/lib/password";

const loginSchema = z.object({
  username: z.string().trim().min(3).max(64),
  password: z.string().min(1),
});

export type LoginState = { message?: string };

export async function login(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { message: "Tên đăng nhập hoặc mật khẩu không hợp lệ." };
  const profile = await prisma.user.findFirst({ where: { username: parsed.data.username, active: true } });
  if (!profile || !(await verifyPassword(parsed.data.password, profile.passwordHash))) return { message: "Tên đăng nhập hoặc mật khẩu không hợp lệ." };
  await createSession(profile.id);

  redirect("/admin");
}

export async function logout() {
  await clearSession();
  redirect("/admin/login");
}
