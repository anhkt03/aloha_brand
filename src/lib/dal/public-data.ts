import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

function pick<T extends { locale: string }>(rows: T[], locale: string) {
  return rows.find((x) => x.locale === locale) ?? rows.find((x) => x.locale === "vi") ?? rows[0];
}

export async function getPublicCourses(locale: string) {
  const rows = await unstable_cache(
    () =>
      prisma.course.findMany({
        where: { status: "PUBLISHED" },
        include: {
          translations: true,
          category: { include: { translations: true } },
          level: { include: { translations: true } },
        },
        orderBy: { id: "asc" },
      }),
    ["public-courses"],
    { tags: ["courses"], revalidate: 300 },
  )();

  return rows.map((x) => {
    const t = pick(x.translations, locale);
    const category = pick(x.category.translations, locale);
    const level = pick(x.level.translations, locale);
    return {
      id: x.id,
      title: t?.title ?? "",
      duration: t?.duration ?? "",
      content: t?.content ?? "",
      category: category?.name ?? "",
      level: level?.name ?? "",
    };
  });
}

export async function getPublicNews(locale: string) {
  const rows = await unstable_cache(
    () =>
      prisma.newsArticle.findMany({
        where: { status: "PUBLISHED", publishedAt: { lte: new Date() } },
        include: { translations: true },
        orderBy: { publishedAt: "desc" },
      }),
    ["public-news"],
    { tags: ["news"], revalidate: 300 },
  )();

  return rows.map((x) => {
    const t = pick(x.translations, locale);
    return {
      id: x.id,
      slug: x.slug,
      title: t?.title ?? x.slug,
      content: t?.content ?? "",
      coverImage: x.coverImage,
      gallery: x.gallery,
      publishedAt: new Date(x.publishedAt).toISOString(),
    };
  });
}

export async function getPublicNewsBySlug(locale: string, slug: string) {
  return (await getPublicNews(locale)).find((x) => x.slug === slug) ?? null;
}

export const getPublicFeedback = unstable_cache(
  () => prisma.feedback.findMany({ where: { active: true }, select: { id: true, name: true, rating: true, comment: true }, orderBy: { createdAt: "desc" }, take: 20 }),
  ["public-feedback"],
  { tags: ["feedback"], revalidate: 300 },
);

export const getPublicBranches = unstable_cache(
  () => prisma.branch.findMany({ where: { active: true }, select: { id: true, code: true, name: true, address: true, phone: true, mapUrl: true, lat: true, lng: true }, orderBy: { code: "asc" } }),
  ["public-branches"],
  { tags: ["branches"], revalidate: 300 },
);
