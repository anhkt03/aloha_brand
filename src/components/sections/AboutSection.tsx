"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";

/**
 * Section 2 — general introduction to ALOHA, built around 3 pillars:
 * Quality · Experience · Well-rounded growth. The pillars sit on the same
 * brand-coloured left border as the quote for a single visual block.
 *
 * The section photo is a full-bleed background rather than a boxed
 * illustration. On mobile the text spans nearly the full width, so it sits
 * on a flat scrim; from md the scrim becomes a left-to-right fade so more
 * of the photo shows through on the right, matching `TrainingHero`.
 */
export function AboutSection() {
  const t = useTranslations("about");
  const router = useRouter();
  const pillars: Array<"quality" | "experience" | "growth"> = ["quality", "experience", "growth"];

  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/homepage/home-about-us.jpeg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 md:hidden"
        style={{ background: "color-mix(in srgb, var(--surface-2) 92%, transparent)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(270deg, var(--surface-2) 0%, var(--surface-2) 42%, color-mix(in srgb, var(--surface-2) 55%, transparent) 65%, transparent 88%)",
        }}
      />
      <Container className="relative z-[1]">
        <div className="ml-auto max-w-xl">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="sec-title mt-3.5">{t("title")}</h2>
          {/* Quote + 3 pillars share a single brand border on the left. */}
          <div className="mt-6 border-l-4 border-brand pl-5">
            <blockquote className="text-[clamp(15px,1.7vw,18px)] text-ink-soft">
              {t("quote")}
            </blockquote>
            <div className="mt-4 flex flex-wrap gap-2">
              {pillars.map((key) => (
                <span key={key} className="pill brand">
                  {t(`pillars.${key}`)}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-6 text-[15px] text-ink-soft">
            {t.rich("body", {
              b: (chunks) => <strong className="font-semibold text-ink">{chunks}</strong>,
            })}
          </p>
          <Button variant="primary" className="mt-6" onClick={() => router.push("/about")}>
            {t("cta")}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Button>
        </div>
      </Container>
    </section>
  );
}
