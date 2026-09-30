import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/layout/PageHero";
import { NewsListSection } from "./news-list-section";
import { NewsListSkeleton } from "./news-list-skeleton";

export const dynamic = "force-dynamic";

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();
  return (
    <>
      <PageHero
        eyebrow={t("pages.news.eyebrow")}
        title={t("pages.news.title")}
        lead={t("pages.news.lead")}
        breadcrumb={<><Link href="/">{t("nav.home")}</Link><span>/</span><span>{t("nav.news")}</span></>}
      />
      <Container>
        <div className="section">
          <Suspense fallback={<NewsListSkeleton />}>
            <NewsListSection locale={locale} />
          </Suspense>
        </div>
      </Container>
    </>
  );
}
