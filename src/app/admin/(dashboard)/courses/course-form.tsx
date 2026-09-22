import { CourseStatus } from "@prisma/client";
import { ImageUploader } from "@/components/admin/image-uploader";
import { taxonomyLocales } from "@/lib/validation/course-taxonomy";

type Translation = { locale: string; title: string; label: string; target: string; outcome: string; syllabus: string[]; roadmap: string | null };
type Level = { id: number; translations: { name: string }[] };
type Type = { id: number; translations: { name: string }[]; levels: Level[] };
type Course = { id: number; slug: string; courseTypeId: number; courseLevelId: number; durationMonths: number; totalSessions: number; status: CourseStatus; priceVnd: number | null; discountPercent: number | null; sortOrder: number; iconUrl: string | null; translations: Translation[] };
const field = "mt-1 w-full rounded-xl border border-line p-3";

export function CourseForm({ action, course, types }: { action: (formData: FormData) => void | Promise<void>; course?: Course; types: Type[] }) {
  const translations = Object.fromEntries((course?.translations ?? []).map((item) => [item.locale, item])) as Record<string, Translation>;
  return (
    <form action={action} className="grid gap-5">
      <input type="hidden" name="id" value={course?.id ?? ""} />
      <div className="grid gap-4 md:grid-cols-2">
        <label>Slug<input required name="slug" defaultValue={course?.slug} className={field} /></label>
        <label>Trạng thái<select name="status" defaultValue={course?.status ?? "OPEN"} className={field}>{Object.values(CourseStatus).map((status) => <option key={status}>{status}</option>)}</select></label>
        <label>Loại khóa học<select name="courseTypeId" defaultValue={course?.courseTypeId} required className={field}>{types.map((type) => <option key={type.id} value={type.id}>{type.translations[0]?.name}</option>)}</select></label>
        <label>Cấp độ<select name="courseLevelId" defaultValue={course?.courseLevelId} required className={field}>{types.flatMap((type) => type.levels).map((level) => <option key={level.id} value={level.id}>{level.translations[0]?.name}</option>)}</select></label>
        <label>Thời lượng (tháng)<input type="number" min="1" name="durationMonths" defaultValue={course?.durationMonths ?? 1} className={field} /></label>
        <label>Số buổi<input type="number" min="1" name="totalSessions" defaultValue={course?.totalSessions ?? 1} className={field} /></label>
        <label>Giá (VND)<input type="number" min="0" name="priceVnd" defaultValue={course?.priceVnd ?? ""} className={field} /></label>
        <label>Giảm giá (%)<input type="number" min="0" max="100" name="discountPercent" defaultValue={course?.discountPercent ?? ""} className={field} /></label>
        <label>Thứ tự<input type="number" min="0" name="sortOrder" defaultValue={course?.sortOrder ?? 0} className={field} /></label>
      </div>
      <fieldset className="rounded-2xl border border-line p-5">
        <legend className="px-2 font-bold">Icon khóa học</legend>
        {course ? <ImageUploader name="iconUrl" folder={`courses/${course.id}`} defaultValue={course.iconUrl ?? ""} /> : <><input name="iconUrl" type="url" className={field} placeholder="URL icon (có thể để trống)" /><small>Lưu khóa học trước, sau đó mở lại để tải ảnh lên.</small></>}
      </fieldset>
      {taxonomyLocales.map((locale) => <fieldset key={locale} className="rounded-2xl border border-line p-5"><legend className="px-2 font-display font-black text-brand">{locale.toUpperCase()}</legend><div className="grid gap-3"><input required name={`title-${locale}`} defaultValue={translations[locale]?.title} placeholder="Tiêu đề" className={field} /><input required name={`label-${locale}`} defaultValue={translations[locale]?.label} placeholder="Nhãn" className={field} /><textarea required name={`target-${locale}`} defaultValue={translations[locale]?.target} placeholder="Mục tiêu" className={field} /><textarea required name={`outcome-${locale}`} defaultValue={translations[locale]?.outcome} placeholder="Kết quả" className={field} /><textarea required name={`syllabus-${locale}`} defaultValue={translations[locale]?.syllabus?.join("\n")} placeholder="Syllabus, mỗi dòng một mục" className={field} /><textarea name={`roadmap-${locale}`} defaultValue={translations[locale]?.roadmap ?? ""} placeholder="Lộ trình (tùy chọn)" className={field} /></div></fieldset>)}
      <button className="btn btn-primary justify-self-start">Lưu khóa học</button>
    </form>
  );
}
