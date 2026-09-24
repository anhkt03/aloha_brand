"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { teachers } from "@/data/teachers";

/**
 * "Đội ngũ giảng viên" — real photos haven't been supplied yet, so each
 * card shows a placeholder avatar frame (initial on a brand gradient).
 * Swap in `<Image src={member.image} .../>` once photos land at
 * `public/images/teachers/<id>.jpg`.
 */
export function TeachersSection() {
  const t = useTranslations("pages.training.teachers");

  return (
    <section className="section">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[60ch]">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="sec-title mt-3.5">{t("title")}</h2>
            <p className="sec-sub">{t("desc")}</p>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 whitespace-nowrap font-display text-[14px] font-extrabold text-brand hover:underline"
          >
            {t("viewAll")}
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((member) => (
            <article key={member.id} className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <span
                className="grid aspect-square w-full max-w-[140px] place-items-center rounded-2xl font-display text-4xl font-black text-white"
                style={{ background: "var(--grad)" }}
              >
                {member.name.trim().split(/\s+/).pop()?.charAt(0).toUpperCase()}
              </span>
              <h3 className="font-display text-[15px] font-black text-ink">{member.name}</h3>
              <p className="text-[13px] font-semibold text-brand">{t(`roles.${member.roleKey}`)}</p>
              <span className="pill">{member.credential}</span>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
