"use client";

import { useRegisterModal } from "@/components/layout/register-context";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutWhat } from "@/components/about/AboutWhat";
import { AboutOffering } from "@/components/about/AboutOffering";
import { AboutVisionMission } from "@/components/about/AboutVisionMission";
import { AboutCoreValues } from "@/components/about/AboutCoreValues";
import { AboutPrinciples } from "@/components/about/AboutPrinciples";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutEcosystem } from "@/components/about/AboutEcosystem";
import { StatsSection } from "@/components/sections/StatsSection";
import { BranchesTeaserSection } from "@/components/sections/BranchesTeaserSection";
import { CtaSection } from "@/components/sections/CtaSection";

/**
 * /about — "Về ALOHA".
 * Section order (per the design outline):
 *  1. Hero              — Định vị ALOHA
 *  2. AboutWhat         — ALOHA là ai?
 *  3. AboutOffering     — 2 lĩnh vực (Ngoại ngữ + Du học)
 *  4. AboutVisionMission — Tầm nhìn + Sứ mệnh
 *  5. AboutCoreValues   — 5 giá trị A·L·O·H·A
 *  6. AboutPrinciples   — Triết lý đào tạo + 3 nguyên tắc
 *  7. AboutTeam         — Đội ngũ
 *  8. AboutEcosystem    — Từ ngoại ngữ đến cơ hội quốc tế
 *  9. StatsSection      — Số liệu biết nói (reuse homepage)
 * 10. BranchesTeaser    — Hệ thống cơ sở
 * 11. CtaSection        — Cuối trang
 */
export default function AboutPage() {
  const { open } = useRegisterModal();
  return (
    <>
      <AboutHero onOpenRegister={open} />
      <AboutWhat />
      <AboutOffering />
      <AboutVisionMission />
      <AboutCoreValues />
      <AboutPrinciples />
      <AboutTeam />
      <AboutEcosystem />
      <StatsSection />
      <BranchesTeaserSection />
      <CtaSection onOpenRegister={open} />
    </>
  );
}
