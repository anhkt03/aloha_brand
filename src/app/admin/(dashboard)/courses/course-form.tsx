"use client";

import { useActionState } from "react";
import { CourseStatus } from "@prisma/client";
import { ImageUploader } from "@/components/admin/image-uploader";
import { LocaleTabs } from "@/components/admin/locale-tabs";
import { Button, Field, Panel, inputClass } from "@/components/admin/ui";
import { FormError } from "@/components/admin/form-error";
import { taxonomyLocales } from "@/lib/validation/course-taxonomy";

type Translation = { locale: string; title: string; label: string; target: string; outcome: string; syllabus: string[]; roadmap: string | null };
type Level = { id: number; translations: { name: string }[] };
type Type = { id: number; translations: { name: string }[]; levels: Level[] };
type Course = { id: number; slug: string; courseTypeId: number; courseLevelId: number; durationMonths: number; totalSessions: number; status: CourseStatus; priceVnd: number | null; discountPercent: number | null; sortOrder: number; iconUrl: string | null; translations: Translation[] };

const STATUS_LABELS: Record<CourseStatus, string> = { OPEN: "Đang mở", COMING_SOON: "Sắp mở", CLOSED: "Đã đóng" };

export function CourseForm({
  action,
  course,
  types,
}: {
  action: (previous: { message?: string }, formData: FormData) => Promise<{ message?: string }>;
  course?: Course;
  types: Type[];
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const translations = Object.fromEntries((course?.translations ?? []).map((item) => [item.locale, item])) as Record<string, Translation>;

  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="id" value={course?.id ?? ""} />
      <FormError message={state.message} />

      <Panel title="Thông tin chung">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Slug (URL)">
            <input required name="slug" defaultValue={course?.slug} placeholder="tieng-anh-giao-tiep" className={inputClass} />
          </Field>
          <Field label="Trạng thái">
            <select name="status" defaultValue={course?.status ?? "OPEN"} className={inputClass}>
              {Object.values(CourseStatus).map((status) => <option key={status} value={status}>{STATUS_LABELS[status]}</option>)}
            </select>
          </Field>
          <Field label="Loại khóa học">
            <select name="courseTypeId" defaultValue={course?.courseTypeId} required className={inputClass}>
              {types.map((type) => <option key={type.id} value={type.id}>{type.translations[0]?.name}</option>)}
            </select>
          </Field>
          <Field label="Cấp độ">
            <select name="courseLevelId" defaultValue={course?.courseLevelId} required className={inputClass}>
              {types.flatMap((type) => type.levels).map((level) => <option key={level.id} value={level.id}>{level.translations[0]?.name}</option>)}
            </select>
          </Field>
          <Field label="Thời lượng (tháng)">
            <input type="number" min="1" name="durationMonths" defaultValue={course?.durationMonths ?? 1} className={inputClass} />
          </Field>
          <Field label="Số buổi">
            <input type="number" min="1" name="totalSessions" defaultValue={course?.totalSessions ?? 1} className={inputClass} />
          </Field>
          <Field label="Giá (VND)" hint="Để trống nếu chưa công bố giá">
            <input type="number" min="0" name="priceVnd" defaultValue={course?.priceVnd ?? ""} className={inputClass} />
          </Field>
          <Field label="Giảm giá (%)">
            <input type="number" min="0" max="100" name="discountPercent" defaultValue={course?.discountPercent ?? ""} className={inputClass} />
          </Field>
          <Field label="Thứ tự hiển thị">
            <input type="number" min="0" name="sortOrder" defaultValue={course?.sortOrder ?? 0} className={inputClass} />
          </Field>
        </div>
      </Panel>

      <Panel title="Icon khóa học">
        {course ? (
          <ImageUploader name="iconUrl" folder={`courses/${course.id}`} defaultValue={course.iconUrl ?? ""} />
        ) : (
          <p className="text-sm text-slate-500">Lưu khóa học trước, sau đó mở lại để tải icon lên.</p>
        )}
      </Panel>

      <Panel title="Nội dung theo ngôn ngữ" description="Bắt buộc điền đủ cả 5 ngôn ngữ trước khi lưu.">
        <LocaleTabs locales={taxonomyLocales}>
          {(locale) => (
            <>
              <input required name={`title-${locale}`} defaultValue={translations[locale]?.title} placeholder="Tiêu đề" className={inputClass} />
              <input required name={`label-${locale}`} defaultValue={translations[locale]?.label} placeholder="Nhãn ngắn" className={inputClass} />
              <textarea required name={`target-${locale}`} defaultValue={translations[locale]?.target} placeholder="Mục tiêu" rows={2} className={inputClass} />
              <textarea required name={`outcome-${locale}`} defaultValue={translations[locale]?.outcome} placeholder="Kết quả đầu ra" rows={2} className={inputClass} />
              <textarea required name={`syllabus-${locale}`} defaultValue={translations[locale]?.syllabus?.join("\n")} placeholder="Syllabus, mỗi dòng một mục" rows={4} className={inputClass} />
              <textarea name={`roadmap-${locale}`} defaultValue={translations[locale]?.roadmap ?? ""} placeholder="Lộ trình (tùy chọn)" rows={3} className={inputClass} />
            </>
          )}
        </LocaleTabs>
      </Panel>

      <Button type="submit" disabled={pending} className="justify-self-start">
        {pending ? "Đang lưu..." : "Lưu khóa học"}
      </Button>
    </form>
  );
}
