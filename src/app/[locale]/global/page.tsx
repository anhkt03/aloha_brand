"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/common/Button";
import { useRegisterModal } from "@/components/layout/register-context";

const FLAGS: Record<string, string> = { china: "🇨🇳", korea: "🇰🇷", japan: "🇯🇵", uk: "🇬🇧" };
type DestKey = keyof typeof FLAGS;
type Step = { title: string; desc: string };

export default function GlobalPage() {
  const t = useTranslations();
  const { open } = useRegisterModal();
  const destKeys: DestKey[] = ["china", "korea", "japan", "uk"];
  const steps = t.raw("pages.global.steps") as Step[];

  return (
    <>
      <PageHero
        eyebrow={t("pages.global.eyebrow")}
        title={t("pages.global.title")}
        lead={t("pages.global.lead")}
        breadcrumb={
          <>
            <Link href="/" className="hover:text-brand">
              {t("nav.home")}
            </Link>
            <span>/</span>
            <span>{t("nav.global")}</span>
          </>
        }
      />

      <Container>
        <div className="section">
          <h2 className="sec-title text-center">{t("pages.global.destinationsTitle")}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destKeys.map((key) => (
              <article key={key} className="card hover">
                <div className="text-4xl">{FLAGS[key]}</div>
                <h3 className="mt-3 text-lg font-extrabold">{t(`pages.global.destinations.${key}.name`)}</h3>
                <p className="mt-2 text-[14px] text-ink-soft">{t(`pages.global.destinations.${key}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>

      <div style={{ background: "var(--surface-2)" }}>
        <Container>
          <div className="section">
            <h2 className="sec-title text-center">{t("pages.global.journeyTitle")}</h2>
            <p className="sec-sub mt-3 text-center">{t("pages.global.journeySub")}</p>
            <ol className="mt-10 grid gap-5">
              {steps.map((step, idx) => (
                <li key={step.title} className="grid grid-cols-[auto_1fr] items-start gap-5">
                  <div
                    className="grid h-14 w-14 place-items-center rounded-[20px] font-display text-xl font-black text-white shadow-sm"
                    style={{ background: "var(--grad)" }}
                  >
                    {idx + 1}
                  </div>
                  <div className="rounded-lg border border-line bg-surface p-6">
                    <h3 className="text-lg font-extrabold">{step.title}</h3>
                    <p className="mt-2 text-[14.5px] text-ink-soft">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 text-center">
              <Button variant="primary" onClick={open}>
                {t("pages.global.cta")}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
