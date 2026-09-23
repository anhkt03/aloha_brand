"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";

interface ValueItem {
  letter: string;
  name: string;
  desc: string;
}

const COLORS = [
  "linear-gradient(140deg,#469142,#295326)",
  "linear-gradient(140deg,#28b4d2,#469142)",
  "linear-gradient(140deg,#e1ba23,#469142)",
  "linear-gradient(140deg,#2f6fd0,#28b4d2)",
  "linear-gradient(140deg,#3a8034,#28b4d2)",
];

/**
 * About page section 5 — 5 letter cards spelling A·L·O·H·A.
 * On md+ they lay out in a single row; on mobile they stack.
 */
export function AboutCoreValues() {
  const t = useTranslations("pages.about.values");
  const items = t.raw("items") as ValueItem[];

  return (
    <Container>
      <div className="section">
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {items.map((v, idx) => (
            <article
              key={idx}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="grid aspect-[5/3] place-items-center text-white"
                style={{ background: COLORS[idx % COLORS.length] }}
              >
                <span className="font-display text-[clamp(48px,6vw,72px)] font-black leading-none">
                  {v.letter}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="font-display text-[15px] font-black tracking-wider text-brand">
                  {v.name}
                </div>
                <p className="text-[13.5px] leading-relaxed text-ink-soft">{v.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Container>
  );
}
