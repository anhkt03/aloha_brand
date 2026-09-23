"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";

/**
 * About page section 4 — Vision (single statement) + Mission (bullet list).
 * 2-column layout on md+, stacks on mobile.
 */
export function AboutVisionMission() {
  const t = useTranslations("pages.about.vmv");
  const missionItems = t.raw("mission.items") as string[];

  return (
    <div style={{ background: "var(--surface-2)" }}>
      <Container>
        <div className="section">
          <SectionHead center eyebrow={t("eyebrow")} title={`${t("vision.title")} · ${t("mission.title")}`} />

          <div className="grid gap-6 md:grid-cols-2">
            {/* Vision */}
            <article
              className="relative overflow-hidden rounded-2xl p-8 text-white shadow-lg"
              style={{ background: "var(--grad)" }}
            >
              <span aria-hidden className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-white/10" />
              <span aria-hidden className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-white/[.08]" />
              <div className="relative">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/20">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-2xl font-black">{t("vision.title")}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-white/95">{t("vision.desc")}</p>
              </div>
            </article>

            {/* Mission */}
            <article className="rounded-2xl border border-line bg-surface p-8 shadow-sm">
              <span
                className="grid h-14 w-14 place-items-center rounded-2xl text-white"
                style={{ background: "var(--grad)" }}
              >
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.5" />
                </svg>
              </span>
              <h3 className="mt-5 font-display text-2xl font-black text-ink">{t("mission.title")}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {missionItems.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] text-ink-soft">
                    <span
                      className="mt-1 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full text-white"
                      style={{ background: "var(--grad)" }}
                    >
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 13 5 5L20 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </Container>
    </div>
  );
}
