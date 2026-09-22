import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [courses, articles, enrollments, feedback] = await prisma.$transaction([
    prisma.course.count(),
    prisma.newsArticle.count(),
    prisma.enrollment.count(),
    prisma.feedback.count(),
  ]);
  const metrics = [["Khóa học", courses], ["Tin tức", articles], ["Đăng ký", enrollments], ["Đánh giá", feedback]];
  return <><h1 className="text-2xl font-bold">Tổng quan</h1><div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(([label, count]) => <section key={label as string} className="rounded-lg border border-slate-200 bg-white p-5"><p className="text-sm text-slate-600">{label}</p><p className="mt-2 text-3xl font-bold">{count}</p></section>)}</div></>;
}
