"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/common/Button";
import { Section } from "@/components/common/Section";

/**
 * Section 2 — general introduction to ALOHA, built around 3 pillars:
 * Quality · Experience · Well-rounded growth. The pillars sit on the same
 * brand-coloured left border as the quote for a single visual block.
 */
export function AboutSection() {
  const t = useTranslations("about");
  const router = useRouter();
  const pillars: Array<"quality" | "experience" | "growth"> = ["quality", "experience", "growth"];

  return (
    <Section tinted>
      <div className="grid items-center gap-11 md:grid-cols-2">
        <AboutIllustration />
        <div>
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
      </div>
    </Section>
  );
}

function AboutIllustration() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-lg">
      <Image
        src="/images/homepage/aloha.jpg"
        alt="ALOHA Language School"
        fill
        sizes="(min-width:768px) 45vw, 90vw"
        className="object-cover"
        priority={false}
      />
    </div>
  );
}
