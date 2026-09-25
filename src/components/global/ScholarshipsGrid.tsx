"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { scholarships } from "@/data/scholarships";

/**
 * Section 5 — featured scholarships. Photo banner + level/value badges +
 * deadline so students can shortlist at a glance.
 */
export function ScholarshipsGrid() {
  const t = useTranslations("pages.global.scholarships");
  const tName = useTranslations("pages.global.destinations");
  return (
    <Container>
      <div className="section">
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {scholarships.map((s) => (
            <article
              key={s.key}
              className="group overflow-hidden rounded-xl border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="relative flex aspect-[4/3] items-start overflow-hidden p-3"
                style={{ background: s.gradient }}
              >
                <Image
                  src={s.image}
                  alt={t(`items.${s.key}.name`)}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className={`object-contain ${s.key === "koreaGks" ? "scale-[1.8]" : ""}`}
                />
                <span className="relative z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 font-display text-[12px] font-bold text-ink shadow-sm">
                  <span className="text-base leading-none">{s.countryFlag}</span>
                  {tName(`${s.countryKey}.name`)}
                </span>
              </div>
              <div className="flex flex-col gap-3 p-5">
                <div>
                  <h3 className="font-display text-[16px] font-extrabold leading-tight text-ink">
                    {t(`items.${s.key}.name`)}
                  </h3>
                  <div className="mt-0.5 text-[13px] font-semibold text-brand">{t(`items.${s.key}.school`)}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-surface-2 px-2.5 py-1 text-[12px] font-semibold text-ink-soft">
                    {t(`items.${s.key}.level`)}
                  </span>
                  <span
                    className="rounded-md px-2.5 py-1 text-[12px] font-semibold"
                    style={{ background: "color-mix(in srgb, var(--accent) 22%, transparent)", color: "#8a6d00" }}
                  >
                    {t(`badges.${s.badge}`)}
                  </span>
                </div>
                <div className="text-[12.5px] text-muted">
                  {t("deadline")}: <span className="font-semibold text-ink-soft">{s.deadline}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Container>
  );
}
