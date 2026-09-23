import { notFound } from "next/navigation";
import { getCourseType } from "@/lib/dal/course-taxonomy";
import { TranslationTabs } from "@/components/admin/translation-tabs";
import { saveCourseLevel } from "../../../../taxonomy-actions";

export default async function NewCourseLevelPage({ params }: { params: Promise<{ id: string }> }) { const id = Number((await params).id); if (!await getCourseType(id)) notFound(); return <main><h1 className="mb-6 text-2xl font-bold">Thêm cấp độ</h1><form action={saveCourseLevel} className="grid max-w-xl gap-5 rounded bg-white p-5"><input type="hidden" name="courseTypeId" value={id} /><label className="grid gap-1 text-sm">Thứ tự<input name="sortOrder" type="number" min="0" defaultValue="0" className="rounded border px-3 py-2" /></label><TranslationTabs /><button className="rounded bg-emerald-700 px-3 py-2 font-semibold text-white">Lưu</button></form></main>; }
