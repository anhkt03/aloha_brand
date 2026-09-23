import { saveCourseType } from "../../taxonomy-actions";
import { TranslationTabs } from "@/components/admin/translation-tabs";

export default function NewCourseTypePage() { return <main><h1 className="mb-6 text-2xl font-bold">Thêm loại khóa học</h1><form action={saveCourseType} className="grid max-w-xl gap-5 rounded bg-white p-5"><label className="grid gap-1 text-sm">Icon URL<input name="iconUrl" type="url" className="rounded border px-3 py-2" /></label><label className="grid gap-1 text-sm">Thứ tự<input name="sortOrder" type="number" min="0" defaultValue="0" className="rounded border px-3 py-2" /></label><TranslationTabs /><button className="rounded bg-emerald-700 px-3 py-2 font-semibold text-white">Lưu</button></form></main>; }
