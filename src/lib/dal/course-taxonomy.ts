import { prisma } from "@/lib/prisma";

function nameFilter(query: string) {
  return query
    ? { translations: { some: { name: { contains: query, mode: "insensitive" as const } } } }
    : {};
}

export async function listCourseTypes(query = "", active?: boolean) {
  return prisma.courseType.findMany({
    where: { ...(active === undefined ? {} : { active }), ...nameFilter(query) },
    include: { translations: { where: { locale: "vi" } }, _count: { select: { levels: true, courses: true } } },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
}

export async function getCourseType(id: number) {
  return prisma.courseType.findUnique({
    include: { translations: true, levels: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] } },
    where: { id },
  });
}

export async function listCourseLevels(courseTypeId: number, query = "", active?: boolean) {
  return prisma.courseLevel.findMany({
    where: { courseTypeId, ...(active === undefined ? {} : { active }), ...nameFilter(query) },
    include: { translations: { where: { locale: "vi" } }, _count: { select: { courses: true } } },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
}

export async function getCourseLevel(id: number) {
  return prisma.courseLevel.findUnique({
    include: { translations: true, courseType: { select: { id: true } } },
    where: { id },
  });
}
