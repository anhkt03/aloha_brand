"use client";

import { forwardRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { destinations, type Destination } from "@/data/destinations";

/**
 * Section 2 — showcase of the 5 destinations. Photo band with flag + name,
 * 3 highlight bullets and an explore affordance underneath.
 */
export const CountryShowcase = forwardRef<HTMLElement>(function CountryShowcase(_, ref) {
  const t = useTranslations("pages.global.countries");
  const tName = useTranslations("pages.global.destinations");
  return (
    <section ref={ref} className="section">
      <Container>
        <SectionHead eyebrow={t("eyebrow")} title={t("title")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {destinations.map((d) => (
            <CountryCard
              key={d.key}
              destination={d}
              name={tName(`${d.key}.name`)}
              highlights={tName.raw(`${d.key}.highlights`) as string[]}
            />
          ))}
        </div>
      </Container>
    </section>
  );
});

interface CountryCardProps {
  destination: Destination;
  name: string;
  highlights: string[];
}

function CountryCard({ destination, name, highlights }: CountryCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: destination.gradient }}>
        {destination.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={destination.image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition group-hover:scale-105"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)" }}
        />
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 text-white">
          <span className="text-2xl leading-none">{destination.flag}</span>
          <span className="font-display text-[16px] font-black leading-tight">{name}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <ul className="flex-1 space-y-1.5">
          {highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-[12.5px] leading-snug text-ink-soft">
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-[3px] flex-shrink-0 text-brand"
                aria-hidden
              >
                <path d="m5 13 5 5L20 7" />
              </svg>
              {h}
            </li>
          ))}
        </ul>
        <div className="flex justify-end">
          <span
            className="grid h-8 w-8 place-items-center rounded-full text-brand transition group-hover:text-white"
            style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
          >
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition group-hover:translate-x-0.5"
              aria-hidden
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
