"use client";

import { useActionState } from "react";
import { NewsStatus } from "@prisma/client";
import { GalleryUploader } from "@/components/admin/gallery-uploader";
import { ImageUploader } from "@/components/admin/image-uploader";
import { LocaleTabs } from "@/components/admin/locale-tabs";
import { Field, Panel, inputClass } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";
import { FormError } from "@/components/admin/form-error";
import { FormSuccess } from "@/components/admin/form-success";
import { taxonomyLocales } from "@/lib/validation/course-taxonomy";

type Translation = { locale: string; title: string; content: string };
type Article = { id: number; slug: string; coverImage: string; gallery: string[]; status: NewsStatus; publishedAt: Date; translations: Translation[] };

const STATUS_LABELS: Record<NewsStatus, string> = { HIDDEN: "Ẩn", PUBLISHED: "Công khai" };

export function ArticleForm({
  action,
  article,
}: {
  action: (previous: { message?: string; success?: boolean }, formData: FormData) => Promise<{ message?: string; success?: boolean }>;
  article?: Article;
}) {
  const [state, formAction] = useActionState(action, {});
  const translations = Object.fromEntries((article?.translations ?? []).map((item) => [item.locale, item])) as Record<string, Translation>;

  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="id" value={article?.id ?? ""} />
      <FormError message={state.message} />
      <FormSuccess message={state.success ? "Đã lưu bài viết thành công." : undefined} />

      <Panel title="Thông tin chung">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Slug (URL)">
            <input required name="slug" defaultValue={article?.slug} placeholder="aloha-khai-truong-co-so-moi" className={inputClass} />
          </Field>
          <Field label="Trạng thái">
            <select name="status" defaultValue={article?.status ?? "HIDDEN"} className={inputClass}>
              {Object.values(NewsStatus).map((status) => <option key={status} value={status}>{STATUS_LABELS[status]}</option>)}
            </select>
          </Field>
          <Field label="Ngày đăng (giờ Việt Nam)">
            <input
              type="datetime-local"
              name="publishedAt"
              required
              defaultValue={(article?.publishedAt ?? new Date()).toISOString().slice(0, 16)}
              className={inputClass}
            />
          </Field>
        </div>
      </Panel>

      <Panel title="Ảnh bìa">
        {article ? (
          <ImageUploader name="coverImage" folder={`news/${article.id}/cover`} defaultValue={article.coverImage} required />
        ) : (
          <p className="text-sm text-slate-500">Lưu bài viết trước, sau đó mở lại để tải ảnh bìa lên.</p>
        )}
      </Panel>

      <Panel title="Thư viện ảnh">
        {article ? (
          <GalleryUploader name="gallery" folder={`news/${article.id}/gallery`} defaultValue={article.gallery} />
        ) : (
          <p className="text-sm text-slate-500">Lưu bài viết trước, sau đó mở lại để thêm ảnh thư viện.</p>
        )}
      </Panel>

      <Panel title="Nội dung theo ngôn ngữ" description="Bắt buộc điền đủ cả 5 ngôn ngữ trước khi lưu.">
        <LocaleTabs locales={taxonomyLocales}>
          {(locale) => (
            <>
              <input required name={`title-${locale}`} defaultValue={translations[locale]?.title} placeholder="Tiêu đề" className={inputClass} />
              <textarea required name={`content-${locale}`} defaultValue={translations[locale]?.content} placeholder="Nội dung bài viết" rows={10} className={inputClass} />
            </>
          )}
        </LocaleTabs>
      </Panel>

      <SubmitButton variant="primary" pendingText="Đang lưu..." className="justify-self-start">
        Lưu bài viết
      </SubmitButton>
    </form>
  );
}
