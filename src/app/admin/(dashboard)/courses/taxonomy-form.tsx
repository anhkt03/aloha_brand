import { taxonomyLocales } from "@/lib/validation/course-taxonomy";
import { Button, Panel, inputClass } from "@/components/admin/ui";

const LOCALE_LABELS: Record<string, string> = { vi: "Tiếng Việt", en: "English", zh: "中文", ko: "한국어", ja: "日本語" };

type TaxonomyItem = { id: number; translations: { locale: string; name: string }[] };

/** Shared name-only, 5-locale form for both course categories and course levels. */
export function TaxonomyForm({ action, item }: { action: (formData: FormData) => void | Promise<void>; item?: TaxonomyItem }) {
  const values = Object.fromEntries((item?.translations ?? []).map((t) => [t.locale, t.name]));
  return (
    <form action={action} className="grid max-w-xl gap-5">
      <input type="hidden" name="id" value={item?.id ?? ""} />
      <Panel title="Tên theo ngôn ngữ">
        <div className="grid gap-3 md:grid-cols-2">
          {taxonomyLocales.map((locale) => (
            <label key={locale} className="block text-sm font-semibold text-slate-700">
              {LOCALE_LABELS[locale] ?? locale.toUpperCase()}
              <input required name={`translation-${locale}`} defaultValue={values[locale]} className={inputClass} />
            </label>
          ))}
        </div>
      </Panel>
      <Button type="submit" className="justify-self-start">Lưu</Button>
    </form>
  );
}
