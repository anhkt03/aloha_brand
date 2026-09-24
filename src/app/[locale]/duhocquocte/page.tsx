"use client";

import { useRef } from "react";
import { useRegisterModal } from "@/components/layout/register-context";
import { GlobalHero } from "@/components/global/GlobalHero";
import { CountryShowcase } from "@/components/global/CountryShowcase";
import { StudyProgramsSection } from "@/components/global/StudyProgramsSection";
import { PartnerSchoolsSection } from "@/components/global/PartnerSchoolsSection";
import { ApplicationTimeline } from "@/components/global/ApplicationTimeline";
import { ScholarshipsGrid } from "@/components/global/ScholarshipsGrid";
import { LanguageCrossSection } from "@/components/global/LanguageCrossSection";
import { GlobalStories } from "@/components/global/GlobalStories";
import { StudyAbroadKnowledge } from "@/components/global/StudyAbroadKnowledge";
import { GlobalFaq } from "@/components/global/GlobalFaq";
import { StudyAbroadCta } from "@/components/global/StudyAbroadCta";

/**
 * /duhocquocte — Study-abroad landing page. Order of sections is picked
 * so that a first-time visitor moves from inspiration → shortlisting →
 * planning → proof → answers → action.
 */
export default function GlobalPage() {
  const { open } = useRegisterModal();
  const destinationsRef = useRef<HTMLElement | null>(null);

  const scrollToDestinations = () => {
    destinationsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <GlobalHero onOpenRegister={open} onScrollToDestinations={scrollToDestinations} />
      <CountryShowcase ref={destinationsRef} />
      <StudyProgramsSection />
      <PartnerSchoolsSection />
      <ScholarshipsGrid />
      <ApplicationTimeline />
      <LanguageCrossSection />
      <GlobalStories />
      <StudyAbroadKnowledge />
      <GlobalFaq />
      <StudyAbroadCta onOpenRegister={open} />
    </>
  );
}
