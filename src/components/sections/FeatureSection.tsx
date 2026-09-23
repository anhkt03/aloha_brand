"use client";

import { useTranslations } from "next-intl";
import { Section, SectionHead } from "@/components/common/Section";

type WhyKey = "roadmap" | "classSize" | "commitment" | "flexible" | "teachers" | "facility";

interface FeatureStyle {
  key: WhyKey;
  /** Icon square background (pastel). */
  bg: string;
  /** Icon stroke + big faded number colour. */
  fg: string;
}

const ITEMS: FeatureStyle[] = [
  { key: "roadmap", bg: "#dff0dc", fg: "#469142" },
  { key: "classSize", bg: "#ddefe6", fg: "#3a8a67" },
  { key: "commitment", bg: "#f2ecc7", fg: "#a08a10" },
  { key: "flexible", bg: "#dfe8dc", fg: "#5b9a53" },
  { key: "teachers", bg: "#dbeef7", fg: "#2f6fd0" },
  { key: "facility", bg: "#f6dfc8", fg: "#c46a2c" },
];

/**
 * Section 4 — "Why ALOHA?".
 *
 * Layout: 3×2 grid of feature cards. Each card has a pastel icon square
 * in the top-left, a big translucent number in the bottom-right, and
 * title + description on the left. Bottom bar shows a trust pill with a
 * people icon. Decorative sparkles bracket the title and a cursive
 * tagline sits at the bottom-left of the section.
 */
export function FeatureSection() {
  const t = useTranslations("why");
  return (
    <Section tinted>
      <div className="relative">
        <SectionHead
          center
          eyebrow={t("eyebrow")}
          title={
            <span className="inline-flex items-center gap-3">
              <SparkleMark side="left" />
              <span>
                {t.rich("title", {
                  b: (chunks) => <span className="text-brand">{chunks}</span>,
                })}
              </span>
              <SparkleMark side="right" />
            </span>
          }
          sub={t("sub")}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <FeatureCard
              key={item.key}
              style={item}
              title={t(`items.${item.key}.title`)}
              desc={t(`items.${item.key}.desc`)}
            />
          ))}
        </div>

        {/* Trust pill + decorative flourishes. */}
        <div className="mt-12 flex items-center justify-center">
          <div
            className="flex items-center gap-3 rounded-full px-5 py-2.5 shadow-sm ring-1 ring-brand/15"
            style={{ background: "color-mix(in srgb, var(--brand) 12%, var(--surface))" }}
          >
            <span
              className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-white"
              style={{ background: "var(--grad)" }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            <span className="font-display text-[clamp(14px,1.6vw,17px)] font-extrabold text-ink">
              {t("trust")}
            </span>
          </div>
        </div>

      </div>
    </Section>
  );
}

/* --------- Feature card --------- */
interface FeatureCardProps {
  style: FeatureStyle;
  title: string;
  desc: string;
}

function FeatureCard({ style, title, desc }: FeatureCardProps) {
  // NOTE: reserve `style.fg` for future decorative image overlay — drop a
  // photo at `public/images/why/<key>.jpg` and render it here with low
  // opacity when the client provides the assets.
  return (
    <article className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <span
          className="mb-5 grid h-14 w-14 place-items-center rounded-2xl"
          style={{ background: style.bg, color: style.fg }}
        >
          <FeatureIcon name={style.key} />
        </span>
        <h3 className="font-display text-[17px] font-black text-ink">{title}</h3>
        <p className="mt-2 max-w-[26ch] text-[14px] leading-relaxed text-ink-soft">{desc}</p>
      </div>
    </article>
  );
}

function FeatureIcon({ name }: { name: WhyKey }) {
  const paths: Record<WhyKey, React.ReactNode> = {
    roadmap: (
      <>
        <path d="M3 17l6-6 4 4 8-9" />
        <path d="M17 6h4v4" />
      </>
    ),
    classSize: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    commitment: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 15l2 2 4-4" />
      </>
    ),
    flexible: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    teachers: (
      <>
        <path d="M22 10 12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </>
    ),
    facility: (
      <>
        <path d="M3 21V7l7-4 7 4v14M3 21h18M9 9h2m-2 4h2m-2 4h2m4-8h2m-2 4h2m-2 4h2" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

/* --------- Sparkle mark next to the title --------- */
function SparkleMark({ side }: { side: "left" | "right" }) {
  const rotate = side === "left" ? "rotate(-8deg)" : "rotate(8deg) scaleX(-1)";
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 40"
      className="hidden h-8 text-brand sm:block"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      style={{ transform: rotate }}
    >
      <path d="M6 20h10M8 12l6 6M8 28l6-6" />
    </svg>
  );
}
