"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";

/**
 * About page section 7 — the ALOHA team. Text on the left, banner
 * illustration on the right.
 */
export function AboutTeam() {
  const t = useTranslations("pages.about.team");
  return (
    <Container>
      <div className="section grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="sec-title mt-3.5">{t("title")}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{t("lead")}</p>
          <Button variant="primary" className="mt-6" onClick={() => {}}>
            {t("cta")}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Button>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
          <Image
            src="/images/homepage/aloha.jpg"
            alt="ALOHA team"
            fill
            sizes="(min-width:768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </Container>
  );
}
