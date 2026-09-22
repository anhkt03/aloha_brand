"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

export function RegisterModal({ open, onClose }: RegisterModalProps) {
  const t = useTranslations();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(10,20,10,0.55)] p-5 backdrop-blur-sm",
      )}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-[520px] overflow-auto rounded-lg bg-surface p-8 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-[10px] border border-line text-ink-soft hover:text-brand"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <h3 className="mb-1 font-display text-2xl font-black">{t("nav.cta")}</h3>
        <p className="mb-5 text-[14.5px] text-ink-soft">{t("cta.sub")}</p>
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
            <p className="font-display text-lg font-extrabold text-ink">{t("form.success")}</p>
          </div>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <ModalField id="rm-name" label={t("form.name")} required />
            <ModalField id="rm-phone" label={t("form.phone")} type="tel" required />
            <ModalField id="rm-email" label={t("form.email")} type="email" />
            <div className="flex flex-col gap-2">
              <label htmlFor="rm-language" className="font-display text-[13.5px] font-bold text-ink">
                {t("form.language")}
              </label>
              <select
                id="rm-language"
                className="w-full rounded-xl border-[1.5px] border-line-2 bg-surface-2 px-4 py-3 text-[15px] text-ink outline-none focus:border-brand focus:bg-surface"
              >
                <option>English</option>
                <option>中文</option>
                <option>한국어</option>
                <option>日本語</option>
              </select>
            </div>
            <Button type="submit" variant="primary" size="block">
              {t("form.submit")}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

function ModalField({
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
