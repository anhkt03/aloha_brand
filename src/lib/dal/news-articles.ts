import { NewsStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function listNewsArticles(input: { q?: string; categoryId?: number; status?: NewsStatus; prominent?: boolean; from?: Date; to?: Date; cursor?: string } = {}) {
  const [cursorDate, cursorId] = input.cursor?.split("_") ?? [];
  const cursorWhere: Prisma.NewsArticleWhereInput = cursorDate && cursorId ? { OR: [{ publishedAt: { lt: new Date(cursorDate) } }, { publishedAt: new Date(cursorDate), id: { lt: Number(cursorId) } }] } : {};
  const rows = await prisma.newsArticle.findMany({ take: 21, where: { ...cursorWhere, ...(input.categoryId ? { categoryId: input.categoryId } : {}), ...(input.status ? { status: input.status } : {}), ...(input.prominent === undefined ? {} : { prominent: input.prominent }), ...(input.from || input.to ? { publishedAt: { ...(input.from ? { gte: input.from } : {}), ...(input.to ? { lte: input.to } : {}) } } : {}), ...(input.q ? { OR: [{ slug: { contains: input.q, mode: "insensitive" } }, { translations: { some: { title: { contains: input.q, mode: "insensitive" } } } }] } : {}) }, include: { category: { include: { translations: { where: { locale: "vi" } } } }, translations: { where: { locale: "vi" } }, tagLinks: { include: { newsTag: { include: { translations: { where: { locale: "vi" } } } } } } }, orderBy: [{ publishedAt: "desc" }, { id: "desc" }] });
  const items = rows.slice(0, 20); const next = rows[20]; return { items, nextCursor: next ? `${next.publishedAt.toISOString()}_${next.id}` : undefined };
}
export function getNewsArticle(id: number) { return prisma.newsArticle.findUnique({ where: { id }, include: { translations: true, tagLinks: true } }); }
