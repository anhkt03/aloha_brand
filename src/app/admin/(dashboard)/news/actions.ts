"use server";
import { NewsStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/auth";
import { newsArticleFromForm, newsArticleSchema } from "@/lib/validation/news-article";
function invalidate(slug?: string) { revalidatePath("/admin/news"); for (const locale of ["vi", "en", "ko", "ja", "zh"]) { revalidatePath(`/${locale}/news`); if (slug) revalidatePath(`/${locale}/news/${slug}`); } }
export async function saveNewsArticle(formData: FormData) { await requireAdminUser(); const parsed = newsArticleSchema.safeParse(newsArticleFromForm(formData)); if (!parsed.success) throw new Error("Dữ liệu bài viết không hợp lệ."); const { id, tagIds, translations, ...data } = parsed.data; try { await prisma.$transaction(async tx => { if (id) await tx.newsArticle.update({ where: { id }, data: { ...data, translations: { deleteMany: {}, create: translations }, tagLinks: { deleteMany: {}, create: tagIds.map(newsTagId => ({ newsTagId })) } } }); else await tx.newsArticle.create({ data: { ...data, translations: { create: translations }, tagLinks: { create: tagIds.map(newsTagId => ({ newsTagId })) } } }); }); } catch (error) { if ((error as { code?: string }).code === "P2002") throw new Error("Slug bài viết đã tồn tại."); throw error; } invalidate(data.slug); }
export async function setNewsStatus(id: number, status: NewsStatus) { await requireAdminUser(); const item = await prisma.newsArticle.update({ where: { id }, data: { status }, select: { slug: true } }); invalidate(item.slug); }
export async function toggleProminent(id: number) { await requireAdminUser(); const old = await prisma.newsArticle.findUniqueOrThrow({ where: { id } }); await prisma.newsArticle.update({ where: { id }, data: { prominent: !old.prominent } }); invalidate(old.slug); }
export async function deleteNewsArticle(id: number) { await requireAdminUser(); const item = await prisma.newsArticle.delete({ where: { id }, select: { slug: true } }); invalidate(item.slug); }
