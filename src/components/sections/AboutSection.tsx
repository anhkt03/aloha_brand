"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/common/Button";
import { Section } from "@/components/common/Section";

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
          <p className="mt-6 text-[15px] text-ink-soft">{t("body")}</p>
          <Button variant="primary" className="mt-6" onClick={() => router.push("/about")}>
            {t("cta")}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Button>
        </div>
      </div>
      <div className="mt-11 grid gap-5 md:grid-cols-3">
        <StatCard onBrand value="10+" label={t("stats.years")} />
        <StatCard value="10+" label={t("stats.branches")} />
        <StatCard value="10.000+" label={t("stats.students")} />
      </div>
    </Section>
  );
}

function StatCard({ value, label, onBrand }: { value: string; label: string; onBrand?: boolean }) {
  const parts = value.match(/^([\d.]+)(\D*)$/);
  return (
    <div
      className={`relative overflow-hidden rounded-lg border p-7 ${
        onBrand ? "border-transparent text-white" : "border-line bg-surface"
      }`}
      style={onBrand ? { background: "var(--grad)" } : undefined}
    >
      {!onBrand && <span className="absolute inset-y-0 left-0 w-[5px]" style={{ background: "var(--grad)" }} />}
      <div className={`font-display text-[clamp(34px,5vw,52px)] font-black leading-none tabular-nums ${onBrand ? "text-white" : "text-brand"}`}>
        {parts ? parts[1] : value}
        {parts?.[2] && <span className={onBrand ? "text-white" : "text-accent"}>{parts[2]}</span>}
      </div>
      <div className={`mt-2 font-semibold ${onBrand ? "text-white/90" : "text-ink-soft"}`}>{label}</div>
    </div>
  );
}

function AboutIllustration() {
  return (
    <div className="overflow-hidden rounded-xl shadow">
      <svg viewBox="0 0 520 440" role="img" aria-label="ALOHA school illustration" className="block h-auto w-full">
        <defs>
          <linearGradient id="ab-panel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#eaf6ef" />
            <stop offset="1" stopColor="#dcecf7" />
          </linearGradient>
        </defs>
        <rect width="520" height="440" rx="36" fill="url(#ab-panel)" />
        <circle cx="445" cy="82" r="34" fill="#e1ba23" />
        <rect x="150" y="168" width="235" height="205" rx="16" fill="#fff" />
        <rect x="140" y="150" width="255" height="34" rx="10" fill="#295326" />
        <rect x="212" y="196" width="112" height="34" rx="8" fill="#469142" />
        <text x="268" y="220" textAnchor="middle" fontFamily="Montserrat" fontWeight="800" fontSize="19" fill="#fff">
          ALOHA
        </text>
      </svg>
    </div>
  );
}
