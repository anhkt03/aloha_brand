import { NewsStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PAGE_SIZE_OPTIONS } from "./courses";

const DEFAULT_PAGE_SIZE = 20;

export async function listNewsArticles({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  query,
  status,
}: {
  page?: number;
  pageSize?: number;
  query?: string;
  status?: NewsStatus;
} = {}) {
  const size = PAGE_SIZE_OPTIONS.includes(pageSize as (typeof PAGE_SIZE_OPTIONS)[number]) ? pageSize : DEFAULT_PAGE_SIZE;
  const currentPage = Math.max(1, page);
  const where: Prisma.NewsArticleWhereInput = {
    ...(status ? { status } : {}),
    ...(query ? { OR: [{ slug: { contains: query, mode: "insensitive" } }, { translations: { some: { title: { contains: query, mode: "insensitive" } } } }] } : {}),
  };

  const [items, total] = await prisma.$transaction([
    prisma.newsArticle.findMany({
      where,
      skip: (currentPage - 1) * size,
      take: size,
      include: { translations: { where: { locale: "vi" } } },
      orderBy: [{ publishedAt: "desc" }, { id: "desc" }],
    }),
    prisma.newsArticle.count({ where }),
  ]);

  return { items, total, page: currentPage, pageSize: size, totalPages: Math.max(1, Math.ceil(total / size)) };
}

export function getNewsArticle(id: number) {
  return prisma.newsArticle.findUnique({ where: { id }, include: { translations: true } });
}
