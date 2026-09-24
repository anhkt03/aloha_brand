"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { testimonials } from "@/data/testimonials";

/**
 * "Kết quả học tập" — the same testimonial score-cards used on the
 * homepage marquee, presented as a swipeable carousel here instead.
 */
export function ResultsCarousel() {
  const t = useTranslations("pages.training.results");
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
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              data-card
              className="relative aspect-square w-[min(300px,72vw)] flex-shrink-0 snap-start overflow-hidden rounded-lg bg-surface-2 shadow-sm"
            >
              <Image src={item.image} alt={item.name} fill sizes="300px" className="object-cover" />
            </div>
          ))}
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
