"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/common/Button";
import { Section, SectionHead } from "@/components/common/Section";

const BRANCHES = [
  "CS1 · Cầu Giấy",
  "CS2 · Hải Dương",
  "CS3 · Long Biên",
  "CS4 · Đống Đa",
  "CS5 · Bắc Ninh",
  "CS6 · Hải Phòng",
  "CS7 · Thanh Xuân",
  "CS8 · Hà Đông",
  "CS9 · Nam Định",
  "CS10 · Bắc Giang",
];

/**
 * Section 8 — nationwide branch teaser. A stylised map on the left and a
 * scrollable branch list on the right, linking to the /branches page.
 */
export function BranchesTeaserSection() {
  const t = useTranslations("branchesSection");
  const router = useRouter();
  return (
    <Section>
      <SectionHead center eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
      <div className="grid items-center gap-8 md:grid-cols-[1.1fr_.9fr]">
        <MapPanel />
        <div className="rounded-lg border border-line bg-surface p-6">
          <ul className="grid grid-cols-2 gap-3">
            {BRANCHES.map((b) => (
              <li
                key={b}
                className="flex items-center gap-2 rounded-lg bg-surface-2 px-3 py-2.5 text-[13.5px] font-semibold text-ink"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--teal)" strokeWidth="2">
                  <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
          <Button variant="primary" className="mt-6 w-full" onClick={() => router.push("/branches")}>
            {t("cta")}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Button>
        </div>
      </div>
    </Section>
  );
}

function MapPanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-brand-grad-soft p-8">
      <svg viewBox="0 0 500 500" role="img" aria-label="Vietnam branches map" className="block h-auto w-full">
        <path
          d="M280 40 Q 320 90 300 150 Q 260 200 300 260 Q 330 320 290 380 Q 250 430 220 470"
          stroke="#469142"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        {[
          { cx: 290, cy: 70, r: 10, color: "#e1ba23" },
          { cx: 305, cy: 130, r: 12, color: "#469142" },
          { cx: 285, cy: 190, r: 10, color: "#28b4d2" },
          { cx: 310, cy: 250, r: 10, color: "#469142" },
          { cx: 295, cy: 310, r: 10, color: "#28b4d2" },
          { cx: 275, cy: 370, r: 10, color: "#469142" },
          { cx: 245, cy: 420, r: 10, color: "#28b4d2" },
          { cx: 220, cy: 470, r: 12, color: "#e1ba23" },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.cx} cy={p.cy} r={p.r + 6} fill={p.color} opacity="0.25" />
            <circle cx={p.cx} cy={p.cy} r={p.r} fill={p.color} />
          </g>
        ))}
      </svg>
    </div>
  );
}
