import { prisma } from "@/lib/prisma";

function nameFilter(query: string) {
  return query
    ? { translations: { some: { name: { contains: query, mode: "insensitive" as const } } } }
    : {};
}

export async function listCourseCategories(query = "") {
  return prisma.courseCategory.findMany({
    where: nameFilter(query),
    include: { translations: { where: { locale: "vi" } }, _count: { select: { courses: true } } },
    orderBy: { id: "asc" },
  });
}

export async function getCourseCategory(id: number) {
  return prisma.courseCategory.findUnique({ include: { translations: true }, where: { id } });
}

export async function listCourseLevels(query = "") {
  return prisma.courseLevel.findMany({
    where: nameFilter(query),
    include: { translations: { where: { locale: "vi" } }, _count: { select: { courses: true } } },
    orderBy: { id: "asc" },
  });
}

export async function getCourseLevel(id: number) {
  return prisma.courseLevel.findUnique({ include: { translations: true }, where: { id } });
}
