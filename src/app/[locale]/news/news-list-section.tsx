import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getPublicNews } from "@/lib/dal/public-data";
import { formatDate } from "@/lib/utils";

/**
 * Split out from the page so it can sit behind a `<Suspense>` boundary —
 * this is the only part of the page that waits on the database.
 */
export async function NewsListSection({ locale }: { locale: string }) {
  const news = await getPublicNews(locale);
  if (!news.length) {
    return <div className="card text-center">Chưa có bài viết đã xuất bản.</div>;
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {news.map((article) => (
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
  );
}
