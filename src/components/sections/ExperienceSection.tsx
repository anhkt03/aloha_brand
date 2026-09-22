"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";

type ExpKey = "small" | "cycle" | "practice" | "support";

const ITEMS: { key: ExpKey; gradient: string }[] = [
  { key: "small", gradient: "linear-gradient(135deg,#469142,#28b4d2)" },
  { key: "cycle", gradient: "linear-gradient(135deg,#e1ba23,#d93b3b)" },
  { key: "practice", gradient: "linear-gradient(135deg,#2f6fd0,#28b4d2)" },
  { key: "support", gradient: "linear-gradient(135deg,#295326,#469142)" },
];

/**
 * Section 5 — the day-to-day learning experience at ALOHA.
 * 2×2 grid of teaching pillars + a closing statement.
 */
export function ExperienceSection() {
  const t = useTranslations("experience");
  return (
    <Container>
      <div className="section">
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />
        <div className="grid gap-5 md:grid-cols-2">
          {ITEMS.map((item, idx) => (
            <article
              key={item.key}
              className="relative overflow-hidden rounded-lg border border-line bg-surface p-8 transition hover:-translate-y-1 hover:shadow"
            >
              <div className="flex items-start gap-4">
                <div
                  className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-[16px] font-display text-xl font-black text-white"
                  style={{ background: item.gradient }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold">{t(`items.${item.key}.title`)}</h3>
                  <p className="mt-2 text-[14.5px] text-ink-soft">{t(`items.${item.key}.desc`)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-[60ch] text-center text-[clamp(15px,1.7vw,18px)] font-medium italic text-ink-soft">
          {t("closing")}
        </p>
      </div>
    </Container>
  );
}
