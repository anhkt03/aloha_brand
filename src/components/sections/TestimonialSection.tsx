"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { testimonials } from "@/data/testimonials";

/**
 * Section 7 — testimonial marquee. Two rows moving in opposite directions
 * for a lively, non-cliché feel. Track is duplicated so the CSS animation
 * loops seamlessly.
 */
export function TestimonialSection() {
  const t = useTranslations("testimonials");
  const rowA = [...testimonials, ...testimonials];
  const rowB = [...testimonials.slice().reverse(), ...testimonials.slice().reverse()];

  return (
    <section className="section">
      <Container>
        <SectionHead
          center
          eyebrow={t("eyebrow")}
          title={t.rich("title", {
            b: (chunks) => <span className="text-brand">{chunks}</span>,
          })}
        />
      </Container>
      <div className="flex flex-col gap-5">
        <MarqueeRow items={rowA} direction="left" duration={44} />
        <MarqueeRow items={rowB} direction="right" duration={54} />
      </div>
      <Container>
        <div className="mt-10 text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-display text-[15px] font-extrabold text-brand hover:underline"
          >
            {t("viewMore")}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}

interface MarqueeRowProps {
  items: typeof testimonials;
  direction: "left" | "right";
  duration: number;
}

function MarqueeRow({ items, direction, duration }: MarqueeRowProps) {
  return (
    <div
      className="marquee"
      style={{
        // scoped animation per row so left/right can co-exist
        // duration + direction are read via CSS var in the track below.
        ["--marq-duration" as string]: `${duration}s`,
        ["--marq-direction" as string]: direction === "left" ? "normal" : "reverse",
      }}
    >
      <div
        className="marquee-track"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === "left" ? "normal" : "reverse",
        }}
      >
        {items.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="relative aspect-square w-[min(320px,72vw)] flex-shrink-0 overflow-hidden rounded-lg bg-surface shadow-sm"
          >
            <Image src={item.image} alt={item.name} fill sizes="320px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
