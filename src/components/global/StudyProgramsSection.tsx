"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { studyPrograms } from "@/data/studyPrograms";

/**
 * Section 3 — "Which program are you looking for?" 4 illustrative cards
 * (undergrad / postgrad / language / scholarship).
 */
export function StudyProgramsSection() {
  const t = useTranslations("pages.global.programs");
  return (
    <Container>
      <div className="section">
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {studyPrograms.map((program) => (
            <article
              key={program.key}
              className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/11] overflow-hidden" style={{ background: program.gradient }}>
                <Image
                  src={program.image}
                  alt={t(`items.${program.key}.title`)}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-5">
                <h3 className="font-display text-[16px] font-extrabold text-ink">
                  {t(`items.${program.key}.title`)}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-ink-soft">{t(`items.${program.key}.desc`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Container>
  );
}
