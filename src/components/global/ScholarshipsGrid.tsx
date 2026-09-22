"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { scholarships } from "@/data/scholarships";

/**
 * Section 4 — featured scholarships grid. Each card highlights value +
 * audience so users can shortlist quickly.
 */
export function ScholarshipsGrid() {
  const t = useTranslations("pages.global.scholarships");
  return (
    <Container>
      <div className="section">
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {scholarships.map((s) => (
            <article
              key={s.key}
              className="relative overflow-hidden rounded-lg border border-line bg-surface p-6 transition hover:-translate-y-1 hover:shadow"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1.5"
                style={{ background: s.gradient }}
              />
              <div className="flex items-start gap-3">
                <span className="text-3xl leading-none">{s.countryFlag}</span>
                <div className="min-w-0">
                  <h3 className="font-display text-[16px] font-extrabold leading-tight">{s.name}</h3>
                  <div className="mt-0.5 text-[12.5px] font-semibold text-muted">{s.country}</div>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-[13.5px] text-ink-soft">
                <div>
                  <div className="text-[11.5px] font-semibold uppercase tracking-wide text-muted">
                    {t("valueLabel")}
                  </div>
                  <div className="mt-0.5 font-semibold text-ink">{s.value}</div>
                </div>
                <div>
                  <div className="text-[11.5px] font-semibold uppercase tracking-wide text-muted">
                    {t("audienceLabel")}
                  </div>
                  <div className="mt-0.5">{s.audience}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Container>
  );
}
