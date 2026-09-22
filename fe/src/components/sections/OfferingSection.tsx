"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";

/**
 * Section 3 — "ALOHA có gì dành cho bạn?".
 * Two large cards: Language training (4 languages) + Study abroad (5
 * destinations). Cards link to the respective dedicated pages.
 */
export function OfferingSection() {
  const t = useTranslations("offering");
  const router = useRouter();
  const training = t.raw("training.items") as string[];
  const global = t.raw("global.items") as string[];

  return (
    <Container>
      <div className="section" style={{ paddingTop: "clamp(28px,5vw,52px)" }}>
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />
        <div className="grid gap-6 md:grid-cols-2">
          <OfferCard
            tone="lang"
            title={t("training.title")}
            desc={t("training.desc")}
            items={training}
            ctaLabel={t("training.cta")}
            onCta={() => router.push("/training")}
            icon={
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            }
          />
          <OfferCard
            tone="abroad"
            title={t("global.title")}
            desc={t("global.desc")}
            items={global}
            ctaLabel={t("global.cta")}
            onCta={() => router.push("/global")}
            icon={
              <>
                <path d="M2 12a10 10 0 1 0 20 0A10 10 0 0 0 2 12z" />
                <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
              </>
            }
          />
        </div>
      </div>
    </Container>
  );
}

interface OfferCardProps {
  tone: "lang" | "abroad";
  title: string;
  desc: string;
  items: string[];
  ctaLabel: string;
  onCta: () => void;
  icon: React.ReactNode;
}

function OfferCard({ tone, title, desc, items, ctaLabel, onCta, icon }: OfferCardProps) {
  const bg =
    tone === "lang"
      ? "linear-gradient(145deg,#469142 0%,#295326 100%)"
      : "linear-gradient(145deg,#28b4d2 0%,#1b6d80 100%)";
  return (
    <article
      className="relative isolate flex flex-col gap-5 overflow-hidden rounded-lg p-9 text-white shadow transition hover:-translate-y-1.5 hover:shadow-lg"
      style={{ background: bg }}
    >
      <span className="absolute -right-16 -top-24 -z-[1] h-[230px] w-[230px] rounded-full bg-white/10" />
      <span className="absolute -bottom-20 -left-12 -z-[1] h-[150px] w-[150px] rounded-full bg-white/[.08]" />
      <div className="grid h-[66px] w-[66px] place-items-center rounded-[20px] bg-white/20">
        <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {icon}
        </svg>
      </div>
      <h3 className="font-display text-[clamp(24px,3vw,33px)] font-black">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full bg-white/[0.18] px-3.5 py-1.5 font-display text-[13px] font-semibold">
            {item}
          </span>
        ))}
      </div>
      <p className="text-[15px] text-white/90">{desc}</p>
      <button
        onClick={onCta}
        className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-white px-6 py-3 font-display text-sm font-extrabold transition hover:-translate-y-0.5"
        style={{ color: tone === "lang" ? "#235c22" : "#12566a" }}
      >
        {ctaLabel}
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </article>
  );
}
