"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { destinations, type DestinationKey } from "@/data/destinations";
import { partnerSchools } from "@/data/partnerSchools";
import { cn } from "@/lib/utils";

const STOPWORDS = new Set(["the", "of", "and", "de", "la"]);

function monogram(name: string) {
  return name
    .split(" ")
    .filter((word) => word && !STOPWORDS.has(word.toLowerCase()))
    .slice(0, 4)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/**
 * Section 4 — partner-school logos, filterable by destination country.
 * Placeholder monogram tiles — swap for real logo images at
 * `public/images/partners/<id>.png` when available.
 */
export function PartnerSchoolsSection() {
  const t = useTranslations("pages.global.schools");
  const tName = useTranslations("pages.global.destinations");
  const [active, setActive] = useState<DestinationKey | null>(null);

  const visible = useMemo(
    () => (active === null ? partnerSchools : partnerSchools.filter((s) => s.countryKey === active)),
    [active],
  );

  return (
    <Container>
      <div className="section">
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <FilterChip label={t("all")} active={active === null} onClick={() => setActive(null)} />
          {destinations.map((d) => (
            <FilterChip
              key={d.key}
              label={tName(`${d.key}.name`)}
              active={active === d.key}
              onClick={() => setActive(d.key)}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((school) => (
            <article
              key={school.id}
              className="flex flex-col items-center gap-3 rounded-xl border border-line bg-surface px-4 py-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow"
            >
              <span
                className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-full font-display text-[15px] font-black text-white"
                style={{ background: "var(--grad)" }}
              >
                {monogram(school.name)}
              </span>
              <div>
                <div className="text-[13px] font-bold leading-tight text-ink">{school.name}</div>
                <div className="mt-1 text-[11.5px] font-semibold text-muted">
                  {tName(`${school.countryKey}.name`)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Container>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-4 py-2 font-display text-[13.5px] font-bold transition",
        active
          ? "text-white shadow-sm"
          : "bg-surface-2 text-ink-soft hover:bg-[color-mix(in_srgb,var(--brand)_8%,transparent)]",
      )}
      style={active ? { background: "var(--grad)" } : undefined}
    >
      {label}
    </button>
  );
}
