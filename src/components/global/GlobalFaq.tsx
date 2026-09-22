"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/common/Container";
import { SectionHead } from "@/components/common/Section";
import { globalFaq } from "@/data/globalFaq";
import { cn } from "@/lib/utils";

/**
 * Section 6 — accordion FAQ. One item open at a time (or all closed).
 */
export function GlobalFaq() {
  const t = useTranslations("pages.global.faq");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Container>
      <div className="section">
        <SectionHead center eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
        <div className="mx-auto max-w-3xl overflow-hidden rounded-lg border border-line bg-surface">
          {globalFaq.map((item, idx) => {
            const open = openIdx === idx;
            return (
              <div key={item.q} className={cn(idx > 0 && "border-t border-line")}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : idx)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-surface-2"
                >
                  <span className="font-display text-[15px] font-extrabold text-ink">{item.q}</span>
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className={cn(
                      "flex-shrink-0 text-brand transition-transform",
                      open ? "rotate-180" : "rotate-0",
                    )}
                    aria-hidden
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-[14.5px] leading-relaxed text-ink-soft">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
