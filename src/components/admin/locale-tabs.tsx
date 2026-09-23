"use client";

import { useState } from "react";

const LOCALE_LABELS: Record<string, string> = { vi: "Tiếng Việt", en: "English", zh: "中文", ko: "한국어", ja: "日本語" };

/**
 * Renders one tab per locale but keeps every panel mounted (just visually
 * hidden), so a native form submit still carries every locale's fields
 * regardless of which tab is showing.
 */
export function LocaleTabs({ locales, children }: { locales: readonly string[]; children: (locale: string) => React.ReactNode }) {
  const [active, setActive] = useState<string>(locales[0]);
  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-1 border-b border-slate-200">
        {locales.map((locale) => (
          <button
            key={locale}
            type="button"
            role="tab"
            aria-selected={active === locale}
            onClick={() => setActive(locale)}
            className={`-mb-px rounded-t-md border-b-2 px-3.5 py-2 text-sm font-semibold transition ${
              active === locale ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {LOCALE_LABELS[locale] ?? locale.toUpperCase()}
          </button>
        ))}
      </div>
      {locales.map((locale) => (
        <div key={locale} hidden={active !== locale} className="grid gap-3 pt-4">
          {children(locale)}
        </div>
      ))}
    </div>
  );
}
