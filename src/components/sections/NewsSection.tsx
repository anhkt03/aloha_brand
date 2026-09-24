"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { formatDate } from "@/lib/utils";

type NewsArticle = { id: number; slug: string; title: string; content: string; coverImage: string; publishedAt: string };

/**
 * Section 9 — News. Shows the 3 most recent published articles as cards.
 */
export function NewsSection({ news }: { news: NewsArticle[] }) {
  const t = useTranslations("news");
  const locale = useLocale();
  const items = news.slice(0, 3);

  return (
    <Container>
      <div className="section">
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} />
        {items.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((article) => (
              <article key={article.id} className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition hover:-translate-y-1 hover:shadow">
                <Link href={`/news/${article.slug}`} className="block">
                  <div className="relative aspect-[16/10] bg-surface-2">
                    <Image src={article.coverImage} alt={article.title} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="text-[12.5px] font-semibold text-muted">{formatDate(new Date(article.publishedAt), locale)}</div>
                  <Link href={`/news/${article.slug}`} className="font-display text-[16px] font-extrabold leading-tight hover:text-brand">
                    {article.title}
                  </Link>
                  <p className="line-clamp-3 text-[14px] text-ink-soft">{article.content}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-muted">Chưa có bài viết.</p>
        )}
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
