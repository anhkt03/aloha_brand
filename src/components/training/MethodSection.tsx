"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";

type ItemKey = "smallClass" | "practice" | "tracking" | "personalize" | "commitment";
const ITEMS: ItemKey[] = ["smallClass", "practice", "tracking", "personalize", "commitment"];

/**
 * "Phương pháp học tại ALOHA" — 5 method highlights on the left, a
 * pull-quote card on the right.
 */
export function MethodSection() {
  const t = useTranslations("pages.training.method");

  return (
    <div style={{ background: "var(--surface-2)" }}>
      <Container>
        <div className="section">
          <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-center">
            <div className="grid gap-5 sm:grid-cols-3">
              {ITEMS.map((key, idx) => (
                <article key={key} className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5 shadow-sm">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl text-brand"
                    style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
                  >
                    <MethodIcon index={idx} />
                  </span>
                  <h3 className="font-display text-[14.5px] font-black leading-snug text-ink">{t(`items.${key}.title`)}</h3>
                  <p className="text-[12.5px] leading-relaxed text-ink-soft">{t(`items.${key}.desc`)}</p>
                </article>
              ))}
            </div>

            <article
              className="relative overflow-hidden rounded-2xl p-8 text-white shadow-lg"
              style={{ background: "linear-gradient(140deg,#295326 0%,#469142 100%)" }}
            >
              <span aria-hidden className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
              <span aria-hidden className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/[.08]" />
              <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" className="relative text-white/40">
                <path d="M7 10c-2.2 0-4 1.8-4 4v6h6v-6H6c0-1.1.9-2 2-2V10zm11 0c-2.2 0-4 1.8-4 4v6h6v-6h-3c0-1.1.9-2 2-2V10z" />
              </svg>
              <p className="relative mt-4 font-display text-[clamp(17px,1.9vw,21px)] font-extrabold leading-snug">
                {t("quote")}
              </p>
              <div className="relative mt-5 text-[13px] font-semibold text-white/80">— {t("quoteAuthor")}</div>
            </article>
          </div>
        </div>
      </Container>
    </div>
  );
}

function MethodIcon({ index }: { index: number }) {
  const paths: React.ReactNode[] = [
    // small class
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
    </>,
    // learn - practice - apply
    <>
      <path d="M4 6h12M4 12h16M4 18h8" />
      <path d="M20 15l-4 4-2-2" />
    </>,
    // tracking
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 5-6" />
    </>,
    // personalize
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
      <path d="M17 5l1.5 1.5L22 3" />
    </>,
    // commitment
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M9 15l2 2 4-4" />
    </>,
  ];
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[index]}
    </svg>
  );
}
