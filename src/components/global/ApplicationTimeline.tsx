"use client";

import { forwardRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { globalTimeline } from "@/data/globalTimeline";

/**
 * Section 3 — vertical timeline of the 7 major phases from evaluation to
 * departure. Each step is anchored on a month range so students see the
 * full year at a glance.
 */
export const ApplicationTimeline = forwardRef<HTMLElement>(function ApplicationTimeline(_, ref) {
  const t = useTranslations("pages.global.timeline");
  return (
    <section ref={ref} className="section" style={{ background: "var(--surface-2)" }}>
      <Container>
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />

        <ol className="relative mx-auto mt-12 max-w-3xl">
          {/* Central spine */}
          <div
            aria-hidden
            className="absolute left-[26px] top-0 h-full w-[2px] md:left-1/2 md:-translate-x-1/2"
            style={{ background: "linear-gradient(180deg, var(--brand), var(--teal))" }}
          />

          {globalTimeline.map((step, idx) => {
            const alignRight = idx % 2 === 1;
            return (
              <li
                key={step.title}
                className="relative mb-8 grid grid-cols-[54px_1fr] gap-4 md:mb-10 md:grid-cols-2 md:gap-10"
              >
                {/* Marker */}
                <div
                  aria-hidden
                  className={`relative flex md:col-start-1 md:justify-end ${
                    alignRight ? "md:col-start-2 md:justify-start" : ""
                  }`}
                >
                  <span
                    className="relative z-[1] grid h-[54px] w-[54px] place-items-center rounded-full font-display text-lg font-black text-white shadow"
                    style={{ background: "var(--grad)" }}
                  >
                    {idx + 1}
                  </span>
                </div>

                {/* Card */}
                <div
                  className={`rounded-lg border border-line bg-surface p-5 shadow-sm md:col-start-2 ${
                    alignRight ? "md:col-start-1 md:text-right" : ""
                  }`}
                >
                  <div className="font-display text-[12.5px] font-extrabold uppercase tracking-widest text-brand">
                    {step.monthRange}
                  </div>
                  <h3 className="mt-1 text-[17px] font-extrabold">{step.title}</h3>
                  <p className="mt-2 text-[14.5px] text-ink-soft">{step.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
});
