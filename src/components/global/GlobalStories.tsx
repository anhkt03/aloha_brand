"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { destinations } from "@/data/destinations";
import { globalStories } from "@/data/globalStories";

const GRADIENT_BY_KEY = Object.fromEntries(destinations.map((d) => [d.key, d.gradient]));

/**
 * Section 8 — real students already studying abroad. Swipeable row of
 * gradient-avatar cards with the quote overlaid and name/school below.
 */
export function GlobalStories() {
  const t = useTranslations("pages.global.stories");
  const tName = useTranslations("pages.global.destinations");
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-card]") as HTMLElement | null;
    const step = (card?.offsetWidth ?? 280) + 18;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="section">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow={t("eyebrow")} title={t("title")} />
          <div className="mb-11 flex gap-2">
            <CarouselButton direction="left" onClick={() => scrollByCard(-1)} />
            <CarouselButton direction="right" onClick={() => scrollByCard(1)} />
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {globalStories.map((story) => {
            const countryName = tName(`${story.countryKey}.name`);
            return (
              <article
                key={story.key}
                data-card
                className="flex w-[min(270px,78vw)] flex-shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="relative flex aspect-[3/4] items-center justify-center"
                  style={{ background: GRADIENT_BY_KEY[story.countryKey] }}
                >
                  <span className="font-display text-[56px] font-black leading-none text-white/25">
                    {story.name
                      .split(" ")
                      .pop()
                      ?.charAt(0)}
                  </span>
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 42%, rgba(0,0,0,0.78) 100%)" }}
                  />
                  <span
                    className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 font-display text-[11.5px] font-bold text-ink backdrop-blur"
                    aria-label={countryName}
                  >
                    <span className="text-base leading-none">{story.countryFlag}</span>
                    {countryName}
                  </span>
                  <p className="absolute inset-x-3 bottom-3 line-clamp-4 text-[12.5px] italic leading-snug text-white">
                    &ldquo;{t(`items.${story.key}.quote`)}&rdquo;
                  </p>
                </div>
                <div className="flex flex-col gap-0.5 p-4">
                  <div className="font-display text-[14.5px] font-extrabold leading-tight text-ink">
                    {story.name}
                  </div>
                  <div className="text-[12.5px] font-semibold text-brand">{t(`items.${story.key}.school`)}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
                    {t("yearLabel")} {story.year}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function CarouselButton({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Previous" : "Next"}
      className="grid h-10 w-10 place-items-center rounded-full border-2 border-line-2 text-ink transition hover:border-brand hover:text-brand"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {direction === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
