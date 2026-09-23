"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/common/Button";
import { Section, SectionHead } from "@/components/common/Section";
import { siteConfig } from "@/config/site";
import { useEnrollmentForm } from "@/hooks/useEnrollmentForm";

export function ContactSection() {
  const t = useTranslations();
  const { courses, submitted, error, pending, submit } = useEnrollmentForm();

  return (
    <Section>
      <SectionHead
        center
        eyebrow={t("nav.contact")}
        title={t("cta.title")}
        sub={t("cta.sub")}
      />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-surface p-7 shadow">
          {submitted ? (
            <SuccessPanel message={t("form.success")} />
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={submit}
            >
              <input type="hidden" name="type" value="REAL" />
              <Field id="name" label={t("form.name")} required />
              <Field id="phone" label={t("form.phone")} type="tel" required />
              <Field id="email" label={t("form.email")} type="email" />
              <label className="flex flex-col gap-2 font-display text-[13.5px] font-bold text-ink">{t("form.language")}<select name="courseId" required className="rounded-xl border-[1.5px] border-line-2 bg-surface-2 px-4 py-3"><option value="">Chọn khóa học</option>{courses.map(course => <option key={course.id} value={course.id}>{course.title}</option>)}</select></label>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-display text-[13.5px] font-bold text-ink">
                  {t("form.message")}
                </label>
                <textarea
                  id="message" name="note"
                  rows={4}
                  className="min-h-[110px] w-full resize-y rounded-xl border-[1.5px] border-line-2 bg-surface-2 p-4 text-[15px] text-ink outline-none focus:border-brand focus:bg-surface"
                />
              </div>
              {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
              <Button type="submit" variant="primary" size="block" disabled={pending}>
                {pending ? "Đang gửi..." : t("form.submit")}
              </Button>
            </form>
          )}
        </div>
        <ContactInfoPanel t={t} />
      </div>
    </Section>
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
        name={id}
        type={type}
        required={required}
        className="w-full rounded-xl border-[1.5px] border-line-2 bg-surface-2 px-4 py-3 text-[15px] text-ink outline-none transition focus:border-brand focus:bg-surface"
      />
    </div>
  );
}

function SuccessPanel({ message }: { message: string }) {
  return (
    <div className="p-6 text-center">
      <div
        className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full text-white"
        style={{ background: "var(--grad)" }}
      >
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m5 13 5 5L20 7" />
        </svg>
      </div>
      <p className="text-lg font-display font-extrabold text-ink">{message}</p>
    </div>
  );
}

function ContactInfoPanel({ t }: { t: (key: string) => string }) {
  const items = [
    { icon: "phone", label: t("nav.hotline"), value: siteConfig.hotline, href: siteConfig.hotlineHref },
    { icon: "mail", label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: "pin", label: t("nav.branches"), value: siteConfig.address },
  ];
  return (
    <div className="rounded-lg border border-line bg-surface p-7">
      {items.map((item, idx) => (
        <div
          key={item.label}
          className={`flex items-start gap-4 py-4 ${idx < items.length - 1 ? "border-b border-line" : ""}`}
        >
          <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-[14px] bg-surface-2 text-brand">
            <ContactIcon name={item.icon as "phone" | "mail" | "pin"} />
          </div>
          <div>
            <div className="text-[12.5px] font-semibold uppercase tracking-wide text-muted">{item.label}</div>
            {item.href ? (
              <a href={item.href} className="font-display text-[17px] font-extrabold text-ink hover:text-brand">
                {item.value}
              </a>
            ) : (
              <div className="font-display text-[17px] font-extrabold text-ink">{item.value}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactIcon({ name }: { name: "phone" | "mail" | "pin" }) {
  const path: Record<string, React.ReactNode> = {
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.15 1 .38 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.85.55 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
    mail: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </>
    ),
    pin: (
      <>
        <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      {path[name]}
    </svg>
  );
}
