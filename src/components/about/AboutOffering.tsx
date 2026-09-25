"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Container } from "@/components/common/Container";

/**
 * About page section 3 — 2 flat cards (training + study abroad) with a
 * banner image on the right. Simpler than the homepage OfferingSection
 * to avoid duplication.
 */
export function AboutOffering() {
  const t = useTranslations("pages.about.offering");
  const router = useRouter();
  return (
    <Container>
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="section-head center">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-3 whitespace-pre-line font-display text-[clamp(20px,2.6vw,30px)] font-black leading-tight tracking-tight text-ink">
            {t("title")}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <OfferPanel
            tone="lang"
            title={t("training.title")}
            desc={t("training.desc")}
            cta={t("training.cta")}
            image="/images/about/offering/language.jpg"
            onCta={() => router.push("/ngoaingu")}
          />
          <OfferPanel
            tone="abroad"
            title={t("global.title")}
            desc={t("global.desc")}
            cta={t("global.cta")}
            image="/images/about/offering/study-abroad.png"
            onCta={() => router.push("/duhocquocte")}
          />
        </div>
      </div>
    </Container>
  );
}

interface OfferPanelProps {
  tone: "lang" | "abroad";
  title: string;
  desc: string;
  cta: string;
  image: string;
  onCta: () => void;
}

function OfferPanel({ tone, title, desc, cta, image, onCta }: OfferPanelProps) {
  const accent = tone === "lang" ? "var(--brand)" : "var(--teal)";
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={image}
          alt=""
          aria-hidden
          fill
          sizes="(min-width:768px) 45vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span
          aria-hidden
          className="h-1 w-12 rounded-full"
          style={{ background: accent }}
        />
        <h3 className="font-display text-[clamp(20px,2.6vw,26px)] font-black text-ink">{title}</h3>
        <p className="whitespace-pre-line text-[14.5px] leading-relaxed text-ink-soft">{desc}</p>
        <button
          onClick={onCta}
          className="mt-auto inline-flex items-center gap-2 self-start font-display text-[14px] font-extrabold transition hover:gap-3"
          style={{ color: accent }}
        >
          {cta}
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </article>
  );
}
