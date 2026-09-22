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

const LANGUAGE_TABS: { key: "all" | CourseLanguage; label: string; glyph: string }[] = [
  { key: "all", label: "Tất cả", glyph: "★" },
  { key: "en", label: "Tiếng Anh", glyph: "EN" },
  { key: "zh", label: "Tiếng Trung", glyph: "中" },
  { key: "ko", label: "Tiếng Hàn", glyph: "한" },
  { key: "ja", label: "Tiếng Nhật", glyph: "日" },
];

export default function TrainingPage() {
  const t = useTranslations("nav");
  const [tab, setTab] = useState<"all" | CourseLanguage>("all");
  const { open } = useRegisterModal();
  const filtered = tab === "all" ? courses : courses.filter((c) => c.language === tab);

  return (
    <>
      <PageHero
        eyebrow="Chương trình đào tạo"
        title="Đào tạo ngoại ngữ"
        lead="Anh – Trung – Hàn – Nhật với hệ thống band/level rõ ràng. Danh sách khóa học cập nhật liên tục theo từng kỳ tuyển sinh."
        breadcrumb={
          <>
            <Link href="/" className="hover:text-brand">
              {t("home")}
            </Link>
            <span>/</span>
            <span>{t("training")}</span>
          </>
        }
      />
      <Container>
        <div className="section">
          <div className="mb-8 flex flex-wrap gap-2.5">
            {LANGUAGE_TABS.map((item) => (
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
                {item.label}
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

function CoursePreview({ course, onRegister }: { course: Course; onRegister: () => void }) {
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
          <li>Thời lượng: {course.durationMonths} tháng ({course.totalSessions} buổi)</li>
          <li>Đầu ra: {course.outcome}</li>
        </ul>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="pill brand">Tuyển sinh</span>
          <Button variant="primary" size="sm" onClick={onRegister}>
            Đăng ký
          </Button>
        </div>
      </div>
    </article>
  );
}
