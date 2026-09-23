import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageUploader } from "@/components/admin/image-uploader";
import { StatusBadge } from "@/components/admin/status-badge";
import { TranslationTabs } from "@/components/admin/translation-tabs";
import { getCourseType, listCourseLevels } from "@/lib/dal/course-taxonomy";
import { deleteCourseType, saveCourseType, toggleCourseType } from "../../taxonomy-actions";

export default async function CourseTypeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  const item = await getCourseType(id);
  if (!item) notFound();
  const values = Object.fromEntries(item.translations.map((translation) => [translation.locale, translation.name]));
  const levels = await listCourseLevels(id);
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Chỉnh sửa loại khóa học</h1>
      <form action={saveCourseType} className="grid max-w-xl gap-5 rounded bg-white p-5">
        <input type="hidden" name="id" value={item.id} />
        <label className="grid gap-1 text-sm">Icon<ImageUploader name="iconUrl" folder={`course-types/${item.id}`} defaultValue={item.iconUrl ?? ""} /></label>
        <label className="grid gap-1 text-sm">Thứ tự<input name="sortOrder" type="number" min="0" defaultValue={item.sortOrder} className="rounded border px-3 py-2" /></label>
        <TranslationTabs values={values} />
        <button className="rounded bg-emerald-700 px-3 py-2 font-semibold text-white">Lưu thay đổi</button>
      </form>
      <div className="mt-4 flex gap-3"><form action={toggleCourseType.bind(null, item.id)}><button className="rounded border px-3 py-2 text-sm"><StatusBadge active={item.active} /></button></form><form action={deleteCourseType.bind(null, item.id)}><button className="rounded border border-red-300 px-3 py-2 text-sm text-red-700">Xóa</button></form></div>
      <section className="mt-10"><div className="mb-4 flex justify-between"><h2 className="text-xl font-bold">Cấp độ</h2><Link className="rounded bg-emerald-700 px-3 py-2 text-sm text-white" href={`/admin/courses/types/${id}/levels/new`}>Thêm cấp độ</Link></div><div className="grid gap-2">{levels.map((level) => <Link className="rounded border bg-white p-3" key={level.id} href={`/admin/courses/types/${id}/levels/${level.id}`}>{level.translations[0]?.name} · {level.sortOrder}</Link>)}</div></section>
    </>
  );
}
