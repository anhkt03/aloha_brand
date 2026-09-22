"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/common/Button";
import { useRegisterModal } from "@/components/layout/register-context";
import { courses } from "@/data/products";
import type { Course, CourseLanguage } from "@/types/product";

type TabKey = "all" | CourseLanguage;
const TABS: { key: TabKey; glyph: string }[] = [
  { key: "all", glyph: "★" },
  { key: "en", glyph: "EN" },
  { key: "zh", glyph: "中" },
  { key: "ko", glyph: "한" },
  { key: "ja", glyph: "日" },
];

export default function TrainingPage() {
  const t = useTranslations();
  const [tab, setTab] = useState<TabKey>("all");
  const { open } = useRegisterModal();
  const filtered = tab === "all" ? courses : courses.filter((c) => c.language === tab);

  return (
    <>
      <PageHero
        eyebrow={t("pages.training.eyebrow")}
        title={t("pages.training.title")}
        lead={t("pages.training.lead")}
        breadcrumb={
          <>
            <Link href="/" className="hover:text-brand">
              {t("nav.home")}
            </Link>
            <span>/</span>
            <span>{t("nav.training")}</span>
          </>
        }
      />
      <Container>
        <div className="section">
          <div className="mb-8 flex flex-wrap gap-2.5">
            {TABS.map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`flex items-center gap-2 rounded-full border-[1.5px] px-5 py-2.5 font-display text-sm font-extrabold transition ${
                  tab === item.key
                    ? "border-transparent bg-brand-grad text-white"
                    : "border-line-2 bg-surface text-ink-soft hover:border-brand hover:text-brand"
                }`}
              >
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-extrabold ${
                    tab === item.key ? "bg-white/25 text-white" : "bg-brand-grad text-white"
                  }`}
                >
                  {item.glyph}
                </span>
                {t(`pages.training.tabs.${item.key}`)}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <CoursePreview key={course.id} course={course} onRegister={open} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

interface CoursePreviewProps {
  course: Course;
  onRegister: () => void;
}

function CoursePreview({ course, onRegister }: CoursePreviewProps) {
  const t = useTranslations("pages.training");
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition hover:-translate-y-1 hover:shadow">
      <div className="px-6 py-5 text-white" style={{ background: course.gradient }}>
        <div className="text-[13px] font-semibold opacity-90">{course.band}</div>
        <div className="mt-1 font-display text-[22px] font-black">{course.levelLabel}</div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-[17px] font-extrabold">{course.title}</h3>
        <p className="text-[14px] text-ink-soft">{course.target}</p>
        <ul className="ml-4 list-disc space-y-1 text-[13.5px] text-ink-soft">
          <li>{t("durationLine", { months: course.durationMonths, sessions: course.totalSessions })}</li>
          <li>{t("outcomeLine", { outcome: course.outcome })}</li>
        </ul>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="pill brand">{t("recruiting")}</span>
          <Button variant="primary" size="sm" onClick={onRegister}>
            {t("register")}
          </Button>
        </div>
      </div>
    </article>
  );
}
