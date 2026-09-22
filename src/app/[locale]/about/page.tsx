import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/layout/PageHero";

const VMV_BG = {
  vision: "linear-gradient(135deg,#469142,#295326)",
  mission: "linear-gradient(135deg,#28b4d2,#469142)",
  values: "linear-gradient(135deg,#e1ba23,#469142)",
} as const;

type VmvKey = keyof typeof VMV_BG;
type TimelineEntry = { year: string; title: string; desc: string };

export default function AboutPage() {
  const t = useTranslations();
  const vmvKeys: VmvKey[] = ["vision", "mission", "values"];
  const timeline = t.raw("pages.about.timeline") as TimelineEntry[];

  return (
    <>
      <PageHero
        eyebrow={t("pages.about.eyebrow")}
        title={t("pages.about.title")}
        lead={t("pages.about.lead")}
        breadcrumb={
          <>
            <Link href="/" className="hover:text-brand">
              {t("nav.home")}
            </Link>
            <span>/</span>
            <span>{t("nav.about")}</span>
          </>
        }
      />
      <Container>
        <div className="section">
          <h2 className="sec-title text-center">{t("pages.about.vmvTitle")}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {vmvKeys.map((key) => (
              <div key={key} className="relative min-h-[220px] overflow-hidden rounded-lg p-8 text-white" style={{ background: VMV_BG[key] }}>
                <h3 className="mt-16 text-2xl font-black">{t(`pages.about.vmv.${key}.title`)}</h3>
                <p className="mt-2 text-[14.5px] text-white/95">{t(`pages.about.vmv.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div style={{ background: "var(--surface-2)" }}>
        <Container>
          <div className="section">
            <h2 className="sec-title text-center">{t("pages.about.timelineTitle")}</h2>
            <div className="mx-auto mt-10 max-w-3xl">
              {timeline.map((row, idx) => (
                <div key={row.year} className="grid grid-cols-[80px_20px_1fr] gap-4 pb-6">
                  <div className="text-right font-display text-lg font-black text-brand">{row.year}</div>
                  <div className="relative flex justify-center">
                    <span className="mt-2 h-3 w-3 rounded-full" style={{ background: "var(--grad)" }} />
                    {idx < timeline.length - 1 && <span className="absolute top-4 h-full w-[2px] bg-line-2" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold">{row.title}</h3>
                    <p className="text-[14.5px] text-ink-soft">{row.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
