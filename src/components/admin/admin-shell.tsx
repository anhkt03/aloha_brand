"use client";

import type { UserRole } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/app/admin/actions";
import { canAccessModule, type AdminModule } from "@/lib/permissions";

type NavigationItem = { module: AdminModule; label: string; href: string; group?: "courses" | "news" };

const navigation: NavigationItem[] = [
  { module: "dashboard", label: "Tổng quan", href: "/admin" },
  { module: "courses", label: "Khóa học", href: "/admin/courses", group: "courses" },
  { module: "courses", label: "Loại khóa học", href: "/admin/courses/types", group: "courses" },
  { module: "courses", label: "Cấp độ", href: "/admin/courses/levels", group: "courses" },
  { module: "news", label: "Bài viết", href: "/admin/news", group: "news" },
  { module: "news", label: "Danh mục tin tức", href: "/admin/news/categories", group: "news" },
  { module: "news", label: "Thẻ tin tức", href: "/admin/news/tags", group: "news" },
  { module: "enrollments", label: "Đăng ký", href: "/admin/enrollments" },
  { module: "feedback", label: "Đánh giá", href: "/admin/feedback" },
  { module: "branches", label: "Cơ sở", href: "/admin/branches" },
  { module: "users", label: "Tài khoản", href: "/admin/users" },
];

const groupLabels = { courses: "ĐÀO TẠO", news: "NỘI DUNG" } as const;

export function AdminShell({ children, user }: { children: React.ReactNode; user: { name: string; email: string | null; role: UserRole } }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const items = navigation.filter((item) => canAccessModule(user.role, item.module));
  const activeHref = items
    .filter((item) => item.href === "/admin" ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`))
    .sort((left, right) => right.href.length - left.href.length)[0]?.href;
  let lastGroup: NavigationItem["group"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="flex h-16 items-center justify-between border-b bg-white px-4">
        <button type="button" className="md:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button>
        <p className="font-bold text-emerald-800">ALOHA Admin</p>
        <details className="relative"><summary className="cursor-pointer list-none text-sm">{user.name}</summary><div className="absolute right-0 z-10 mt-2 w-56 rounded border bg-white p-3 shadow"><p className="text-xs text-slate-500">{user.email} · {user.role}</p><form action={logout}><button className="mt-3 text-sm text-red-700">Đăng xuất</button></form></div></details>
      </header>
      <aside className={`${open ? "block" : "hidden"} fixed inset-x-0 top-16 z-10 border-b bg-white p-4 md:static md:block md:float-left md:min-h-[calc(100vh-4rem)] md:w-60 md:border-b-0 md:border-r`}>
        <nav className="grid gap-1">
          {items.map((item) => {
            const showGroup = item.group && item.group !== lastGroup;
            lastGroup = item.group;
            const active = item.href === activeHref;
            return <div key={item.href}>{showGroup ? <p className="mb-1 mt-4 px-3 text-[11px] font-black tracking-widest text-slate-400">{groupLabels[item.group!]}</p> : null}<Link href={item.href} onClick={() => setOpen(false)} className={`block rounded-xl px-3 py-2 text-sm transition ${active ? "bg-emerald-100 font-bold text-emerald-900" : "hover:bg-emerald-50"}`}>{item.label}</Link></div>;
          })}
        </nav>
      </aside>
      <main className="p-4 md:ml-60 md:p-8">{children}</main>
    </div>
  );
}
