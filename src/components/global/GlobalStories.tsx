"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { globalStories } from "@/data/globalStories";

/**
 * Section 5 — real students already studying abroad. Big photo + quote +
 * school badge for social proof specific to study-abroad prospects.
 */
export function GlobalStories() {
  const t = useTranslations("pages.global.stories");
  return (
    <section className="section" style={{ background: "var(--surface-2)" }}>
      <Container>
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {globalStories.map((story) => (
            <article
              key={story.id}
              className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-square bg-surface-2">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  sizes="(min-width:1024px) 22vw, (min-width:640px) 44vw, 100vw"
                  className="object-cover"
                />
                <span
                  className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 font-display text-[11.5px] font-bold text-ink backdrop-blur"
                  aria-label={story.country}
                >
                  <span className="text-base leading-none">{story.countryFlag}</span>
                  {story.country}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="text-[11.5px] font-semibold uppercase tracking-wide text-muted">
                  {t("yearLabel")} {story.year}
                </div>
                <div className="font-display text-[16px] font-extrabold leading-tight text-ink">
                  {story.name}
                </div>
                <div className="text-[13px] font-semibold text-brand">{story.school}</div>
                <p className="mt-1 line-clamp-4 text-[13.5px] italic text-ink-soft">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
