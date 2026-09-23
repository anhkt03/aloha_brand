"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { destinations } from "@/data/destinations";

interface GlobalHeroProps {
  onOpenRegister: () => void;
  onScrollToTimeline: () => void;
}

/**
 * Section 1 — big statement + trust badges + preview strip of country flags.
 * Uses a warm brand gradient with soft blobs so it works without any photo.
 */
export function GlobalHero({ onOpenRegister, onScrollToTimeline }: GlobalHeroProps) {
  const t = useTranslations("pages.global");
  return (
    <section
      className="relative overflow-hidden py-[clamp(56px,8vw,110px)] text-white"
      style={{
        background:
          "linear-gradient(135deg,#12233f 0%,#1b6d80 55%,#28b4d2 100%)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70">
        <span className="absolute -left-24 top-6 h-72 w-72 rounded-full bg-teal/40 blur-3xl" />
        <span className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
        <span className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/30 blur-3xl" />
      </div>

      <Container className="relative z-[1]">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 font-display text-[12.5px] font-extrabold uppercase tracking-widest backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {t("hero.badge")}
          </span>
          <span className="mt-6 font-display text-[clamp(14px,1.5vw,17px)] font-semibold italic text-teal/90">
            {t("eyebrow")}
          </span>
          <h1 className="mt-3 font-display text-[clamp(32px,5vw,58px)] font-black leading-[1.1] tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-[clamp(15px,1.7vw,18px)] text-white/85">
            {t("lead")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button variant="accent" onClick={onOpenRegister}>
              {t("hero.ctaPrimary")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Button>
            <Button variant="outlineW" onClick={onScrollToTimeline}>
              {t("hero.ctaSecondary")}
            </Button>
          </div>

          {/* Destination flags strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {destinations.map((d) => (
              <span
                key={d.key}
                className="flex items-center gap-2 rounded-full bg-white/12 px-4 py-1.5 font-display text-sm font-bold backdrop-blur"
                title={t(`destinations.${d.key}.name`)}
              >
                <span className="text-lg leading-none">{d.flag}</span>
                {t(`destinations.${d.key}.name`)}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
