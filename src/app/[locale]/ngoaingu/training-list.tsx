"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/common/Button";
import { Markdown } from "@/components/common/Markdown";
import { useRegisterModal } from "@/components/layout/register-context";
import { getCategoryFlag } from "@/lib/course-flags";
import { CourseDetailDialog } from "./course-detail-dialog";

type Course = Awaited<ReturnType<typeof import("@/lib/dal/public-data").getPublicCourses>>[number];
type Category = Awaited<ReturnType<typeof import("@/lib/dal/public-data").getPublicCourseCategories>>[number];

const PAGE_SIZE = 8;

export function TrainingList({ courses, categories }: { courses: Course[]; categories: Category[] }) {
  const t = useTranslations("pages.training.coursesList");
  const { open } = useRegisterModal();
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const visible = activeCategoryId === null ? courses : courses.filter((c) => c.categoryId === activeCategoryId);
  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const paged = useMemo(
    () => visible.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE),
    [visible, currentPage],
  );

  const selectCategory = (id: number | null) => {
    setActiveCategoryId(id);
    setPage(0);
  };

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <CategoryChip label={t("all")} active={activeCategoryId === null} onClick={() => selectCategory(null)} />
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              label={category.name}
              active={activeCategoryId === category.id}
              onClick={() => selectCategory(category.id)}
            />
          ))}
        </div>
      )}

      {paged.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {paged.map((course) => {
            const flag = getCategoryFlag(course.categoryFlagKey);
            return (
              <article key={course.id} className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition hover:-translate-y-1 hover:shadow">
                <div className={`relative flex aspect-video flex-col justify-end overflow-hidden px-6 py-5 ${flag ? "" : "bg-brand-grad text-white"}`}>
                  {flag && (
                    <>
                      <Image src={flag} alt="" aria-hidden fill sizes="400px" className="object-cover" />
                      <div aria-hidden className="absolute inset-0 bg-white/60" />
                    </>
                  )}
                  <div className="relative">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand bg-surface px-3.5 py-1.5 font-display text-[13px] font-bold text-ink shadow-sm">
                      {course.category}
                      <span className="text-ink/40">-</span>
                      {course.level}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h2 className="text-lg font-extrabold">{course.title}</h2>
                  <p className="text-sm font-semibold text-brand">{course.duration}</p>
                  <div>
                    <Markdown className="line-clamp-4">{course.content}</Markdown>
                    <button
                      type="button"
                      onClick={() => setSelectedCourse(course)}
                      className="mt-1 font-display text-[13px] font-bold text-brand hover:underline"
                    >
                      {t("viewMore")}
                    </button>
                  </div>
                  <div className="mt-auto pt-3">
                    <Button variant="primary" size="sm" onClick={open}>{t("register")}</Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="card text-center text-ink-soft">{t("empty")}</div>
      )}

      {pageCount > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <PageArrow direction="left" disabled={currentPage === 0} onClick={() => setPage((p) => Math.max(0, p - 1))} />
          {Array.from({ length: pageCount }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPage(idx)}
              aria-current={currentPage === idx ? "page" : undefined}
              className={`grid h-9 w-9 place-items-center rounded-full font-display text-[13.5px] font-bold transition ${
                currentPage === idx
                  ? "text-white shadow-sm"
                  : "bg-surface-2 text-ink-soft hover:bg-[color-mix(in_srgb,var(--brand)_8%,transparent)]"
              }`}
              style={currentPage === idx ? { background: "var(--grad)" } : undefined}
            >
              {idx + 1}
            </button>
          ))}
          <PageArrow
            direction="right"
            disabled={currentPage === pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          />
        </div>
      )}

      <CourseDetailDialog course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 font-display text-[13.5px] font-bold transition ${
        active
          ? "bg-[color-mix(in_srgb,var(--brand)_14%,transparent)] text-brand ring-1 ring-brand"
          : "bg-surface-2 text-ink-soft hover:bg-[color-mix(in_srgb,var(--brand)_8%,transparent)]"
      }`}
    >
      {label}
    </button>
  );
}

function PageArrow({ direction, disabled, onClick }: { direction: "left" | "right"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous page" : "Next page"}
      className="grid h-9 w-9 place-items-center rounded-full border-2 border-line-2 text-ink transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line-2 disabled:hover:text-ink"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {direction === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
