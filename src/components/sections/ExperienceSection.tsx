"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";

type ExpKey = "small" | "cycle" | "practice" | "support";

interface ItemStyle {
  key: ExpKey;
  /** Colour of the circle badge behind the icon. */
  bg: string;
  /** Colour of the big number and icon stroke. */
  fg: string;
}

const ITEMS: ItemStyle[] = [
  { key: "small", bg: "#dff0dc", fg: "#469142" },
  { key: "cycle", bg: "#fdf1c9", fg: "#e1ba23" },
  { key: "practice", bg: "#dbeef7", fg: "#28b4d2" },
  { key: "support", bg: "#dff0dc", fg: "#3a8034" },
];

/**
 * Section 5 — day-to-day learning experience.
 *
 * Layout: single row of 4 items (large tinted circle + oversized number +
 * title + description). Closes with a soft-green chat bubble that
 * emphasises the key phrase — no mascot / avatar illustration.
 */
export function ExperienceSection() {
  const t = useTranslations("experience");

  return (
    <Container>
      <div className="section">
        <SectionHead
          center
          eyebrow={t("eyebrow")}
          title={t.rich("title", {
            b: (chunks) => <span className="text-brand">{chunks}</span>,
          })}
        />

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, idx) => (
            <article key={item.key} className="flex flex-col">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-full"
                  style={{ background: item.bg, color: item.fg }}
                >
                  <ExpIcon name={item.key} />
                </span>
                <span
                  className="font-display text-[42px] font-black leading-none tabular-nums"
                  style={{ color: item.fg, opacity: 0.55 }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[17px] font-black text-ink">
                {t(`items.${item.key}.title`)}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                {t(`items.${item.key}.desc`)}
              </p>
            </article>
          ))}
        </div>

        {/* Closing chat bubble — no avatar. */}
        <div className="mt-14 flex justify-center">
          <div
            className="relative max-w-3xl rounded-[28px] border border-[color:var(--line)] px-8 py-6 text-center shadow-sm"
            style={{ background: "#eaf6ef" }}
          >
            <p className="text-[clamp(15px,1.7vw,18px)] leading-relaxed text-ink-soft">
              {t.rich("closing", {
                b: (chunks) => (
                  <strong className="font-display font-black text-brand-deep">{chunks}</strong>
                ),
              })}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

function ExpIcon({ name }: { name: ExpKey }) {
  const path: Record<ExpKey, React.ReactNode> = {
    small: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    cycle: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 15l2 2 4-4" />
      </>
    ),
    practice: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    ),
    support: (
      <>
        <path d="M3 12a9 9 0 1 1 18 0v6a2 2 0 0 1-2 2h-2v-8h4M3 12v6a2 2 0 0 0 2 2h2v-8H3" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width="30"
      height="30"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {path[name]}
    </svg>
  );
}
