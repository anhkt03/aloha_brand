"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/common/Button";
import { Section } from "@/components/common/Section";
import { useCountUp } from "@/hooks/useCountUp";

/**
 * Section 2 — general introduction to ALOHA, built around 3 pillars:
 * Quality · Experience · Well-rounded growth. Followed by 3 stat cards.
 */
export function AboutSection() {
  const t = useTranslations("about");
  const router = useRouter();
  const pillars: Array<"quality" | "experience" | "growth"> = ["quality", "experience", "growth"];

  return (
    <Section tinted>
      <div className="grid items-center gap-11 md:grid-cols-2">
        <AboutIllustration />
        <div>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="sec-title mt-3.5">{t("title")}</h2>
          <blockquote className="mt-6 border-l-4 border-brand pl-5 text-[clamp(15px,1.7vw,18px)] italic text-ink-soft">
            {t("quote")}
          </blockquote>
          <div className="mt-5 flex flex-wrap gap-2">
            {pillars.map((key) => (
              <span key={key} className="pill brand">
                {t(`pillars.${key}`)}
              </span>
            ))}
          </div>
          <p className="mt-6 text-[15px] text-ink-soft">
            {t.rich("body", {
              b: (chunks) => <strong className="font-semibold text-ink">{chunks}</strong>,
            })}
          </p>
          <Button variant="primary" className="mt-6" onClick={() => router.push("/about")}>
            {t("cta")}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Button>
        </div>
      </div>
      <StatsRow t={t} />
    </Section>
  );
}

function StatsRow({ t }: { t: (key: string) => string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div ref={ref} className="mt-11 grid gap-5 md:grid-cols-3">
      <StatCard target={10} suffix="+" label={t("stats.years")} triggerRef={ref} />
      <StatCard target={10} suffix="+" label={t("stats.branches")} triggerRef={ref} />
      <StatCard target={10000} suffix="+" label={t("stats.students")} triggerRef={ref} />
    </div>
  );
}

interface StatCardProps {
  target: number;
  suffix?: string;
  label: string;
  triggerRef: React.RefObject<HTMLElement | null>;
}

function StatCard({ target, suffix = "", label, triggerRef }: StatCardProps) {
  const value = useCountUp({ end: target, duration: 3000, triggerRef });
  const formatted = value.toLocaleString("de-DE"); // 10.000 style (dot thousands)
  return (
    <div
      className="relative overflow-hidden rounded-lg border border-transparent p-7 text-white"
      style={{ background: "var(--grad)" }}
    >
      <span className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/10" aria-hidden />
      <span className="pointer-events-none absolute -bottom-14 -left-8 h-32 w-32 rounded-full bg-white/[.08]" aria-hidden />
      <div className="relative font-display text-[clamp(34px,5vw,52px)] font-black leading-none tabular-nums text-white">
        {formatted}
        <span className="text-white/95">{suffix}</span>
      </div>
      <div className="relative mt-2 font-semibold text-white/90">{label}</div>
    </div>
  );
}

function AboutIllustration() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-lg">
      <Image
        src="/images/homepage/aloha.jpg"
        alt="ALOHA Language School"
        fill
        sizes="(min-width:768px) 45vw, 90vw"
        className="object-cover"
        priority={false}
      />
    </div>
  );
}
