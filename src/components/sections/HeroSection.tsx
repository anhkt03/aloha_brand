"use client";

import Image from "next/image";
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
            <span className="inline-block font-display text-[clamp(15px,1.9vw,20px)] font-semibold italic text-brand">
              {t("tagline")}
            </span>
            <h1 className="mt-3 text-[clamp(26px,4.4vw,48px)] font-display font-black leading-[1.1] tracking-tight">
              <span className="block">{t("titleA")}</span>
              <span className="grad-text mt-1 block">{t("titleB")}</span>
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
    <div className="rise relative mx-auto aspect-square w-full max-w-[340px] lg:max-w-[400px]">
      {/* Earth photo — outer wrapper floats, inner spins so both work.
          Clip-path hides the JPG's baked-in checkered background. */}
      <div className="relative h-full w-full animate-hero-float">
        <div className="relative h-full w-full animate-hero-spin">
          <Image
            src="/images/homepage/earth.jpg"
            alt="Earth"
            fill
            priority
            sizes="(min-width:1024px) 400px, (min-width:640px) 340px, 80vw"
            className="object-contain"
            style={{
              clipPath: "circle(46% at 50% 50%)",
              WebkitClipPath: "circle(46% at 50% 50%)",
            }}
          />
        </div>
      </div>

      {/* Floating language badges */}
      <LangBadge className="left-[6%] top-[26%]" bg="#469142" glyph="EN" size={44} />
      <LangBadge className="right-[6%] top-[18%]" bg="#d93b3b" glyph="中" size={48} />
      <LangBadge className="left-[10%] bottom-[16%]" bg="#2f6fd0" glyph="한" size={48} />
      <LangBadge className="right-[8%] bottom-[24%]" bg="#295326" glyph="日" size={48} />

      {/* Aloha! speech bubble */}
      <div className="absolute left-[18%] top-[4%] rounded-full bg-white px-4 py-1.5 shadow ring-1 ring-black/5">
        <span className="font-display text-sm font-black text-brand">Aloha!</span>
      </div>
    </div>
  );
}

interface LangBadgeProps {
  className?: string;
  bg: string;
  glyph: string;
  size?: number;
}

function LangBadge({ className, bg, glyph, size = 60 }: LangBadgeProps) {
  return (
    <span
      className={`absolute grid place-items-center rounded-full bg-white shadow-lg ring-1 ring-black/5 ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <span
        className="grid place-items-center rounded-full font-display font-black text-white"
        style={{ width: size - 12, height: size - 12, background: bg }}
      >
        <span style={{ fontSize: glyph.length > 1 ? size * 0.32 : size * 0.42 }}>{glyph}</span>
      </span>
    </span>
  );
}
