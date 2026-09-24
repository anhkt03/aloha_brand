import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FixedWindowRateLimiter } from "@/lib/rate-limit";
import { enrollmentSchema } from "@/lib/validation/enrollment";

const limiter = new FixedWindowRateLimiter(5, 60_000);

export async function GET() {
  const courses = await prisma.course.findMany({ where: { status: "PUBLISHED" }, select: { id: true, translations: { where: { locale: "vi" }, select: { title: true } } }, orderBy: { id: "asc" } });
  return NextResponse.json(courses.map((course) => ({ id: course.id, title: course.translations[0]?.title ?? `Khóa học ${course.id}` })));
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  if (!limiter.consume(ip, now)) return NextResponse.json({ message: "Bạn gửi quá nhanh. Vui lòng thử lại sau." }, { status: 429 });

  const body = await request.json().catch(() => null);
  const parsed = enrollmentSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: "Thông tin đăng ký không hợp lệ.", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400 });

  const data = parsed.data;
  const exists = await prisma.enrollment.findFirst({ where: { phone: data.phone, courseId: data.courseId, createdAt: { gte: new Date(now - 120_000) } }, select: { id: true } });
  if (exists) return NextResponse.json({ message: "Đăng ký đã được ghi nhận." }, { status: 200 });
  const course = await prisma.course.findFirst({ where: { id: data.courseId, status: "PUBLISHED" }, select: { id: true } });
  if (!course) return NextResponse.json({ message: "Khóa học không còn nhận đăng ký." }, { status: 400 });
  await prisma.enrollment.create({ data: { ...data, email: data.email || null } });
  return NextResponse.json({ message: "Đăng ký thành công." }, { status: 201 });
}
