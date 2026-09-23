"use client";

import { useState } from "react";
import { taxonomyLocales } from "@/lib/validation/course-taxonomy";

export function TranslationTabs({ values = {} }: { values?: Partial<Record<(typeof taxonomyLocales)[number], string>> }) {
  const [locale, setLocale] = useState<(typeof taxonomyLocales)[number]>("vi");
  return <fieldset><legend className="mb-2 text-sm font-semibold">Bản dịch</legend><div className="mb-3 flex gap-2">{taxonomyLocales.map((item) => <button type="button" key={item} onClick={() => setLocale(item)} className={`rounded px-3 py-1 text-sm ${locale === item ? "bg-emerald-700 text-white" : "bg-slate-100"}`}>{item.toUpperCase()}</button>)}</div>{taxonomyLocales.map((item) => <label key={item} className={locale === item ? "grid gap-1" : "hidden"}><span className="text-sm">Tên ({item.toUpperCase()})</span><input name={`translation-${item}`} defaultValue={values[item]} required className="rounded border border-slate-300 px-3 py-2" /></label>)}</fieldset>;
}
