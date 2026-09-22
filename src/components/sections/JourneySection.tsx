"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/common/Button";
import { Section } from "@/components/common/Section";

type StepKey = "learn" | "certificate" | "direction" | "future";
const STEPS: StepKey[] = ["learn", "certificate", "direction", "future"];

/**
 * Section 6 — the 4-step learner journey visualized as a vertical flow.
 */
export function JourneySection() {
  const t = useTranslations("journey");
  const router = useRouter();
  return (
    <Section tinted>
      <div className="grid items-center gap-11 md:grid-cols-[.9fr_1.1fr]">
        <JourneyIllustration />
        <div>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="sec-title mt-3.5">{t("title")}</h2>
          <ol className="mt-6 flex flex-col">
            {STEPS.map((key, idx) => (
              <li key={key} className="relative flex items-start gap-4 pb-6 last:pb-0">
                <div
                  className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full font-display text-sm font-black text-white shadow-sm"
                  style={{ background: "var(--grad)" }}
                >
                  {idx + 1}
                </div>
                {idx < STEPS.length - 1 && (
                  <span className="absolute left-[21px] top-11 h-full w-[2px] bg-line-2" aria-hidden />
                )}
                <div className="flex-1 rounded-lg border border-line bg-surface px-5 py-3.5">
                  <div className="font-display text-[16px] font-extrabold text-ink">{t(`steps.${key}`)}</div>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[14.5px] italic text-ink-soft">{t("closing")}</p>
          <Button variant="primary" className="mt-6" onClick={() => router.push("/about")}>
            {t("cta")}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Button>
        </div>
      </div>
    </Section>
  );
}

function JourneyIllustration() {
  return (
    <div className="overflow-hidden rounded-xl shadow">
      <svg viewBox="0 0 500 480" role="img" aria-label="Journey illustration" className="block h-auto w-full">
        <defs>
          <linearGradient id="jn-panel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#eaf6ef" />
            <stop offset="1" stopColor="#dceff7" />
          </linearGradient>
          <linearGradient id="jn-arrow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#469142" />
            <stop offset="1" stopColor="#28b4d2" />
          </linearGradient>
        </defs>
        <rect width="500" height="480" rx="36" fill="url(#jn-panel)" />
        <path d="M80 380 Q 250 80 420 380" stroke="url(#jn-arrow)" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="2 14" />
        <g transform="translate(80,380)"><circle r="26" fill="#469142" /><text y="7" textAnchor="middle" fill="#fff" fontFamily="Montserrat" fontWeight="900" fontSize="18">1</text></g>
        <g transform="translate(210,190)"><circle r="26" fill="#28b4d2" /><text y="7" textAnchor="middle" fill="#fff" fontFamily="Montserrat" fontWeight="900" fontSize="18">2</text></g>
        <g transform="translate(340,190)"><circle r="26" fill="#e1ba23" /><text y="7" textAnchor="middle" fill="#3a2f00" fontFamily="Montserrat" fontWeight="900" fontSize="18">3</text></g>
        <g transform="translate(420,380)"><circle r="30" fill="#295326" /><text y="8" textAnchor="middle" fill="#fff" fontFamily="Montserrat" fontWeight="900" fontSize="20">★</text></g>
      </svg>
    </div>
  );
}
