import { NewsStatus } from "@prisma/client";
import { GalleryUploader } from "@/components/admin/gallery-uploader";
import { ImageUploader } from "@/components/admin/image-uploader";
import { taxonomyLocales } from "@/lib/validation/course-taxonomy";

type Translation = { locale: string; title: string; excerpt: string; content: string };
type Article = { id: number; slug: string; coverImage: string; gallery: string[]; categoryId: number; author: string; status: NewsStatus; prominent: boolean; publishedAt: Date; translations: Translation[]; tagLinks: { newsTagId: number }[] };
type Named = { id: number; translations: { name: string }[] };
const field = "mt-1 w-full rounded-xl border border-line p-3";

export function ArticleForm({ action, article, categories, tags }: { action: (data: FormData) => void | Promise<void>; article?: Article; categories: Named[]; tags: Named[] }) {
  const translations = Object.fromEntries((article?.translations ?? []).map((item) => [item.locale, item])) as Record<string, Translation>;
  const selected = new Set(article?.tagLinks.map((item) => item.newsTagId));
  return (
    <form action={action} className="grid gap-5">
      <input type="hidden" name="id" value={article?.id ?? ""} />
      <div className="grid gap-4 md:grid-cols-2">
        <label>Slug<input required name="slug" defaultValue={article?.slug} className={field} /></label>
        <label>Tác giả<input required name="author" defaultValue={article?.author} className={field} /></label>
        <label>Danh mục<select name="categoryId" defaultValue={article?.categoryId} required className={field}>{categories.map((category) => <option value={category.id} key={category.id}>{category.translations[0]?.name}</option>)}</select></label>
        <label>Trạng thái<select name="status" defaultValue={article?.status ?? "DRAFT"} className={field}>{Object.values(NewsStatus).map((status) => <option key={status}>{status}</option>)}</select></label>
        <label>Ngày xuất bản<input type="datetime-local" name="publishedAt" required defaultValue={(article?.publishedAt ?? new Date()).toISOString().slice(0, 16)} className={field} /></label>
        <label className="flex items-center gap-2"><input type="checkbox" name="prominent" defaultChecked={article?.prominent} /> Bài nổi bật</label>
      </div>
      <fieldset className="rounded-2xl border border-line p-5"><legend className="px-2 font-bold">Ảnh bìa</legend>{article ? <ImageUploader name="coverImage" folder={`news/${article.id}/cover`} defaultValue={article.coverImage} required /> : <><input type="url" name="coverImage" required className={field} placeholder="URL ảnh bìa" /><small>Lưu bài viết trước, sau đó mở lại để tải ảnh lên.</small></>}</fieldset>
      <fieldset className="rounded-2xl border border-line p-5"><legend className="px-2 font-bold">Thư viện ảnh</legend>{article ? <GalleryUploader name="gallery" folder={`news/${article.id}/gallery`} defaultValue={article.gallery} /> : <textarea name="gallery" className={field} placeholder="URL ảnh, mỗi dòng một ảnh" />}</fieldset>
      <fieldset className="rounded-2xl border border-line p-4"><legend className="px-2 font-bold">Tags</legend><div className="flex flex-wrap gap-3">{tags.map((tag) => <label key={tag.id} className="pill"><input type="checkbox" name="tagIds" value={tag.id} defaultChecked={selected.has(tag.id)} /> {tag.translations[0]?.name}</label>)}</div></fieldset>
      {taxonomyLocales.map((locale) => <fieldset key={locale} className="rounded-2xl border border-line p-5"><legend className="px-2 font-display font-black text-brand">{locale.toUpperCase()}</legend><div className="grid gap-3"><input required name={`title-${locale}`} defaultValue={translations[locale]?.title} placeholder="Tiêu đề" className={field} /><textarea required name={`excerpt-${locale}`} defaultValue={translations[locale]?.excerpt} placeholder="Tóm tắt" className={field} /><textarea required name={`content-${locale}`} defaultValue={translations[locale]?.content} placeholder="Nội dung Markdown" className={`${field} min-h-64 font-mono text-sm`} /></div></fieldset>)}
      <button className="btn btn-primary justify-self-start">Lưu bài viết</button>
    </form>
  );
}
