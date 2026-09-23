"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";

type StepKey = "learn" | "certificate" | "direction" | "future";

const STEPS: { key: StepKey; icon: React.ReactNode }[] = [
  {
    key: "learn",
    icon: (
      <>
        <path d="M4 4h6a4 4 0 0 1 4 4v12" />
        <path d="M20 4h-6a4 4 0 0 0-4 4v12" />
      </>
    ),
  },
  {
    key: "certificate",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 15l2 2 4-4" />
      </>
    ),
  },
  {
    key: "direction",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </>
    ),
  },
  {
    key: "future",
    icon: (
      <>
        <path d="M2 22h20M4 22V10l8-6 8 6v12" />
        <path d="M9 22v-6h6v6" />
      </>
    ),
  },
];

/**
 * About page section 2 — "ALOHA là ai?" description + 4-step chain
 * (learn → certificate → direction → future). Arrows separate steps on
 * desktop; the chain wraps to a vertical stack on mobile.
 */
export function AboutWhat() {
  const t = useTranslations("pages.about.what");
  return (
    <Container>
      <div className="section">
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} sub={t("lead")} />

        <div className="mt-12 flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-center md:gap-2">
          {STEPS.map((step, idx) => (
            <div key={step.key} className="flex flex-col items-center gap-4 md:flex-row md:items-start">
              <div className="flex flex-col items-center text-center md:w-40">
                <span
                  className="grid h-16 w-16 place-items-center rounded-2xl text-white shadow"
                  style={{ background: "var(--grad)" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {step.icon}
                  </svg>
                </span>
                <span className="mt-3 font-display text-[14px] font-extrabold text-ink">
                  {t(`steps.${step.key}`)}
                </span>
              </div>
              {idx < STEPS.length - 1 && <Arrow />}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-5 w-5 rotate-90 text-brand md:mt-5 md:h-6 md:w-6 md:rotate-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 20h24M22 10l10 10-10 10" />
    </svg>
  );
}
