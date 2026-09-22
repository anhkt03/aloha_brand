"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";

interface HeroSectionProps {
  onOpenRegister: () => void;
  onGoToCourses: () => void;
}

/**
 * Section 1 — brand hero. Big statement + tagline + primary CTAs and an
 * illustrative panel on the right.
 */
export function HeroSection({ onOpenRegister, onGoToCourses }: HeroSectionProps) {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden py-[clamp(40px,6vw,80px)]">
      <HeroBackdrop />
      <Container className="relative z-[1]">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="rise">
            <span className="inline-block font-display text-[clamp(15px,1.9vw,20px)] font-semibold italic text-teal">
              {t("tagline")}
            </span>
            <h1 className="mt-3 text-[clamp(34px,6vw,66px)] font-display font-black leading-[1.05] tracking-tight">
              {t("titleA")} <span className="grad-text">{t("titleB")}</span>
            </h1>
            <p className="mt-6 max-w-[36ch] text-[clamp(16px,1.9vw,20px)] text-ink-soft">{t("lead")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button variant="primary" onClick={onOpenRegister}>
                {t("ctaTrial")}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Button>
              <Button variant="ghost" onClick={onGoToCourses}>
                {t("ctaCourses")}
              </Button>
            </div>
          </div>
          <HeroIllustration />
        </div>
      </Container>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <span className="absolute -right-20 -top-32 h-[440px] w-[440px] rounded-full bg-teal opacity-[0.28] blur-[46px]" />
      <span className="absolute -bottom-36 -left-24 h-[380px] w-[380px] rounded-full bg-brand opacity-[0.22] blur-[46px]" />
      <span className="absolute left-[52%] top-[40%] h-[260px] w-[260px] rounded-full bg-accent opacity-[0.14] blur-[46px]" />
    </div>
  );
}

function HeroIllustration() {
  return (
    <div className="rise mx-auto w-full max-w-[460px] lg:max-w-none">
      <div className="overflow-hidden rounded-xl shadow-lg">
        <svg viewBox="0 0 560 600" role="img" aria-label="Illustration" className="block h-auto w-full">
          <defs>
            <linearGradient id="ig-panel" x1="0" y1="0" x2="0.9" y2="1">
              <stop offset="0" stopColor="#eaf6ef" />
              <stop offset="1" stopColor="#dceff7" />
            </linearGradient>
            <linearGradient id="ig-globe" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#41b8d8" />
              <stop offset="1" stopColor="#469142" />
            </linearGradient>
          </defs>
          <rect width="560" height="600" rx="40" fill="url(#ig-panel)" />
          <circle cx="475" cy="115" r="72" fill="#28b4d2" opacity="0.12" />
          <circle cx="85" cy="505" r="92" fill="#469142" opacity="0.1" />
          <circle cx="255" cy="300" r="120" fill="url(#ig-globe)" />
          <g stroke="#fff" strokeOpacity="0.55" strokeWidth="3" fill="none">
            <ellipse cx="255" cy="300" rx="120" ry="48" />
            <ellipse cx="255" cy="300" rx="48" ry="120" />
            <line x1="135" y1="300" x2="375" y2="300" />
          </g>
          <g fontFamily="Montserrat, sans-serif" fontWeight="800" textAnchor="middle">
            <g transform="translate(108,232)">
              <circle r="30" fill="#fff" />
              <circle r="24" fill="#469142" />
              <text y="7" fill="#fff" fontSize="18">EN</text>
            </g>
            <g transform="translate(452,255)">
              <circle r="30" fill="#fff" />
              <circle r="24" fill="#d93b3b" />
              <text y="9" fill="#fff" fontSize="24">中</text>
            </g>
            <g transform="translate(110,415)">
              <circle r="30" fill="#fff" />
              <circle r="24" fill="#2f6fd0" />
              <text y="9" fill="#fff" fontSize="24">한</text>
            </g>
            <g transform="translate(452,412)">
              <circle r="30" fill="#fff" />
              <circle r="24" fill="#295326" />
              <text y="9" fill="#fff" fontSize="24">日</text>
            </g>
          </g>
          <g transform="translate(150,120)">
            <rect x="-58" y="-26" width="116" height="52" rx="20" fill="#fff" />
            <text x="0" y="7" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight="800" fontSize="20" fill="#469142">
              Aloha!
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
