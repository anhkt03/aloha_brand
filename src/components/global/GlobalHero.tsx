"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";

interface GlobalHeroProps {
  onOpenRegister: () => void;
  onScrollToDestinations: () => void;
}

const STAT_KEYS = ["markets", "partners", "advised", "satisfaction"] as const;

/**
 * Section 1 — full-bleed photo with a left-to-right fade so the headline
 * stays readable over any image, matching the training-page hero pattern
 * (`TrainingHero`).
 */
export function GlobalHero({ onOpenRegister, onScrollToDestinations }: GlobalHeroProps) {
  const t = useTranslations("pages.global.hero");
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/studyabroad/hero.png"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, var(--surface) 0%, var(--surface) 35%, transparent 75%)",
        }}
      />

      <Container className="relative z-[1]">
        <div className="max-w-xl py-[clamp(36px,6vw,72px)]">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1 className="mt-3 font-display text-[clamp(28px,4.4vw,46px)] font-black leading-[1.16] tracking-tight text-ink">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-[48ch] text-[clamp(15px,1.6vw,17px)] text-ink-soft">{t("lead")}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button variant="primary" onClick={onScrollToDestinations}>
              {t("ctaPrimary")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Button>
            <Button variant="ghost" onClick={onOpenRegister}>
              <span
                className="grid h-6 w-6 place-items-center rounded-full text-white"
                style={{ background: "var(--grad)" }}
              >
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                  <path d="M6 4l14 8-14 8z" />
                </svg>
              </span>
              {t("ctaSecondary")}
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-9 gap-y-5">
            {STAT_KEYS.map((key) => (
              <div key={key}>
                <div className="font-display text-[clamp(20px,2.6vw,28px)] font-black leading-none text-brand tabular-nums">
                  {t(`stats.${key}.value`)}
                </div>
                <div className="mt-1.5 max-w-[13ch] text-[12.5px] font-semibold leading-snug text-ink-soft">
                  {t(`stats.${key}.label`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
