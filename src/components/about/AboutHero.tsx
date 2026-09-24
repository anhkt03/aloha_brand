"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";

type StatKey = "years" | "students" | "branches" | "goal";
const STAT_KEYS: StatKey[] = ["years", "students", "branches", "goal"];

interface AboutHeroProps {
  onOpenRegister: () => void;
}

/**
 * About page — hero. Full-bleed background image across the whole
 * section, with a gradient overlay so text + stats stay readable.
 */
export function AboutHero({ onOpenRegister }: AboutHeroProps) {
  const t = useTranslations("pages.about.hero");

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/about/ecosystem/aloha-section-1.png"
          alt="ALOHA class"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.2) 100%)",
          }}
        />
      </div>

      <Container>
        <div className="py-[clamp(48px,7vw,96px)]">
          <div className="max-w-[640px]">
            <span className="inline-block font-display text-[clamp(14px,1.6vw,17px)] font-semibold italic text-brand">
              {t("tagline")}
            </span>
            <h1 className="mt-3 font-display text-[clamp(30px,4.6vw,52px)] font-black leading-[1.1] tracking-tight text-white">
              <span className="block">{t("titleA")}</span>
              <span className="grad-text mt-1 block">{t("titleB")}</span>
            </h1>
            <p className="mt-5 max-w-[52ch] text-[clamp(15px,1.7vw,18px)] text-white/85">
              {t("lead")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="primary" onClick={onOpenRegister}>
                {t("ctaExplore")}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Button>
              <Button variant="ghost" onClick={() => {}}>
                <span
                  className="grid h-6 w-6 place-items-center rounded-full text-white"
                  style={{ background: "var(--brand)" }}
                >
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                    <path d="M6 4l14 8-14 8z" />
                  </svg>
                </span>
                {t("ctaVideo")}
              </Button>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STAT_KEYS.map((key) => (
                <li
                  key={key}
                  className="flex min-h-[104px] flex-col justify-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-sm shadow-sm"
                >
                  <div className="font-display text-[clamp(18px,2.4vw,24px)] font-black leading-none text-white tabular-nums">
                    {t(`stats.${key}.value`)}
                  </div>
                  <div className="text-[11.5px] font-semibold leading-snug text-white/80">
                    {t(`stats.${key}.label`)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}