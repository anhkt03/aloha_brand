import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/layout/PageHero";
import { getPublicCourses } from "@/lib/dal/public-data";
import { TrainingList } from "./training-list";
export const dynamic = "force-dynamic";
export default async function TrainingPage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; const [t, courses] = await Promise.all([getTranslations(), getPublicCourses(locale)]); return <><PageHero eyebrow={t("pages.training.eyebrow")} title={t("pages.training.title")} lead={t("pages.training.lead")} breadcrumb={<><Link href="/">{t("nav.home")}</Link><span>/</span><span>{t("nav.training")}</span></>} /><Container><div className="section">{courses.length ? <TrainingList courses={courses} /> : <div className="card text-center text-ink-soft">Chưa có khóa học đang mở.</div>}</div></Container></>; }
