import { getPublicBranches, getPublicFeedback, getPublicNews } from "@/lib/dal/public-data";
import { HomeContent } from "./home-content";
export const dynamic = "force-dynamic";
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; const [news, testimonials, branches] = await Promise.all([getPublicNews(locale), getPublicFeedback(), getPublicBranches()]); return <HomeContent news={news.slice(0, 9)} testimonials={testimonials} branches={branches} />; }
