"use client";

import { useRegisterModal } from "@/components/layout/register-context";
import { CtaSection } from "@/components/sections/CtaSection";

/** Thin client wrapper so the (server) training page can drop in the shared CTA band. */
export function TrainingCta() {
  const { open } = useRegisterModal();
  return <CtaSection onOpenRegister={open} />;
}
