import { getTranslations } from "next-intl/server";
import { getPublicNews } from "@/lib/dal/public-data";
import { NewsList } from "./news-list";

/**
 * Split out from the page so it can sit behind a `<Suspense>` boundary —
 * this is the only part of the page that waits on the database. Pagination
 * itself is client-side (`NewsList`), same as `CoursesListSection` /
 * `TrainingList`.
 */
export async function NewsListSection({ locale }: { locale: string }) {
  const [t, news] = await Promise.all([getTranslations("pages.news"), getPublicNews(locale)]);
  if (!news.length) {
    return <div className="card text-center">Chưa có bài viết đã xuất bản.</div>;
  }
  return <NewsList news={news} locale={locale} latestLabel={t("latest")} />;
}
