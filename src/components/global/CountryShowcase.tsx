"use client";

import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { destinations, type Destination } from "@/data/destinations";
import { scholarships } from "@/data/scholarships";

/**
 * Section 2 — showcase of 6 destinations. Each card packs the essentials
 * a decision needs: flag, name, cost range, language requirement, popular
 * majors and matched scholarships. Uses a gradient banner as placeholder;
 * upload real photos to `public/images/global/<key>.jpg` and set `image`
 * in `src/data/destinations.ts` — the component picks them up automatically.
 */
export function CountryShowcase() {
  const t = useTranslations("pages.global.countries");
  const tName = useTranslations("pages.global.destinations");
  const locale = useLocale();
  return (
    <Container>
      <div className="section">
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <CountryCard
              key={d.key}
              destination={d}
              name={tName(`${d.key}.name`)}
              t={t}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

interface CountryCardProps {
  destination: Destination;
  name: string;
  t: (key: string) => string;
  locale: string;
}

function CountryCard({ destination, name, t, locale }: CountryCardProps) {
  const [low, high] = destination.tuitionRangeVnd;
  const scholars = scholarships.filter((s) => destination.scholarshipKeys.includes(s.key));
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Banner */}
      <div
        className="relative flex aspect-[16/9] items-end overflow-hidden p-5 text-white"
        style={{ background: destination.gradient }}
      >
        {destination.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={destination.image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition group-hover:scale-105"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 100%)" }}
        />
        <div className="relative">
          <div className="text-4xl">{destination.flag}</div>
          <div className="mt-1 font-display text-xl font-black">{name}</div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <InfoRow icon={<CurrencyIcon />} label={t("labels.tuition")}>
          {formatVnd(low, locale)} – {formatVnd(high, locale)}
          <span className="text-muted"> {t("yearUnit")}</span>
        </InfoRow>
        <InfoRow icon={<LangIcon />} label={t("labels.language")}>
          {destination.language}
        </InfoRow>
        <InfoRow icon={<MajorIcon />} label={t("labels.majors")}>
          <span className="text-ink-soft">{destination.popularMajors.join(" · ")}</span>
        </InfoRow>
        {scholars.length > 0 && (
          <InfoRow icon={<GiftIcon />} label={t("labels.scholarship")}>
            <span className="flex flex-wrap gap-1.5">
              {scholars.map((s) => (
                <span
                  key={s.key}
                  className="rounded-md bg-surface-2 px-2 py-0.5 text-[12px] font-semibold text-ink-soft"
                >
                  {s.name.split(" — ")[0]}
                </span>
              ))}
            </span>
          </InfoRow>
        )}
      </div>
    </article>
  );
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-surface-2 text-brand">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[11.5px] font-semibold uppercase tracking-wide text-muted">{label}</div>
        <div className="mt-0.5 text-[14px] font-semibold text-ink">{children}</div>
      </div>
    </div>
  );
}

function formatVnd(v: number, locale: string) {
  if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toLocaleString(locale, { maximumFractionDigits: 1 })} tỷ`;
  return `${(v / 1_000_000).toLocaleString(locale, { maximumFractionDigits: 0 })} tr`;
}

/* --------- Icons --------- */
function CurrencyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" />
    </svg>
  );
}
function LangIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 5h12M9 3v2m0 0c0 5-2 8-6 10M6 8c0 3 3 5 6 7M14 21l4-9 4 9M15 18h6" />
    </svg>
  );
}
function MajorIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 10 12 5 2 10l10 5 10-5zM6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 1 1 0-5c3 0 4.5 5 4.5 5zM12 7h4.5a2.5 2.5 0 1 0 0-5c-3 0-4.5 5-4.5 5z" />
    </svg>
  );
}
