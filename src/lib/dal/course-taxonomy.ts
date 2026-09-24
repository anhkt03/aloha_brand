import { prisma } from "@/lib/prisma";

function nameFilter(query: string) {
  return query
    ? { translations: { some: { name: { contains: query, mode: "insensitive" as const } } } }
    : {};
}

export async function listCourseCategories(query = "") {
  return prisma.courseCategory.findMany({
    where: nameFilter(query),
    include: { translations: true, _count: { select: { courses: true } } },
    orderBy: { id: "asc" },
  });
}

export async function listCourseLevels(query = "") {
  return prisma.courseLevel.findMany({
    where: nameFilter(query),
    include: { translations: true, _count: { select: { courses: true } } },
    orderBy: { id: "asc" },
  });
}
