"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";

type StepKey = "evaluate" | "plan" | "practice" | "review" | "achieve";
const STEPS: StepKey[] = ["evaluate", "plan", "practice", "review", "achieve"];

/**
 * "Lộ trình học tập" — 5 numbered steps. Row layout with chevron
 * connectors from lg; stacks with a vertical connector below that.
 */
export function RoadmapSection() {
  const t = useTranslations("pages.training.roadmap");

  return (
    <section className="section">
      <Container>
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:flex lg:items-stretch lg:gap-3">
          {STEPS.map((key, idx) => (
            <div key={key} className="flex flex-1 items-stretch gap-3">
              <article className="flex flex-1 flex-col gap-2 rounded-2xl border border-line bg-surface p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg lg:px-3.5">
                <span
                  className="grid h-10 w-10 place-items-center rounded-full font-display text-sm font-black text-white"
                  style={{ background: "var(--grad)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 whitespace-nowrap font-display text-[15px] font-black text-ink lg:text-[13px]">{t(`steps.${key}.title`)}</h3>
                <p className="text-[13px] leading-relaxed text-ink-soft">{t(`steps.${key}.desc`)}</p>
              </article>
              {idx < STEPS.length - 1 && (
                <span aria-hidden className="hidden flex-shrink-0 self-center text-line-2 lg:block">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
