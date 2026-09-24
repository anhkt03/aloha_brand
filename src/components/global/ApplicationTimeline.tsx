"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { globalTimelineSteps } from "@/data/globalTimeline";

const ICONS: React.ReactNode[] = [
  // 01 — tư vấn & định hướng
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.5" fill="currentColor" />
  </>,
  // 02 — chọn trường & chương trình
  <>
    <path d="M12 21s-7-5.4-7-11a7 7 0 0 1 14 0c0 5.6-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.4" />
  </>,
  // 03 — chuẩn bị hồ sơ
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M9 13h6M9 17h6" />
  </>,
  // 04 — nộp hồ sơ
  <>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4z" />
  </>,
  // 05 — visa & chuẩn bị lên đường
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 4v3M16 4v3" />
    <path d="m9 15 2 2 4-4" />
  </>,
  // 06 — nhập học
  <>
    <path d="M22 10 12 5 2 10l10 5 10-5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </>,
];

/**
 * Section 6 — "Quy trình du học". Horizontal 6-step process connected by
 * arrows, wraps to a grid on small screens.
 */
export function ApplicationTimeline() {
  const t = useTranslations("pages.global.timeline");
  return (
    <section className="section" style={{ background: "var(--surface-2)" }}>
      <Container>
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />

        <div className="flex flex-wrap items-start justify-center gap-x-1 gap-y-10 lg:flex-nowrap">
          {globalTimelineSteps.map((stepKey, idx) => (
            <Fragment key={stepKey}>
              <div className="flex w-[min(220px,44vw)] flex-col items-center rounded-2xl border border-brand bg-surface p-5 text-center shadow-sm lg:w-auto lg:flex-1">
                <span
                  className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl text-white shadow-sm"
                  style={{ background: "var(--grad)" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {ICONS[idx]}
                  </svg>
                </span>
                <div className="mt-3 font-display text-[12px] font-extrabold uppercase tracking-widest text-brand">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-1 text-[14.5px] font-extrabold leading-snug text-ink">
                  {t(`steps.${stepKey}.title`)}
                </h3>
                <p className="mt-1.5 max-w-[22ch] text-[12.5px] leading-relaxed text-ink-soft">
                  {t(`steps.${stepKey}.desc`)}
                </p>
              </div>
              {idx < globalTimelineSteps.length - 1 && (
                <span aria-hidden className="hidden flex-shrink-0 pt-9 text-line-2 lg:block">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              )}
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}
