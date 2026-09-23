import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/ui";

const metricIcons = [
  "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z",
  "M4 4h13a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z",
  "M9 12l2 2 4-4M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14l-4-3-3 3-3-3-3 3-4-3V6z",
  "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
];

export default async function AdminDashboardPage() {
  const [courses, articles, enrollments, feedback] = await prisma.$transaction([
    prisma.course.count(),
    prisma.newsArticle.count(),
    prisma.enrollment.count(),
    prisma.feedback.count(),
  ]);
  const metrics = [
    { label: "Khóa học", count: courses, caption: "Nội dung đào tạo" },
    { label: "Tin tức", count: articles, caption: "Bài viết & cập nhật" },
    { label: "Đăng ký", count: enrollments, caption: "Học viên quan tâm" },
    { label: "Đánh giá", count: feedback, caption: "Phản hồi học viên" },
  ];

  return (
    <div>
      <PageHeader eyebrow="Tổng quan hệ thống" title="Chào mừng trở lại, ALOHA" />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => (
          <article key={metric.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={metricIcons[index]} /></svg>
            </span>
            <p className="mt-4 text-sm font-semibold text-slate-500">{metric.label}</p>
            <p className="mt-1 font-display text-3xl font-black text-slate-900">{metric.count}</p>
            <p className="mt-1 text-xs text-slate-400">{metric.caption}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="font-display text-base font-black text-slate-900">Bắt đầu quản lý</p>
        <p className="mt-1 text-sm text-slate-500">Tạo nội dung đầu tiên cho website ALOHA.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link href="/admin/courses/types/new" className="rounded-lg border border-slate-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/40">
            <b className="block text-sm text-indigo-600">+ Loại khóa học</b>
            <span className="mt-1 block text-xs text-slate-400">Phân loại chương trình</span>
          </Link>
          <Link href="/admin/courses" className="rounded-lg border border-slate-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/40">
            <b className="block text-sm text-indigo-600">Quản lý khóa học</b>
            <span className="mt-1 block text-xs text-slate-400">Cập nhật chương trình</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
