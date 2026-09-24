"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";

type FormatKey = "offline" | "online" | "smallGroup" | "oneOnOne";
const FORMATS: FormatKey[] = ["offline", "online", "smallGroup", "oneOnOne"];

/**
 * "Hình thức học" — 2x2 grid of formats next to a classroom photo.
 */
export function StudyFormatSection() {
  const t = useTranslations("pages.training.formats");

  return (
    <section className="section">
      <Container>
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="grid gap-5 sm:grid-cols-2">
            {FORMATS.map((key, idx) => (
              <article key={key} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:flex-col sm:items-stretch">
                <span
                  className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl text-brand"
                  style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
                >
                  <FormatIcon index={idx} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[16px] font-black text-ink">{t(`items.${key}.title`)}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{t(`items.${key}.desc`)}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/homepage/aloha.jpg"
              alt="Lớp học ALOHA"
              fill
              sizes="(min-width:1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function FormatIcon({ index }: { index: number }) {
  const paths: React.ReactNode[] = [
    // offline — building
    <>
      <path d="M3 21V7l7-4 7 4v14M3 21h18M9 9h2m-2 4h2m-2 4h2m4-8h2m-2 4h2m-2 4h2" />
    </>,
    // online — laptop / screen
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8" />
    </>,
    // small group
    <>
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <path d="M2 20c0-3 2.5-5 6-5s6 2 6 5M14 15.2c3 .3 5 2.2 5 4.8" />
    </>,
    // 1:1
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M18 4v6M15 7h6" />
    </>,
  ];
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[index]}
    </svg>
  );
}
