"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";

type LangKey = "zh" | "en" | "ko" | "ja";

interface LangStyle {
  key: LangKey;
  glyph: string;
  gradient: string;
}

const LANGS: LangStyle[] = [
  { key: "zh", glyph: "中", gradient: "linear-gradient(145deg,#d93b3b 0%,#a72424 100%)" },
  { key: "en", glyph: "EN", gradient: "linear-gradient(145deg,#469142 0%,#295326 100%)" },
  { key: "ko", glyph: "한", gradient: "linear-gradient(145deg,#2f6fd0 0%,#1b4a8f 100%)" },
  { key: "ja", glyph: "日", gradient: "linear-gradient(145deg,#28b4d2 0%,#1b6d80 100%)" },
];

/**
 * "Các chương trình đào tạo" — 4 language cards. The CTA on each card
 * scrolls down to the live course list further down the page rather than
 * linking out, since courses aren't split into per-language routes yet.
 */
export function ProgramsSection() {
  const t = useTranslations("pages.training.programs");

  return (
    <section id="chuong-trinh" className="section scroll-mt-24">
      <Container>
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LANGS.map((lang) => (
            <article
              key={lang.key}
              className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 p-6 pb-4">
                <span
                  className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl font-display font-black text-white"
                  style={{ background: lang.gradient }}
                >
                  <span style={{ fontSize: lang.glyph.length > 1 ? 15 : 20 }}>{lang.glyph}</span>
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[18px] font-black text-ink">{t(`items.${lang.key}.name`)}</h3>
                  <span className="pill brand mt-1">{t(`items.${lang.key}.badge`)}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 px-6 pb-6">
                <p className="text-[14px] leading-relaxed text-ink-soft">{t(`items.${lang.key}.desc`)}</p>
                <a
                  href="#danh-sach-khoa-hoc"
                  className="mt-auto inline-flex items-center gap-2 self-start font-display text-[14px] font-extrabold text-brand hover:underline"
                >
                  {t("cta")}
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
