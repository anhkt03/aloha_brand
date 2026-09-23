"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/common/Button";
import { Section, SectionHead } from "@/components/common/Section";
import { VietnamMap } from "@/components/branches/VietnamMap";
import { branches, type Branch } from "@/data/branches";

/**
 * Section 8 — nationwide branch teaser. Reuses the interactive Vietnam
 * map from `/branches` on the left, compact branch chips (code +
 * province) on the right, and a CTA to the full branch page.
 */
export function BranchesTeaserSection() {
  const t = useTranslations("branchesSection");
  const router = useRouter();
  const [selected, setSelected] = useState<Branch | null>(null);
  const activeCode = selected?.code;

  return (
    <Section>
      <SectionHead center eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
      <div className="grid justify-center gap-8 md:grid-cols-[minmax(260px,360px)_minmax(240px,320px)] md:items-stretch">
        <div>
          <VietnamMap selectedCode={activeCode} />
        </div>
        <div className="flex flex-col rounded-lg border border-line bg-surface p-5">
          <ul className="flex flex-1 flex-col gap-1.5">
            {branches.map((branch) => {
              const active = activeCode === branch.code;
              return (
                <li key={branch.code} className="flex-1">
                  <button
                    type="button"
                    onMouseEnter={() => setSelected(branch)}
                    onMouseLeave={() => setSelected(null)}
                    onFocus={() => setSelected(branch)}
                    onBlur={() => setSelected(null)}
                    className={`flex h-full w-full items-center gap-2.5 rounded-md px-3 py-2 text-left transition ${
                      active
                        ? "bg-[color-mix(in_srgb,var(--brand)_14%,transparent)] ring-1 ring-brand"
                        : "bg-surface-2 hover:bg-[color-mix(in_srgb,var(--brand)_8%,transparent)]"
                    }`}
                  >
                    <span
                      className="grid h-7 w-10 flex-shrink-0 place-items-center rounded font-display text-[11px] font-black text-white"
                      style={{ background: "var(--grad)" }}
                    >
                      {branch.code}
                    </span>
                    <span className="min-w-0 flex-1 font-display text-[13.5px] font-extrabold text-ink">
                      {branch.city}
                    </span>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </button>
                </li>
              );
            })}
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
