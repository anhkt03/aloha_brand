"use server";

import { NewsStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeAuditLog } from "@/lib/audit";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteManagedImages } from "@/lib/storage";
import { newsArticleFromForm, newsArticleSchema } from "@/lib/validation/news-article";
import { LOCALES } from "@/lib/constants";

function invalidate(slug?: string) {
  revalidatePath("/admin/news");
  for (const locale of LOCALES) {
    revalidatePath(`/${locale}/news`);
    if (slug) revalidatePath(`/${locale}/news/${slug}`);
  }
}

export type NewsFormState = { message?: string; success?: boolean };

export async function saveNewsArticle(_previous: NewsFormState, formData: FormData): Promise<NewsFormState> {
  const actor = await requireAdminUser();
  const parsed = newsArticleSchema.safeParse(newsArticleFromForm(formData));
  if (!parsed.success) return { message: "Dữ liệu bài viết không hợp lệ. Vui lòng kiểm tra lại các trường bắt buộc." };
  const { id, translations, ...data } = parsed.data;
  const previous = id ? await prisma.newsArticle.findUnique({ where: { id }, select: { coverImage: true, gallery: true } }) : null;

  try {
    await prisma.$transaction(async (tx) => {
      const item = id
        ? await tx.newsArticle.update({ where: { id }, data: { ...data, translations: { deleteMany: {}, create: translations } } })
        : await tx.newsArticle.create({ data: { ...data, translations: { create: translations } } });
      await writeAuditLog({ actorUserId: actor.id, action: id ? "UPDATE" : "CREATE", entity: "NewsArticle", entityId: item.id }, tx);
    });
  } catch (error) {
    await deleteManagedImages([data.coverImage, ...data.gallery].filter((url) => url !== previous?.coverImage && !previous?.gallery.includes(url)));
    if ((error as { code?: string }).code === "P2002") return { message: "Slug bài viết đã tồn tại." };
    throw error;
  }
  if (previous) await deleteManagedImages([previous.coverImage, ...previous.gallery].filter((url) => url !== data.coverImage && !data.gallery.includes(url)));
  invalidate(data.slug);
  if (!id) redirect("/admin/news?created=1");
  return { success: true };
}

export async function setNewsStatus(id: number, status: NewsStatus) {
  const actor = await requireAdminUser();
  const item = await prisma.$transaction(async (tx) => {
    const updated = await tx.newsArticle.update({ where: { id }, data: { status }, select: { slug: true } });
    await writeAuditLog({ actorUserId: actor.id, action: "UPDATE_STATUS", entity: "NewsArticle", entityId: id, metadata: { status } }, tx);
    return updated;
  });
  invalidate(item.slug);
}

export async function deleteNewsArticle(id: number) {
  const actor = await requireAdminUser();
  const item = await prisma.$transaction(async (tx) => {
    const deleted = await tx.newsArticle.delete({ where: { id }, select: { slug: true, coverImage: true, gallery: true } });
    await writeAuditLog({ actorUserId: actor.id, action: "DELETE", entity: "NewsArticle", entityId: id }, tx);
    return deleted;
  });
  await deleteManagedImages([item.coverImage, ...item.gallery]);
  invalidate(item.slug);
}
