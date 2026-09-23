"use client";

import { useRef } from "react";
import { useRegisterModal } from "@/components/layout/register-context";
import { GlobalHero } from "@/components/global/GlobalHero";
import { CountryShowcase } from "@/components/global/CountryShowcase";
import { ApplicationTimeline } from "@/components/global/ApplicationTimeline";
import { ScholarshipsGrid } from "@/components/global/ScholarshipsGrid";
import { GlobalStories } from "@/components/global/GlobalStories";
import { GlobalFaq } from "@/components/global/GlobalFaq";
import { GlobalContactForm } from "@/components/global/GlobalContactForm";

/**
 * /duhocquocte — Study-abroad landing page. Order of sections is picked
 * so that a first-time visitor moves from inspiration → shortlisting →
 * planning → proof → answers → action.
 */
export default function GlobalPage() {
  const { open } = useRegisterModal();
  const timelineRef = useRef<HTMLElement | null>(null);

  const scrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <GlobalHero onOpenRegister={open} onScrollToTimeline={scrollToTimeline} />
      <CountryShowcase />
      <ApplicationTimeline ref={timelineRef} />
      <ScholarshipsGrid />
      <GlobalStories />
      <GlobalFaq />
      <GlobalContactForm />
    </>
  );
}
