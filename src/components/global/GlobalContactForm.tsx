"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { destinations } from "@/data/destinations";

/**
 * Section 7 — inline consultation form (no modal). Sends to a future
 * BE endpoint under `/api/leads`.
 */
export function GlobalContactForm() {
  const t = useTranslations("pages.global.form");
  const tName = useTranslations("pages.global.destinations");
  const tForm = useTranslations("form");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Container>
      <div className="section">
        <div className="grid overflow-hidden rounded-xl shadow-lg lg:grid-cols-[.9fr_1.1fr]">
          {/* Left: brand panel */}
          <div
            className="relative flex flex-col justify-between gap-8 p-8 text-white lg:p-10"
            style={{
              background:
                "linear-gradient(135deg,#12233f 0%,#1b6d80 55%,#28b4d2 100%)",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10"
            />
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-display text-[11.5px] font-extrabold uppercase tracking-widest">
                {t("eyebrow")}
              </span>
              <h2 className="mt-4 font-display text-[clamp(22px,3vw,32px)] font-black">{t("title")}</h2>
              <p className="mt-3 text-[15px] text-white/90">{t("sub")}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="grid h-11 w-11 place-items-center rounded-full bg-white/20 text-white"
                aria-hidden
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <span className="font-display text-sm font-bold text-white/95">{t("trust")}</span>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-surface p-8 lg:p-10">
            {submitted ? (
              <div className="py-6 text-center">
                <div
                  className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full text-white"
                  style={{ background: "var(--grad)" }}
                >
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="m5 13 5 5L20 7" />
                  </svg>
                </div>
                <p className="font-display text-lg font-extrabold text-ink">{t("success")}</p>
              </div>
            ) : (
              <form
                className="flex flex-col gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="gf-name" label={tForm("name")} required />
                  <Field id="gf-phone" label={tForm("phone")} type="tel" required />
                </div>
                <Field id="gf-email" label={tForm("email")} type="email" />
                <div className="flex flex-col gap-2">
                  <label htmlFor="gf-dest" className="font-display text-[13.5px] font-bold text-ink">
                    {t("destination")}
                  </label>
                  <select
                    id="gf-dest"
                    className="w-full rounded-xl border-[1.5px] border-line-2 bg-surface-2 px-4 py-3 text-[15px] text-ink outline-none focus:border-brand focus:bg-surface"
                  >
                    {destinations.map((d) => (
                      <option key={d.key} value={d.key}>
                        {d.flag} {tName(`${d.key}.name`)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="gf-note" className="font-display text-[13.5px] font-bold text-ink">
                    {t("note")}
                  </label>
                  <textarea
                    id="gf-note"
                    rows={3}
                    className="w-full resize-y rounded-xl border-[1.5px] border-line-2 bg-surface-2 p-4 text-[15px] text-ink outline-none focus:border-brand focus:bg-surface"
                  />
                </div>
                <Button type="submit" variant="primary" size="block">
                  {t("submit")}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-display text-[13.5px] font-bold text-ink">
        {label} {required && <span className="text-[#d9534f]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        className="w-full rounded-xl border-[1.5px] border-line-2 bg-surface-2 px-4 py-3 text-[15px] text-ink outline-none transition focus:border-brand focus:bg-surface"
      />
    </div>
  );
}
