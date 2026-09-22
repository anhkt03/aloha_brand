"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/layout/PageHero";
import { VietnamMap } from "@/components/branches/VietnamMap";
import { branches, branchMapUrl, type Branch } from "@/data/branches";

export default function BranchesPage() {
  const t = useTranslations();
  const branchWord = t("pages.branches.branchWord");
  const [selected, setSelected] = useState<Branch | null>(null);
  const activeCode = selected?.code;

  return (
    <>
      <PageHero
        eyebrow={t("pages.branches.eyebrow")}
        title={t("pages.branches.title")}
        lead={t("pages.branches.lead")}
        breadcrumb={
          <>
            <Link href="/" className="hover:text-brand">
              {t("nav.home")}
            </Link>
            <span>/</span>
            <span>{t("nav.branches")}</span>
          </>
        }
      />

      <Container>
        <div className="section grid gap-8 lg:grid-cols-[minmax(320px,420px)_1fr]">
          {/* Map column */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <VietnamMap selectedCode={activeCode} />
            <p className="mt-4 text-center text-[13px] text-muted">
              Nhấn vào pin để mở Google Maps hoặc chọn cơ sở bên phải.
            </p>
          </div>

          {/* Branch list */}
          <div className="grid gap-4 sm:grid-cols-2">
            {branches.map((branch) => (
              <BranchCard
                key={branch.code}
                branch={branch}
                branchWord={branchWord}
                active={activeCode === branch.code}
                onHoverStart={() => setSelected(branch)}
                onHoverEnd={() => setSelected(null)}
              />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

interface BranchCardProps {
  branch: Branch;
  branchWord: string;
  active?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

function BranchCard({ branch, branchWord, active, onHoverStart, onHoverEnd }: BranchCardProps) {
  return (
    <article
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      className={`group flex flex-col gap-3 rounded-lg border bg-surface p-6 transition ${
        active ? "border-brand shadow-lg" : "border-line hover:-translate-y-1 hover:shadow"
      }`}
    >
      <header className="flex items-center gap-3">
        <div
          className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-[13px] font-display font-black text-white"
          style={{ background: "var(--grad)" }}
        >
          {branch.code}
        </div>
        <div>
          <div className="font-display text-lg font-extrabold">{branch.name}</div>
          <div className="text-[13px] text-muted">
            {branchWord} {branch.code} · {branch.city}
          </div>
        </div>
      </header>

      <p className="flex gap-2 text-[14px] text-ink-soft">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--teal)" strokeWidth="2" className="mt-[3px] flex-shrink-0">
          <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {branch.address}
      </p>

      {branch.phone && (
        <p className="flex items-center gap-2 text-[14px] text-ink-soft">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--brand)" strokeWidth="2" className="flex-shrink-0">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.15 1 .38 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.85.55 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="hover:text-brand">
            {branch.phone}
          </a>
        </p>
      )}

      <a
        href={branchMapUrl(branch)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-surface-2 px-4 py-2 font-display text-[13px] font-extrabold text-brand transition hover:bg-brand hover:text-white"
      >
        Chỉ đường
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </article>
  );
}
