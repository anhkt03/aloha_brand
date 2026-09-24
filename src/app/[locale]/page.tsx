import { getPublicNews } from "@/lib/dal/public-data";
import { HomeContent } from "./home-content";

/**
 * Homepage — 10 sections per the site outline:
 *  1. Hero               — Định vị ALOHA
 *  2. About              — Giới thiệu chung + 3 pillars
 *  3. Offering           — Đào tạo ngoại ngữ / Du học
 *  4. Feature (why)      — 6 differentiators
 *  5. Experience         — Trải nghiệm học tập
 *  6. Journey            — Hành trình cùng ALOHA
 *  7. Testimonial        — Marquee ảnh học viên
 *  8. Branches teaser    — Hệ thống cơ sở
 *  9. News               — 3 bài viết mới nhất
 * 10. CTA                — Cuối trang
 */
export const dynamic = "force-dynamic";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const news = await getPublicNews(locale);
  return <HomeContent news={news} />;
}
