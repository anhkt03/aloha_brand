"use client";

import Image from "next/image";
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
              <li key={key} className="flex items-stretch gap-4 pb-6 last:pb-0">
                {/* The circle itself is the positioning context for the
                    connector below it, so centering is measured against its
                    own final rendered width — not a wrapper's ambiguous
                    shrink-to-fit width. */}
                <div
                  className="relative grid aspect-square h-full min-h-11 flex-shrink-0 place-items-center rounded-full font-display text-sm font-black text-white shadow-sm"
                  style={{ background: "var(--grad)" }}
                >
                  {idx + 1}
                  {idx < STEPS.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-full h-6 w-[2px] -translate-x-1/2 bg-line-2"
                    />
                  )}
                </div>
                <div className="flex-1 rounded-lg border border-line bg-surface px-5 py-3.5">
                  <div className="font-display text-[16px] font-extrabold text-ink">{t(`steps.${key}`)}</div>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[14.5px] italic text-ink-soft">{t("closing")}</p>
          <div className="mt-6 text-center md:text-left">
            <Button variant="primary" onClick={() => router.push("/about")}>
              {t("cta")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function JourneyIllustration() {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow">
      <Image
        src="/images/homepage/home-journey.webp"
        alt="Hành trình học tập cùng ALOHA"
        fill
        sizes="(min-width:768px) 45vw, 90vw"
        className="object-cover"
      />
    </div>
  );
}
