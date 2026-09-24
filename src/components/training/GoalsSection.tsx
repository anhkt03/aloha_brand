"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";

type GoalKey = "certificate" | "study" | "work" | "abroad";
const GOALS: GoalKey[] = ["certificate", "study", "work", "abroad"];

/**
 * "Học theo mục tiêu" — 4 goal cards. The certificate card additionally
 * shows a badge line listing the exam systems (HSK/IELTS/TOEIC/TOPIK/JLPT).
 */
export function GoalsSection() {
  const t = useTranslations("pages.training.goals");

  return (
    <div style={{ background: "var(--surface-2)" }}>
      <Container>
        <div className="section">
          <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GOALS.map((key) => (
              <article
                key={key}
                className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className="mx-auto grid h-14 w-14 place-items-center rounded-2xl text-brand"
                  style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
                >
                  <GoalIcon name={key} />
                </span>
                <h3 className="font-display text-[16px] font-black text-ink">{t(`items.${key}.title`)}</h3>
                {key === "certificate" && (
                  <span className="pill brand mx-auto whitespace-normal text-center text-[10.5px] leading-tight">
                    {t("items.certificate.badge")}
                  </span>
                )}
                <p className="text-[13.5px] leading-relaxed text-ink-soft">{t(`items.${key}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

function GoalIcon({ name }: { name: GoalKey }) {
  const paths: Record<GoalKey, React.ReactNode> = {
    certificate: (
      <>
        <circle cx="12" cy="8" r="5" />
        <path d="M8.5 12.5 7 22l5-3 5 3-1.5-9.5" />
      </>
    ),
    study: (
      <>
        <path d="M22 10 12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </>
    ),
    work: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    ),
    abroad: (
      <path d="M2 16l20-8-8 20-3-8-9-4z" />
    ),
  };
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}
