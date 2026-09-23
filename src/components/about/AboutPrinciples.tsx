"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";

interface Principle {
  title: string;
  desc: string;
}

const ICONS = [
  // Học đúng
  <>
    <path d="M4 6h12M4 12h16M4 18h8" />
    <path d="M20 15l-4 4-2-2" />
  </>,
  // Thực hành đủ
  <>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </>,
  // Ứng dụng thật
  <>
    <path d="M3 3h18v18H3z" />
    <path d="M3 9h18M9 21V9" />
  </>,
];

/**
 * About page section 6 — teaching philosophy motto + 3 principles.
 * Left: motto card with the Chinese saying; right: 3 principle cards.
 */
export function AboutPrinciples() {
  const t = useTranslations("pages.about.principles");
  const items = t.raw("items") as Principle[];

  return (
    <div style={{ background: "var(--surface-2)" }}>
      <Container>
        <div className="section">
          <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />

          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            {/* Motto card */}
            <article
              className="relative overflow-hidden rounded-2xl p-8 text-white shadow-lg"
              style={{ background: "linear-gradient(140deg,#295326 0%,#469142 100%)" }}
            >
              <span aria-hidden className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
              <span aria-hidden className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/[.08]" />
              <div className="relative">
                <div className="font-display text-[11.5px] font-extrabold uppercase tracking-widest text-white/80">
                  {t("subtitle")}
                </div>
                <p className="mt-4 font-display text-[clamp(24px,3vw,34px)] font-black leading-tight">
                  {t("motto")}
                </p>
              </div>
            </article>

            {/* Principles */}
            <div className="grid gap-4 sm:grid-cols-3">
              {items.map((p, idx) => (
                <article
                  key={p.title}
                  className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <span
                    className="grid h-12 w-12 place-items-center rounded-xl text-brand"
                    style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
                  >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {ICONS[idx]}
                    </svg>
                  </span>
                  <h3 className="font-display text-[16px] font-black text-ink">{p.title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-ink-soft">{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
