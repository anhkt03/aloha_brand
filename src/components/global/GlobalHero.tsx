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
 * Section 1 — big statement, dual CTA, quick stats row and a photo panel.
 */
export function GlobalHero({ onOpenRegister, onScrollToDestinations }: GlobalHeroProps) {
  const t = useTranslations("pages.global.hero");
  return (
    <section className="relative overflow-hidden py-[clamp(36px,6vw,72px)]">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_.9fr]">
          <div className="rise">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h1 className="mt-3 max-w-xl font-display text-[clamp(28px,4.4vw,46px)] font-black leading-[1.16] tracking-tight text-ink">
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

          <div className="rise relative mx-auto w-full max-w-[420px]">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-3 left-1 z-[1] -rotate-3 font-display text-[15px] italic leading-tight text-brand sm:text-[17px]"
            >
              New Places
              <br />
              New Opportunities
            </span>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-lg">
              <div aria-hidden className="absolute inset-0" style={{ background: "var(--grad-soft)" }} />
              <Image
                src="/images/studyabroad/studyaboad.jpg"
                alt="Du học cùng ALOHA"
                fill
                priority
                sizes="(min-width:1024px) 40vw, 90vw"
                className="object-contain p-6"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
