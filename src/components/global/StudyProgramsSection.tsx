"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { studyPrograms, type StudyProgramIcon } from "@/data/studyPrograms";

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
              <div
                className="flex aspect-[16/11] items-center justify-center text-white transition group-hover:scale-105"
                style={{ background: program.gradient }}
              >
                <ProgramIcon name={program.key} />
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

function ProgramIcon({ name }: { name: StudyProgramIcon }) {
  const paths: Record<StudyProgramIcon, React.ReactNode> = {
    undergrad: (
      <>
        <path d="M22 10 12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5M22 10v6" />
      </>
    ),
    postgrad: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h6" />
      </>
    ),
    language: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M7 9h10M7 13h6" />
      </>
    ),
    scholarship: (
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l7.1-1.01z" />
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width="34"
      height="34"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
