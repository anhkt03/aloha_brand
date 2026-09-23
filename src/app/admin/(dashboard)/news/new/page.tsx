import { prisma } from "@/lib/prisma";
import { ArticleForm } from "../article-form";
import { saveNewsArticle } from "../actions";
export default async function NewArticlePage() { const [categories, tags] = await Promise.all([prisma.newsArticleCategory.findMany({ where: { active: true }, include: { translations: { where: { locale: "vi" } } } }), prisma.newsTags.findMany({ where: { active: true }, include: { translations: { where: { locale: "vi" } } } })]); return <><h1 className="mb-6 text-3xl font-black">Thêm bài viết</h1><ArticleForm action={saveNewsArticle} categories={categories} tags={tags} /></>; }
