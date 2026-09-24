import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getPublicNews } from "@/lib/dal/public-data";
import { formatDate } from "@/lib/utils";

type Article = Awaited<ReturnType<typeof getPublicNews>>[number];

/**
 * Split out from the page so it can sit behind a `<Suspense>` boundary —
 * this is the only part of the page that waits on the database.
 *
 * Layout follows the common news-outlet convention: the latest article
 * (rows already come `publishedAt desc` from the DAL) leads as a large
 * feature, the rest follow in a grid.
 */
export async function NewsListSection({ locale }: { locale: string }) {
  const [t, news] = await Promise.all([getTranslations("pages.news"), getPublicNews(locale)]);
  if (!news.length) {
    return <div className="card text-center">Chưa có bài viết đã xuất bản.</div>;
  }
  const [featured, ...rest] = news;
  return (
    <div className="flex flex-col gap-10">
      <FeaturedArticle article={featured} locale={locale} latestLabel={t("latest")} />
      {rest.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <article key={article.id} className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition hover:-translate-y-1 hover:shadow">
              <Link href={`/news/${article.slug}`} className="relative block aspect-[16/10] bg-surface-2">
                <Image src={article.coverImage} alt={article.title} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="text-xs font-semibold text-muted">{formatDate(new Date(article.publishedAt), locale)}</div>
                <Link href={`/news/${article.slug}`} className="font-display text-lg font-extrabold hover:text-brand">{article.title}</Link>
                <p className="line-clamp-3 text-sm text-ink-soft">{article.content}</p>
              </div>
            </article>
          ))}
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
