import { CourseStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;
const DEFAULT_PAGE_SIZE = 20;

export async function listCourses({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  query,
  status,
  courseTypeId,
  courseLevelId,
}: {
  page?: number;
  pageSize?: number;
  query?: string;
  status?: CourseStatus;
  courseTypeId?: number;
  courseLevelId?: number;
} = {}) {
  const size = PAGE_SIZE_OPTIONS.includes(pageSize as (typeof PAGE_SIZE_OPTIONS)[number]) ? pageSize : DEFAULT_PAGE_SIZE;
  const currentPage = Math.max(1, page);
  const where: Prisma.CourseWhereInput = {
    ...(status ? { status } : {}),
    ...(courseTypeId ? { courseTypeId } : {}),
    ...(courseLevelId ? { courseLevelId } : {}),
    ...(query ? { OR: [{ slug: { contains: query, mode: "insensitive" } }, { translations: { some: { title: { contains: query, mode: "insensitive" } } } }] } : {}),
  };

  const [items, total] = await prisma.$transaction([
    prisma.course.findMany({
      where,
      skip: (currentPage - 1) * size,
      take: size,
      include: {
        courseType: { include: { translations: { where: { locale: "vi" } } } },
        courseLevel: { include: { translations: { where: { locale: "vi" } } } },
        translations: { where: { locale: "vi" } },
        _count: { select: { enrollments: true } },
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    }),
    prisma.course.count({ where }),
  ]);

  return { items, total, page: currentPage, pageSize: size, totalPages: Math.max(1, Math.ceil(total / size)) };
}

export async function getCourse(id: number) {
  return prisma.course.findUnique({ where: { id }, include: { translations: true } });
}
