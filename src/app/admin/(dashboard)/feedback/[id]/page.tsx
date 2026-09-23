import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FeedbackForm } from "../feedback-form";
import { deleteFeedback, saveFeedback } from "../actions";
export default async function EditFeedbackPage({ params }: { params: Promise<{ id: string }> }) { const id = Number((await params).id); const item = await prisma.feedback.findUnique({ where: { id } }); if (!item) notFound(); return <><h1 className="mb-6 text-3xl font-black">Sửa đánh giá</h1><FeedbackForm action={saveFeedback} item={item} /><form action={deleteFeedback.bind(null, id)} className="mt-5"><button className="btn btn-ghost btn-sm text-red-700">Xóa</button></form></>; }
