"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { destinations } from "@/data/destinations";
import { partnerSchools } from "@/data/partnerSchools";

/**
 * Section 4 — partner-school photo grid. Fixed 3-columns-by-2-rows layout
 * on desktop (reflows to 2 then 1 column on smaller screens); each entry
 * has a real campus photo, see `src/data/partnerSchools.ts`.
 */
export function PartnerSchoolsSection() {
  const t = useTranslations("pages.global.schools");
  const tName = useTranslations("pages.global.destinations");

  return (
    <Container>
      <div className="section">
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partnerSchools.map((school) => {
            const flag = destinations.find((d) => d.key === school.countryKey)?.flag;
            return (
              <article
                key={school.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                  <Image
                    src={school.image}
                    alt={school.name}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-1 p-4 text-center">
                  <div className="text-[14px] font-bold leading-tight text-ink">{school.name}</div>
                  <div className="text-[12px] font-semibold text-muted">
                    {flag} {tName(`${school.countryKey}.name`)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
