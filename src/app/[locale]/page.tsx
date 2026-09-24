"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { OfferingSection } from "@/components/sections/OfferingSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { BranchesTeaserSection } from "@/components/sections/BranchesTeaserSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { useRegisterModal } from "@/components/layout/register-context";
import { useRouter } from "next/navigation";

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
      <NewsSection news={[]} />
      <CtaSection onOpenRegister={open} />
    </>
  );
}
