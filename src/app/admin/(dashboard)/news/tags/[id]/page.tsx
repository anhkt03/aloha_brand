import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { NewsCategoryForm } from "../../categories/form";
import { deleteTag, saveTag, toggleTag } from "../../taxonomy-actions";
export default async function TagPage({ params }: { params: Promise<{ id: string }> }) { const id = Number((await params).id); const item = await prisma.newsTags.findUnique({ where: { id }, include: { translations: true } }); if (!item) notFound(); return <><h1 className="mb-6 text-3xl font-black">Chỉnh sửa thẻ</h1><NewsCategoryForm action={saveTag} item={{ ...item, iconUrl: null, sortOrder: 0 }} /><div className="mt-5 flex gap-2"><form action={toggleTag.bind(null, id)}><button className="btn btn-ghost btn-sm">{item.active ? "Tắt hiển thị" : "Kích hoạt"}</button></form><form action={deleteTag.bind(null, id)}><button className="btn btn-ghost btn-sm text-red-700">Xóa</button></form></div></>; }
