"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { studyAbroadArticles } from "@/data/studyAbroadArticles";
import { formatDate } from "@/lib/utils";

/**
 * Section 9 — "Cẩm nang du học". Static knowledge-base cards; swap for
 * BE-backed articles once a dedicated category exists.
 */
export function StudyAbroadKnowledge() {
  const t = useTranslations("pages.global.knowledge");
  const tName = useTranslations("pages.global.destinations");
  const locale = useLocale();
  return (
    <Container>
      <div className="section">
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {studyAbroadArticles.map((article) => {
            const categoryLabel =
              article.categoryKey === "scholarship" ? t("scholarshipLabel") : tName(`${article.categoryKey}.name`);
            return (
              <article
                key={article.key}
                className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition hover:-translate-y-1 hover:shadow"
              >
                <div className="relative aspect-[16/10] bg-surface-2">
                  <Image
                    src={article.image}
                    alt={t(`items.${article.key}.title`)}
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-white/95 px-2.5 py-1 font-display text-[11px] font-bold text-brand">
                    {categoryLabel}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="text-[12px] font-semibold text-muted">{formatDate(article.date, locale)}</div>
                  <h3 className="font-display text-[15px] font-extrabold leading-tight text-ink">
                    {t(`items.${article.key}.title`)}
                  </h3>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-display text-[15px] font-extrabold text-brand hover:underline"
          >
            {t("cta")}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </Container>
  );
}
