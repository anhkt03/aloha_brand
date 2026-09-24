"use client";

import { Fragment } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";

const STEP_KEYS = ["assess", "learn", "certificate", "profile", "go"] as const;

function stepIcon(idx: number) {
  switch (idx) {
    case 0:
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" />
        </>
      );
    case 1:
      return <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />;
    case 2:
      return <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l7.1-1.01z" />;
    case 3:
      return (
        <>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
        </>
      );
    default:
      return (
        <>
          <path d="M22 10 12 5 2 10l10 5 10-5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </>
      );
  }
}

/**
 * Section 7 — "Ngoại ngữ & Du học". Cross-promotes the language courses
 * (/ngoaingu) as a shared track with the study-abroad journey.
 */
export function LanguageCrossSection() {
  const t = useTranslations("pages.global.languageCross");
  return (
    <section className="section" style={{ background: "var(--surface-2)" }}>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <SectionHead eyebrow={t("eyebrow")} title={t("title")} sub={t("lead")} />
            <Link
              href="/ngoaingu"
              className="btn btn-primary"
            >
              {t("cta")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/studyabroad/class.jpg"
              alt="Lớp học ngoại ngữ ALOHA"
              fill
              sizes="(min-width:1024px) 42vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-start justify-center gap-x-1 gap-y-8">
          {STEP_KEYS.map((key, idx) => (
            <Fragment key={key}>
              <div className="flex w-[min(150px,30vw)] flex-col items-center text-center lg:w-auto">
                <span
                  className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl text-brand"
                  style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {stepIcon(idx)}
                  </svg>
                </span>
                <div className="mt-2.5 max-w-[14ch] text-[12.5px] font-bold leading-snug text-ink">
                  {t(`steps.${key}`)}
                </div>
              </div>
              {idx < STEP_KEYS.length - 1 && (
                <span aria-hidden className="hidden flex-shrink-0 pt-3 text-line-2 lg:block">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              )}
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}
