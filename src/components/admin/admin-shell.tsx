"use client";

import type { UserRole } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/app/admin/actions";
import { canAccessModule, type AdminModule } from "@/lib/permissions";

type NavigationItem = { module: AdminModule; label: string; href: string; group?: "courses" | "news"; icon: React.ReactNode };

function Icon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d={path} />
    </svg>
  );
}

const navigation: NavigationItem[] = [
  { module: "dashboard", label: "Tổng quan", href: "/admin", icon: <Icon path="M4 13h6V4H4v9zm0 7h6v-5H4v5zm10 0h6V11h-6v9zm0-16v5h6V4h-6z" /> },
  { module: "courses", label: "Khóa học", href: "/admin/courses", group: "courses", icon: <Icon path="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z" /> },
  { module: "courses", label: "Danh mục khóa học", href: "/admin/courses/categories", group: "courses", icon: <Icon path="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4M3 17l9 4 9-4" /> },
  { module: "courses", label: "Cấp độ", href: "/admin/courses/levels", group: "courses", icon: <Icon path="M4 19V5m0 14 5-5m-5 5-5-5M20 5v14m0-14-5 5m5-5 5 5" /> },
  { module: "news", label: "Bài viết", href: "/admin/news", group: "news", icon: <Icon path="M4 4h13a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4zm4 4h9m-9 4h9m-9 4h5" /> },
  { module: "enrollments", label: "Đăng ký", href: "/admin/enrollments", icon: <Icon path="M9 12l2 2 4-4M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14l-4-3-3 3-3-3-3 3-4-3V6z" /> },
  { module: "feedback", label: "Đánh giá", href: "/admin/feedback", icon: <Icon path="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /> },
  { module: "branches", label: "Cơ sở", href: "/admin/branches", icon: <Icon path="M3 21h18M5 21V7l7-4 7 4v14M9 9h1m-1 4h1m4-4h1m-1 4h1M9 21v-4h6v4" /> },
  { module: "users", label: "Tài khoản", href: "/admin/users", icon: <Icon path="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /> },
];

const groupLabels = { courses: "Đào tạo", news: "Nội dung" } as const;

export function AdminShell({ children, user }: { children: React.ReactNode; user: { name: string; role: UserRole } }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const items = navigation.filter((item) => canAccessModule(user.role, item.module));
  const activeHref = items
    .filter((item) => (item.href === "/admin" ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`)))
    .sort((left, right) => right.href.length - left.href.length)[0]?.href;
  let lastGroup: NavigationItem["group"];

  const sidebar = (
    <>
      <div className="flex h-16 items-center gap-2.5 px-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo-600 font-display text-base font-black text-white">A</span>
        <p className="font-display text-[13px] font-black leading-tight text-white">ALOHA Language School</p>
      </div>
      <nav className="grid gap-0.5 px-3 pb-4">
        {items.map((item) => {
          const showGroup = item.group && item.group !== lastGroup;
          lastGroup = item.group;
          const active = item.href === activeHref;
          return (
            <div key={item.href}>
              {showGroup ? <p className="mb-1 mt-4 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-500 first:mt-1">{groupLabels[item.group!]}</p> : null}
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </div>
          );
        })}
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {open ? <button aria-label="Đóng menu" onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-slate-900/50 md:hidden" /> : null}

      <aside className={`fixed inset-y-0 left-0 z-40 w-64 -translate-x-full bg-slate-900 transition-transform md:translate-x-0 ${open ? "translate-x-0" : ""}`}>
        {sidebar}
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            title="Mở menu"
            aria-label="Mở menu"
            className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-slate-600 md:hidden"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
          <span className="hidden text-sm font-semibold text-slate-500 md:block">{items.find((item) => item.href === activeHref)?.label ?? "Tổng quan"}</span>
          <div className="ml-auto flex items-center gap-3">
            <span className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">{user.name.charAt(0).toUpperCase()}</span>
              <span className="hidden text-sm font-semibold text-slate-800 sm:block">{user.name}</span>
            </span>
            <form action={logout}>
              <button
                type="submit"
                title="Đăng xuất"
                aria-label="Đăng xuất"
                className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-red-600 transition hover:border-red-200 hover:bg-red-50"
              >
                <Icon path="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m6 14 5-5-5-5m5 5H9" />
              </button>
            </form>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
