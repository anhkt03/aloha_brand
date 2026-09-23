import { taxonomyLocales } from "@/lib/validation/course-taxonomy";

const localeNames: Record<(typeof taxonomyLocales)[number], string> = {
  vi: "Tiếng Việt",
  en: "English",
  ko: "한국어",
  ja: "日本語",
};

export function TranslationTabs({ values = {} }: { values?: Partial<Record<(typeof taxonomyLocales)[number], string>> }) {
  return (
    <fieldset className="rounded-2xl border border-line bg-slate-50/60 p-4">
      <legend className="px-2 text-sm font-bold text-slate-800">Bản dịch</legend>
      <div className="grid gap-4 md:grid-cols-2">
        {taxonomyLocales.map((locale) => (
          <label key={locale} className="grid gap-1.5">
            <span className="flex items-center justify-between text-sm font-semibold">
              <span>{localeNames[locale]}</span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-black text-emerald-800">{locale.toUpperCase()}</span>
            </span>
            <input
              name={`translation-${locale}`}
              defaultValue={values[locale]}
              required
              placeholder={`Tên bằng ${localeNames[locale]}`}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}
