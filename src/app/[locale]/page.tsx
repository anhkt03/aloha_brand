import { getPublicNews } from "@/lib/dal/public-data";
import { HomeContent } from "./home-content";

export const dynamic = "force-dynamic";

const HOME_NEWS_LIMIT = 2;

async function getLatestNews(locale: string) {
  try {
    return (await getPublicNews(locale)).slice(0, HOME_NEWS_LIMIT);
  } catch (error) {
    // The landing page must stay up even when the news query fails.
    console.error("[home] Không tải được tin tức mới nhất:", error);
    return [];
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <HomeContent news={await getLatestNews(locale)} />;
}
