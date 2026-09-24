"use client";

import { useActionState } from "react";
import { CourseStatus } from "@prisma/client";
import { LocaleTabs } from "@/components/admin/locale-tabs";
import { Button, Field, Panel, inputClass } from "@/components/admin/ui";
import { FormError } from "@/components/admin/form-error";
import { taxonomyLocales } from "@/lib/validation/course-taxonomy";

type Translation = { locale: string; title: string; duration: string; content: string };
type Named = { id: number; translations: { name: string }[] };
type Course = { id: number; categoryId: number; levelId: number; status: CourseStatus; translations: Translation[] };

const STATUS_LABELS: Record<CourseStatus, string> = { HIDDEN: "Ẩn", PUBLISHED: "Công khai" };

export function CourseForm({
  action,
  course,
  categories,
  levels,
}: {
  action: (previous: { message?: string }, formData: FormData) => Promise<{ message?: string }>;
  course?: Course;
  categories: Named[];
  levels: Named[];
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const translations = Object.fromEntries((course?.translations ?? []).map((item) => [item.locale, item])) as Record<string, Translation>;

  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="id" value={course?.id ?? ""} />
      <FormError message={state.message} />

      <Panel title="Thông tin chung">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Danh mục">
            <select name="categoryId" defaultValue={course?.categoryId} required className={inputClass}>
              {categories.map((item) => <option key={item.id} value={item.id}>{item.translations[0]?.name}</option>)}
            </select>
          </Field>
          <Field label="Cấp độ">
            <select name="levelId" defaultValue={course?.levelId} required className={inputClass}>
              {levels.map((item) => <option key={item.id} value={item.id}>{item.translations[0]?.name}</option>)}
            </select>
          </Field>
          <Field label="Trạng thái">
            <select name="status" defaultValue={course?.status ?? "HIDDEN"} className={inputClass}>
              {Object.values(CourseStatus).map((status) => <option key={status} value={status}>{STATUS_LABELS[status]}</option>)}
            </select>
          </Field>
        </div>
      </Panel>

      <Panel title="Nội dung theo ngôn ngữ" description="Bắt buộc điền đủ cả 5 ngôn ngữ trước khi lưu.">
        <LocaleTabs locales={taxonomyLocales}>
          {(locale) => (
            <>
              <input required name={`title-${locale}`} defaultValue={translations[locale]?.title} placeholder="Tên khóa học" className={inputClass} />
              <input required name={`duration-${locale}`} defaultValue={translations[locale]?.duration} placeholder="Thời lượng (vd: 20 buổi · 40 giờ)" className={inputClass} />
              <textarea required name={`content-${locale}`} defaultValue={translations[locale]?.content} placeholder="Nội dung khóa học" rows={6} className={inputClass} />
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
