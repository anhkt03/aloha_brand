"use client";

import Image from "next/image";
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
            onCta={() => router.push("/ngoaingu")}
            image="/images/homepage/home-studyboard.png"
            imageAlt="Lớp học ALOHA"
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
            onCta={() => router.push("/duhocquocte")}
            image="/images/homepage/home-language.png"
            imageAlt="Du học cùng ALOHA"
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
  image: string;
  imageAlt: string;
  icon: React.ReactNode;
}

function OfferCard({ tone, title, desc, items, ctaLabel, onCta, image, imageAlt, icon }: OfferCardProps) {
  const bg =
    tone === "lang"
      ? "linear-gradient(145deg,#469142 0%,#295326 100%)"
      : "linear-gradient(145deg,#28b4d2 0%,#1b6d80 100%)";
  return (
    <article
      className="flex flex-col overflow-hidden rounded-lg text-white shadow transition hover:-translate-y-1.5 hover:shadow-lg"
      style={{ background: bg }}
    >
      {/* Image banner — aspect-video keeps both cards the same height */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width:768px) 50vw, 100vw"
          className="object-cover transition duration-500 hover:scale-105"
          priority={false}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              tone === "lang"
                ? "linear-gradient(180deg, rgba(41,83,38,0) 55%, rgba(41,83,38,0.75) 100%)"
                : "linear-gradient(180deg, rgba(27,109,128,0) 55%, rgba(27,109,128,0.75) 100%)",
          }}
        />
        <div className="absolute left-6 top-6 grid h-[54px] w-[54px] place-items-center rounded-[16px] bg-white/25 backdrop-blur">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {icon}
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative isolate flex flex-1 flex-col gap-4 p-8">
        <span className="absolute -right-16 -top-16 -z-[1] h-[200px] w-[200px] rounded-full bg-white/10" aria-hidden />
        <h3 className="font-display text-[clamp(22px,2.8vw,30px)] font-black">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span key={item} className="rounded-full bg-white/[0.18] px-3.5 py-1.5 font-display text-[13px] font-semibold">
              {item}
            </span>
          ))}
        </div>
        <p className="whitespace-pre-line text-[15px] text-white/90">{desc}</p>
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
      </div>
    </article>
  );
}
