"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button, LinkButton } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { useRegisterModal } from "@/components/layout/register-context";

type StatKey = "students" | "teachers" | "branches" | "programs";
const STAT_KEYS: StatKey[] = ["students", "teachers", "branches", "programs"];

/**
 * Training page hero — full-bleed photo with a white gradient overlay on
 * the left so the headline stays readable over any image. Swap
 * `/images/homepage/class.jpg` for a dedicated hero photo when one is
 * provided.
 */
export function TrainingHero() {
  const t = useTranslations("pages.training.hero");
  const { open } = useRegisterModal();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/homepage/class.jpg"
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
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--surface) 0%, var(--surface) 42%, color-mix(in srgb, var(--surface) 55%, transparent) 65%, transparent 88%)",
        }}
      />

      <Container className="relative z-[1]">
        <div className="max-w-xl py-[clamp(48px,9vw,104px)]">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1 className="mt-3.5 whitespace-pre-line font-display text-[clamp(28px,4.6vw,48px)] font-black leading-[1.12] tracking-tight text-ink">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-[46ch] text-[clamp(15px,1.7vw,19px)] text-ink-soft">{t("lead")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton variant="primary" href="#chuong-trinh">
              {t("ctaPrimary")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </LinkButton>
            <Button variant="ghost" onClick={open}>
              <span
                className="grid h-6 w-6 place-items-center rounded-full text-white"
                style={{ background: "var(--brand)" }}
              >
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                  <path d="M6 4l14 8-14 8z" />
                </svg>
              </span>
              {t("ctaSecondary")}
            </Button>
          </div>

          <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STAT_KEYS.map((key) => (
              <li
                key={key}
                className="flex min-h-[96px] flex-col justify-center gap-1.5 rounded-xl border border-line bg-surface/90 px-4 py-4 shadow-sm backdrop-blur"
              >
                <div className="font-display text-[clamp(17px,2.2vw,22px)] font-black leading-none tabular-nums text-brand">
                  {t(`stats.${key}.value`)}
                </div>
                <div className="text-[11.5px] font-semibold leading-snug text-ink-soft">
                  {t(`stats.${key}.label`)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
