"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";

interface EcosystemStep {
  num: string;
  title: string;
  items: string[];
}

const ACCENTS = ["var(--brand)", "var(--teal)", "var(--accent)", "var(--brand-deep)"];
const BG_IMAGES = [
  "/images/about/ecosystem/language.jpg",
  "/images/about/ecosystem/certificate.jpg",
  "/images/about/ecosystem/study-abroad.jpg",
  "/images/about/ecosystem/future.jpg",
];

/**
 * About page section 8 — 4-step ecosystem flow (language → certificate →
 * study abroad → future). All 4 cards sit on a single row from md+,
 * separated by connector chevrons; stacked with down-chevrons on mobile.
 * The first two cards (language, certificate) list their items as a 2-column
 * grid (paired by row) instead of a wrapping chip cloud. Each card has a
 * faint themed photo behind its content (kept low-opacity for readability).
 */
export function AboutEcosystem() {
  const t = useTranslations("pages.about.ecosystem");
  const steps = t.raw("steps") as EcosystemStep[];

  return (
    <Container>
      <div className="section">
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} sub={t("lead")} />

        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-stretch">
          {steps.map((step, idx) => (
            <div key={step.num} className="contents">
              <article
                className="relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-sm"
                style={{ borderTop: `4px solid ${ACCENTS[idx % ACCENTS.length]}` }}
              >
                <Image
                  src={BG_IMAGES[idx % BG_IMAGES.length]}
                  alt=""
                  fill
                  sizes="(min-width:768px) 25vw, 100vw"
                  className="object-cover opacity-30"
                />
                <div className="relative">
                  <div
                    className="font-display text-[28px] font-black leading-none"
                    style={{ color: ACCENTS[idx % ACCENTS.length] }}
                  >
                    {step.num}
                  </div>
                  <h3 className="mt-3 font-display text-[16px] font-black text-ink">{step.title}</h3>
                  <ul className={`mt-1 gap-1.5 ${idx < 2 ? "grid grid-cols-2 justify-items-start" : "flex flex-wrap"}`}>
                    {step.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-surface-2 px-2.5 py-1 text-[12px] font-semibold text-ink-soft"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
              {idx < steps.length - 1 && (
                <div className="flex items-center justify-center py-1 text-brand md:py-0">
                  <Chevron />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 rotate-90 md:h-6 md:w-6 md:rotate-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
