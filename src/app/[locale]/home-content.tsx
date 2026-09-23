"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";
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

type News = { id: number; slug: string; title: string; excerpt: string; coverImage: string; category: string; publishedAt: string };

export function HomeContent({ news }: { news: News[] }) {
  const { open } = useRegisterModal();
  const router = useRouter();
  return (
    <>
      <HeroSection onOpenRegister={open} onGoToCourses={() => router.push("/ngoaingu")} />
      <AboutSection />
      <StatsSection />
      <OfferingSection />
      <FeatureSection />
      <ExperienceSection />
      <JourneySection />
      <TestimonialSection />
      <BranchesTeaserSection />
      <NewsSection news={news} />
      <CtaSection onOpenRegister={open} />
    </>
  );
}
