"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";

interface EcosystemStep {
  num: string;
  title: string;
  items: string[];
}

const ACCENTS = ["var(--brand)", "var(--teal)", "var(--accent)", "var(--brand-deep)"];

/**
 * About page section 8 — 4-step ecosystem flow (language → certificate →
 * study abroad → future). Horizontal on md+ with connector arrows,
 * stacked with down-chevrons on mobile.
 */
export function AboutEcosystem() {
  const t = useTranslations("pages.about.ecosystem");
  const steps = t.raw("steps") as EcosystemStep[];

  return (
    <Container>
      <div className="section">
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} sub={t("lead")} />

        <div className="grid gap-4 md:grid-cols-[repeat(7,minmax(0,1fr))] md:items-stretch">
          {steps.map((step, idx) => (
            <div key={step.num} className="contents">
              <article
                className="relative flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5 shadow-sm md:col-span-2"
                style={{ borderTop: `4px solid ${ACCENTS[idx % ACCENTS.length]}` }}
              >
                <div
                  className="font-display text-[28px] font-black leading-none"
                  style={{ color: ACCENTS[idx % ACCENTS.length] }}
                >
                  {step.num}
                </div>
                <h3 className="font-display text-[16px] font-black text-ink">{step.title}</h3>
                <ul className="mt-1 flex flex-wrap gap-1.5">
                  {step.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-surface-2 px-2.5 py-1 text-[12px] font-semibold text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
              {idx < steps.length - 1 && (
                <div className="flex items-center justify-center py-1 text-brand md:col-span-1 md:py-0">
                  <Chevron />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 rotate-90 md:h-6 md:w-6 md:rotate-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
