"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { OfferingSection } from "@/components/sections/OfferingSection";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { BranchesTeaserSection } from "@/components/sections/BranchesTeaserSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { useRegisterModal } from "@/components/layout/register-context";
import { useRouter } from "@/i18n/routing";

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
 *  9. News               — Tin tức theo 3 chuyên mục
 * 10. CTA                — Cuối trang
 */
export default function HomePage() {
  const { open } = useRegisterModal();
  const router = useRouter();
  return (
    <>
      <HeroSection onOpenRegister={open} onGoToCourses={() => router.push("/training")} />
      <AboutSection />
      <OfferingSection />
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
