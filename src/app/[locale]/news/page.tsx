import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/layout/PageHero";
import { news } from "@/data/news";
import { formatDate } from "@/lib/utils";

export default async function NewsPage() {
  const t = await getTranslations("nav");
  const locale = await getLocale();

  return (
    <>
      <PageHero
        eyebrow="Tin tức & Sự kiện"
        title="Tin tức ALOHA"
        lead="Cập nhật tuyển sinh, câu chuyện học viên và sự kiện tại ALOHA."
        breadcrumb={
          <>
            <Link href="/" className="hover:text-brand">
              {t("home")}
            </Link>
            <span>/</span>
            <span>{t("news")}</span>
          </>
        }
      />
      <Container>
        <div className="section">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((article) => (
              <article
                key={article.id}
                className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition hover:-translate-y-1 hover:shadow"
              >
                <Link href={`/news/${article.slug}`} className="relative block aspect-[16/10] bg-surface-2">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="text-[12.5px] font-semibold text-muted">
                    {formatDate(article.publishedAt, locale)} · {article.category}
                  </div>
                  <Link
                    href={`/news/${article.slug}`}
                    className="font-display text-[17px] font-extrabold leading-tight hover:text-brand"
                  >
                    {article.title}
                  </Link>
                  <p className="line-clamp-3 text-[14px] text-ink-soft">{article.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
