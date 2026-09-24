"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/utils";
import type { getPublicNews } from "@/lib/dal/public-data";

type Article = Awaited<ReturnType<typeof getPublicNews>>[number];

const PAGE_SIZE = 5;

/**
 * Client-side pagination over the already-fetched (newest-first) article
 * list — same pattern as `TrainingList`. Page 1 always leads with the
 * single newest article as a feature; every page (including later ones)
 * caps at `PAGE_SIZE` articles total.
 */
export function NewsList({ news, locale, latestLabel }: { news: Article[]; locale: string; latestLabel: string }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(news.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const paged = useMemo(
    () => news.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE),
    [news, currentPage],
  );
  const featured = currentPage === 0 ? paged[0] : null;
  const grid = currentPage === 0 ? paged.slice(1) : paged;

  return (
    <div>
      <div className="flex flex-col gap-10">
        {featured && <FeaturedArticle article={featured} locale={locale} latestLabel={latestLabel} />}
        {grid.length > 0 && (
          <div className="flex flex-col gap-4">
            {grid.map((article) => (
              <article
                key={article.id}
                className="flex gap-4 rounded-lg border border-line bg-surface p-3 transition hover:-translate-y-0.5 hover:shadow sm:gap-5 sm:p-4"
              >
                <Link
                  href={`/news/${article.slug}`}
                  className="relative block aspect-[4/3] w-28 flex-shrink-0 overflow-hidden rounded-md bg-surface-2 sm:w-44 md:w-52"
                >
                  <Image src={article.coverImage} alt={article.title} fill sizes="(min-width:768px) 208px, 112px" className="object-cover" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 sm:gap-2">
                  <div className="text-xs font-semibold text-muted">{formatDate(new Date(article.publishedAt), locale)}</div>
                  <Link href={`/news/${article.slug}`} className="font-display text-[15px] font-extrabold leading-snug hover:text-brand sm:text-lg">
                    {article.title}
                  </Link>
                  <p className="line-clamp-2 text-sm text-ink-soft">{article.content}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {pageCount > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <PageArrow direction="left" disabled={currentPage === 0} onClick={() => setPage((p) => Math.max(0, p - 1))} />
          {Array.from({ length: pageCount }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPage(idx)}
              aria-current={currentPage === idx ? "page" : undefined}
              className={`grid h-9 w-9 place-items-center rounded-full font-display text-[13.5px] font-bold transition ${
                currentPage === idx
                  ? "text-white shadow-sm"
                  : "bg-surface-2 text-ink-soft hover:bg-[color-mix(in_srgb,var(--brand)_8%,transparent)]"
              }`}
              style={currentPage === idx ? { background: "var(--grad)" } : undefined}
            >
              {idx + 1}
            </button>
          ))}
          <PageArrow
            direction="right"
            disabled={currentPage === pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          />
        </div>
      )}
    </div>
  );
}

function FeaturedArticle({ article, locale, latestLabel }: { article: Article; locale: string; latestLabel: string }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-line bg-surface shadow-sm transition hover:shadow-lg">
      <Link href={`/news/${article.slug}`} className="grid md:grid-cols-2 md:items-stretch">
        <div className="relative aspect-[16/10] md:aspect-auto">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="(min-width:768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            priority
          />
        </div>
        <div className="flex flex-col justify-center gap-3 p-6 md:p-9">
          <span
            className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wide text-brand"
            style={{ background: "color-mix(in srgb, var(--brand) 14%, transparent)" }}
          >
            {latestLabel}
          </span>
          <h2 className="font-display text-[clamp(20px,2.6vw,28px)] font-black leading-snug text-ink group-hover:text-brand">
            {article.title}
          </h2>
          <div className="text-xs font-semibold text-muted">{formatDate(new Date(article.publishedAt), locale)}</div>
          <p className="line-clamp-3 text-[14.5px] leading-relaxed text-ink-soft md:line-clamp-4">{article.content}</p>
        </div>
      </Link>
    </article>
  );
}

function PageArrow({ direction, disabled, onClick }: { direction: "left" | "right"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous page" : "Next page"}
      className="grid h-9 w-9 place-items-center rounded-full border-2 border-line-2 text-ink transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line-2 disabled:hover:text-ink"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {direction === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
