"use client";

import { useTranslations } from "next-intl";
import { Section, SectionHead } from "@/components/common/Section";
import { GRADIENTS } from "@/lib/constants";

type WhyKey = "roadmap" | "classSize" | "commitment" | "flexible" | "teachers" | "facility";

const WHY_ITEMS: { key: WhyKey; gradient: string }[] = [
  { key: "roadmap", gradient: GRADIENTS.brand },
  { key: "classSize", gradient: "linear-gradient(135deg,#28b4d2,#469142)" },
  { key: "commitment", gradient: GRADIENTS.warm },
  { key: "flexible", gradient: "linear-gradient(135deg,#469142,#295326)" },
  { key: "teachers", gradient: "linear-gradient(135deg,#2f6fd0,#28b4d2)" },
  { key: "facility", gradient: "linear-gradient(135deg,#d93b3b,#e1ba23)" },
];

/**
 * Section 4 — 6 differentiators, followed by a trust line at the bottom.
 */
export function FeatureSection() {
  const t = useTranslations("why");
  return (
    <Section tinted>
      <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_ITEMS.map((item) => (
          <article key={item.key} className="card hover">
            <div className="feat-ic" style={{ background: item.gradient }}>
              <WhyIcon name={item.key} />
            </div>
            <h3 className="text-lg font-extrabold">{t(`items.${item.key}.title`)}</h3>
            <p className="mt-2 text-[15px] text-ink-soft">{t(`items.${item.key}.desc`)}</p>
          </article>
        ))}
      </div>
      <p className="mt-12 text-center font-display text-[clamp(18px,2.4vw,26px)] font-extrabold">
        <span className="grad-text">{t("trust")}</span>
      </p>
    </Section>
  );
}

function WhyIcon({ name }: { name: WhyKey }) {
  const stroke = name === "commitment" ? "#3a2f00" : "currentColor";
  const paths: Record<WhyKey, React.ReactNode> = {
    roadmap: <path d="M12 20V10M18 20V4M6 20v-4" />,
    classSize: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    commitment: (
      <>
        <path d="m9 11 3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </>
    ),
    flexible: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 10h18M9 4v16" />
      </>
    ),
    teachers: (
      <>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </>
    ),
    facility: (
      <>
        <path d="M3 21V9l9-6 9 6v12" />
        <path d="M9 21v-8h6v8" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
      {paths[name]}
    </svg>
  );
}
