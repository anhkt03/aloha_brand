"use client";

import { useState } from "react";
import type { UserRole } from "@prisma/client";
import { logout } from "@/app/admin/actions";
import { canAccessModule, type AdminModule } from "@/lib/permissions";

const navigation: { module: AdminModule; label: string; href: string }[] = [
  { module: "dashboard", label: "Tổng quan", href: "/admin" },
  { module: "courses", label: "Khóa học", href: "/admin/courses" },
  { module: "news", label: "Tin tức", href: "/admin/news" },
  { module: "enrollments", label: "Đăng ký", href: "/admin/enrollments" },
  { module: "feedback", label: "Đánh giá", href: "/admin/feedback" },
  { module: "branches", label: "Cơ sở", href: "/admin/branches" },
  { module: "users", label: "Tài khoản", href: "/admin/users" },
];

export function AdminShell({ children, user }: { children: React.ReactNode; user: { name: string; email: string; role: UserRole } }) {
  const [open, setOpen] = useState(false);
  const items = navigation.filter((item) => canAccessModule(user.role, item.module));
  return <div className="min-h-screen bg-slate-50 text-slate-900"><header className="flex h-16 items-center justify-between border-b bg-white px-4"><button type="button" className="md:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button><p className="font-bold text-emerald-800">ALOHA Admin</p><details className="relative"><summary className="cursor-pointer list-none text-sm">{user.name}</summary><div className="absolute right-0 z-10 mt-2 w-56 rounded border bg-white p-3 shadow"><p className="text-xs text-slate-500">{user.email} · {user.role}</p><form action={logout}><button className="mt-3 text-sm text-red-700">Đăng xuất</button></form></div></details></header><aside className={`${open ? "block" : "hidden"} fixed inset-x-0 top-16 z-10 border-b bg-white p-4 md:static md:block md:float-left md:min-h-[calc(100vh-4rem)] md:w-60 md:border-b-0 md:border-r`}><nav className="grid gap-1">{items.map((item) => <a key={item.module} href={item.href} onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm hover:bg-emerald-50">{item.label}</a>)}</nav></aside><main className="p-4 md:ml-60 md:p-8">{children}</main></div>;
}
