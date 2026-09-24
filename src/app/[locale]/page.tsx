import { getPublicNews } from "@/lib/dal/public-data";
import { HomeContent } from "./home-content";

/**
 * Homepage — 11 sections per the site outline:
 *  1. Hero               — Định vị ALOHA
 *  2. About              — Giới thiệu chung + 3 pillars
 *  3. Offering           — Đào tạo ngoại ngữ / Du học
 *  4. Stats              — Số liệu biết nói
 *  5. Feature (why)      — 6 differentiators
 *  6. Experience         — Trải nghiệm học tập
 *  7. Journey            — Hành trình cùng ALOHA
 *  8. Testimonial        — Marquee ảnh học viên
 *  9. Branches teaser    — Hệ thống cơ sở
 * 10. News               — Tin tức theo 3 chuyên mục
 * 11. CTA                — Cuối trang
 */
export default function HomePage() {
  const { open } = useRegisterModal();
  const router = useRouter();
  return (
    <>
      <HeroSection onOpenRegister={open} onGoToCourses={() => router.push("/ngoaingu")} />
      <AboutSection />
      <OfferingSection />
      <StatsSection />
      <FeatureSection />
      <ExperienceSection />
      <JourneySection />
      <TestimonialSection />
      <BranchesTeaserSection />
      <NewsSection />
      <CtaSection onOpenRegister={open} />
    </>
  );
}
