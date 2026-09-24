"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Markdown } from "@/components/common/Markdown";
import { useRegisterModal } from "@/components/layout/register-context";
import { getCategoryFlag } from "@/lib/course-flags";

type Course = Awaited<ReturnType<typeof import("@/lib/dal/public-data").getPublicCourses>>[number];

export function CourseDetailDialog({ course, onClose }: { course: Course | null; onClose: () => void }) {
  const { open } = useRegisterModal();

  useEffect(() => {
    document.body.style.overflow = course ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [course]);

  useEffect(() => {
    if (!course) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [course, onClose]);

  if (!course) return null;
  const flag = getCategoryFlag(course.category);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(10,20,10,0.55)] p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="scrollbar-hide relative max-h-[85vh] w-full max-w-[560px] overflow-auto rounded-lg bg-surface shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-[10px] border border-line bg-surface/90 text-ink-soft backdrop-blur hover:text-brand"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className={`relative overflow-hidden px-8 py-6 ${flag ? "" : "bg-brand-grad text-white"}`}>
          {flag && (
            <>
              <Image src={flag} alt="" aria-hidden fill sizes="560px" className="object-cover" />
              <div aria-hidden className="absolute inset-0 bg-white/60" />
            </>
          )}
          <div className={`relative ${flag ? "text-ink" : ""}`}>
            <div className={`text-sm ${flag ? "text-ink/70" : "opacity-90"}`}>{course.category}</div>
            <div className="mt-1 font-display text-2xl font-black">{course.level}</div>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-8">
          <h2 className="font-display text-xl font-extrabold text-ink">{course.title}</h2>
          <p className="text-sm font-semibold text-brand">{course.duration}</p>
          <Markdown>{course.content}</Markdown>
          <Button variant="primary" className="mt-2 self-start" onClick={open}>
            Đăng ký
          </Button>
        </div>
      </div>
    </div>
  );
}
