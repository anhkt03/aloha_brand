"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button, LinkButton } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { siteConfig } from "@/config/site";

/**
 * Section 10 — closing CTA band. Dimmed photo background, opens the
 * site-wide register modal (kept identical to the rest of the site)
 * plus a direct hotline link.
 */
export function StudyAbroadCta({ onOpenRegister }: { onOpenRegister: () => void }) {
  const t = useTranslations("pages.global.cta");
  return (
    <Container>
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="relative overflow-hidden rounded-[28px] px-6 py-16 text-center text-white sm:px-10 sm:py-20">
          <Image
            src="/images/homepage/aloha.jpg"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="scale-105 object-cover blur-[2px]"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(18,35,63,.92) 0%, rgba(27,109,128,.86) 100%)" }}
          />
          <div className="relative mx-auto max-w-xl">
            <h2 className="font-display text-[clamp(24px,3.6vw,36px)] font-black">{t("title")}</h2>
            <p className="mx-auto mt-3 max-w-[48ch] text-[15px] text-white/90">{t("sub")}</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button variant="accent" onClick={onOpenRegister}>
                {t("primary")}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Button>
              <LinkButton variant="outlineW" href={siteConfig.hotlineHref}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {siteConfig.hotline}
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
