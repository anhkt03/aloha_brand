import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { NewsCategoryForm } from "../form";
import { deleteCategory, saveCategory, toggleCategory } from "../../taxonomy-actions";
export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) { const id = Number((await params).id); const item = await prisma.newsArticleCategory.findUnique({ where: { id }, include: { translations: true } }); if (!item) notFound(); return <><h1 className="mb-6 text-3xl font-black">Chỉnh sửa danh mục</h1><NewsCategoryForm action={saveCategory} item={item} /><div className="mt-5 flex gap-2"><form action={toggleCategory.bind(null, id)}><button className="btn btn-ghost btn-sm">{item.active ? "Tắt hiển thị" : "Kích hoạt"}</button></form><form action={deleteCategory.bind(null, id)}><button className="btn btn-ghost btn-sm text-red-700">Xóa</button></form></div></>; }
