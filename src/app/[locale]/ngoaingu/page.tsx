import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/common/Container";
import { TrainingHero } from "@/components/training/TrainingHero";
import { ProgramsSection } from "@/components/training/ProgramsSection";
import { GoalsSection } from "@/components/training/GoalsSection";
import { RoadmapSection } from "@/components/training/RoadmapSection";
import { MethodSection } from "@/components/training/MethodSection";
import { StudyFormatSection } from "@/components/training/StudyFormatSection";
import { TeachersSection } from "@/components/training/TeachersSection";
import { ResultsCarousel } from "@/components/training/ResultsCarousel";
import { StudyAbroadSection } from "@/components/training/StudyAbroadSection";
import { TrainingCta } from "@/components/training/TrainingCta";
import { BranchesTeaserSection } from "@/components/sections/BranchesTeaserSection";
import { CoursesListSection } from "./courses-list-section";
import { CoursesListSkeleton } from "./courses-list-skeleton";

export const dynamic = "force-dynamic";

/**
 * /ngoaingu — "Đào tạo ngoại ngữ". Section order:
 *  1. Hero            — full-bleed photo + stats
 *  2. Programs        — 4 language cards
 *  3. Course list     — live open-enrollment courses (server data)
 *  4. Goals           — học theo mục tiêu
 *  5. Roadmap         — 5-step lộ trình học tập
 *  6. Method          — phương pháp học tại ALOHA
 *  7. Study formats   — offline / online / lớp nhỏ / 1:1
 *  8. Teachers        — đội ngũ giảng viên
 *  9. Results         — kết quả học tập (testimonial carousel)
 * 10. Branches teaser — hệ thống cơ sở (reuse homepage section)
 * 11. Study abroad    — ngoại ngữ và du học
 * 12. CTA             — cuối trang (reuse homepage section)
 */
export default async function TrainingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <>
      <TrainingHero />
      <ProgramsSection />
      <section id="danh-sach-khoa-hoc" className="scroll-mt-24">
        <Container>
          <div className="section" style={{ paddingTop: 0 }}>
            <h2 className="sec-title text-center">{t("pages.training.coursesList.title")}</h2>
            <div className="mt-10">
              <Suspense fallback={<CoursesListSkeleton />}>
                <CoursesListSection locale={locale} emptyText={t("pages.training.coursesList.empty")} />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
      <GoalsSection />
      <RoadmapSection />
      <MethodSection />
      <StudyFormatSection />
      <TeachersSection />
      <ResultsCarousel />
      <BranchesTeaserSection />
      <StudyAbroadSection />
      <TrainingCta />
    </>
  );
}
