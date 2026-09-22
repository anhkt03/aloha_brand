"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { news } from "@/data/news";
import { formatDate } from "@/lib/utils";
import type { NewsArticle } from "@/types/product";

type CategoryKey = "language" | "abroad" | "activity";

/** Map news article category (VN text) → i18n key. */
const CATEGORY_MAP: Record<string, CategoryKey> = {
  "Tuyển sinh": "language",
  "Học viên": "language",
  "Sự kiện": "activity",
  "Cộng đồng": "activity",
};

const CATEGORY_GRADIENTS: Record<CategoryKey, string> = {
  language: "linear-gradient(135deg,#469142,#28b4d2)",
  abroad: "linear-gradient(135deg,#2f6fd0,#28b4d2)",
  activity: "linear-gradient(135deg,#e1ba23,#469142)",
};

/**
 * Section 9 — News, grouped into 3 category columns.
 * Each column shows the latest article for its category (or the top-N of
 * that category) with title, cover and date.
 */
export function NewsSection() {
  const t = useTranslations("news");
  const locale = useLocale();
  const grouped = groupByCategory(news);
  const columns: CategoryKey[] = ["language", "abroad", "activity"];

  return (
    <Container>
      <div className="section">
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />
        <div className="grid gap-6 md:grid-cols-3">
          {columns.map((key) => (
            <CategoryColumn
              key={key}
              categoryKey={key}
              title={t(`categories.${key}.title`)}
              desc={t(`categories.${key}.desc`)}
              articles={grouped[key] ?? []}
              locale={locale}
            />
          ))}
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

interface CategoryColumnProps {
  categoryKey: CategoryKey;
  title: string;
  desc: string;
  articles: NewsArticle[];
  locale: string;
}

function CategoryColumn({ categoryKey, title, desc, articles, locale }: CategoryColumnProps) {
  const featured = articles[0] ?? news[0];
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition hover:-translate-y-1 hover:shadow">
      <div className="px-6 py-5 text-white" style={{ background: CATEGORY_GRADIENTS[categoryKey] }}>
        <h3 className="font-display text-lg font-black">{title}</h3>
        <p className="mt-1 text-[13px] text-white/90">{desc}</p>
      </div>
      <Link href={`/news/${featured.slug}`} className="block">
        <div className="relative aspect-[16/10] bg-surface-2">
          <Image
            src={featured.coverImage}
            alt={featured.title}
            fill
            sizes="(min-width:1024px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="text-[12.5px] font-semibold text-muted">
          {formatDate(featured.publishedAt, locale)}
        </div>
        <Link href={`/news/${featured.slug}`} className="font-display text-[16px] font-extrabold leading-tight hover:text-brand">
          {featured.title}
        </Link>
        <p className="line-clamp-3 text-[14px] text-ink-soft">{featured.excerpt}</p>
      </div>
    </article>
  );
}

function groupByCategory(items: NewsArticle[]): Record<CategoryKey, NewsArticle[]> {
  const out: Record<CategoryKey, NewsArticle[]> = { language: [], abroad: [], activity: [] };
  for (const article of items) {
    const key = CATEGORY_MAP[article.category] ?? "language";
    out[key].push(article);
  }
  return out;
}
