"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { useCountUp } from "@/hooks/useCountUp";

type StatKey = "years" | "branches" | "students" | "languages" | "goal";

interface StatDef {
  key: StatKey;
  target: number;
  suffix: string;
  icon: React.ReactNode;
}

const STATS: StatDef[] = [
  { key: "years", target: 10, suffix: "+", icon: <CapIcon /> },
  { key: "branches", target: 10, suffix: "+", icon: <BuildingIcon /> },
  { key: "students", target: 10000, suffix: "+", icon: <PeopleIcon /> },
  { key: "languages", target: 4, suffix: "+", icon: <GlobeIcon /> },
  { key: "goal", target: 95, suffix: "%", icon: <TargetIcon /> },
];

/**
 * "Số liệu biết nói" — 5 stat cards. White cards on a soft brand-tinted
 * background, numbers count up from 0 when the row enters the viewport.
 * On mobile the cards stack 2 per row; from lg they lay out in a single
 * row of 5.
 */
export function StatsSection() {
  const t = useTranslations("stats");
  const rowRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="section" style={{ background: "var(--surface-2)" }}>
      <Container>
        <SectionHead
          center
          eyebrow={t("eyebrow")}
          title={t.rich("title", {
            b: (chunks) => <span className="text-brand">{chunks}</span>,
          })}
          sub={t("sub")}
        />

        <div
          ref={rowRef}
          className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        >
          {STATS.map((stat) => (
            <StatCard
              key={stat.key}
              icon={stat.icon}
              target={stat.target}
              suffix={stat.suffix}
              label={t(`items.${stat.key}`)}
              triggerRef={rowRef}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  target: number;
  suffix: string;
  label: string;
  triggerRef: React.RefObject<HTMLElement | null>;
}

function StatCard({ icon, target, suffix, label, triggerRef }: StatCardProps) {
  const value = useCountUp({ end: target, duration: 3000, triggerRef });
  const formatted = value.toLocaleString("de-DE");
  return (
    <article className="relative flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <span
        className="grid h-11 w-11 place-items-center rounded-xl text-brand"
        style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
      >
        {icon}
      </span>
      <div className="mt-6 font-display text-[clamp(30px,3.6vw,42px)] font-black leading-none tabular-nums text-brand">
        {formatted}
        <span>{suffix}</span>
      </div>
      <div className="mt-2 text-[14.5px] font-semibold text-ink-soft">{label}</div>
      <span
        aria-hidden
        className="mt-4 block h-[3px] w-10 rounded-full"
        style={{ background: "var(--grad)" }}
      />
    </article>
  );
}

/* --------- Icons --------- */
function CapIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21V7l7-4 7 4v14M3 21h18M9 9h2m-2 4h2m-2 4h2m4-8h2m-2 4h2m-2 4h2" />
    </svg>
  );
}
function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}
