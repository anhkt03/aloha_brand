"use client";

import { useActionState, useEffect, useRef } from "react";
import { CourseStatus } from "@prisma/client";
import { toast } from "sonner";
import { LocaleTabs } from "@/components/admin/locale-tabs";
import { Field, Panel, inputClass } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";
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
  action: (previous: { message?: string; success?: boolean }, formData: FormData) => Promise<{ message?: string; success?: boolean }>;
  course?: Course;
  categories: Named[];
  levels: Named[];
}) {
  const [state, formAction] = useActionState(action, {});
  const prevState = useRef(state);
  const translations = Object.fromEntries((course?.translations ?? []).map((item) => [item.locale, item])) as Record<string, Translation>;

  useEffect(() => {
    if (state === prevState.current) return;
    prevState.current = state;
    if (state.success) toast.success("Đã lưu khóa học thành công.");
    else if (state.message) toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="id" value={course?.id ?? ""} />
      {course ? <input type="hidden" name="status" value={course.status} /> : null}

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
          {course ? null : (
            <Field label="Trạng thái">
              <select name="status" defaultValue="HIDDEN" className={inputClass}>
                {Object.values(CourseStatus).map((status) => <option key={status} value={status}>{STATUS_LABELS[status]}</option>)}
              </select>
            </Field>
          )}
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

      <SubmitButton variant="primary" pendingText="Đang lưu..." className="justify-self-start">
        Lưu khóa học
      </SubmitButton>
    </form>
  );
}
