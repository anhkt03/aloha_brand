import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { getPublicNewsBySlug } from "@/lib/dal/public-data";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const [article, t] = await Promise.all([getPublicNewsBySlug(locale, slug), getTranslations()]);
  if (!article) notFound();
  return (
    <article>
      <div className="pagehero">
        <Container>
          <div className="flex gap-2 text-sm text-muted">
            <Link href="/">{t("nav.home")}</Link>
            <span>/</span>
            <Link href="/news">{t("nav.news")}</Link>
          </div>
          <h1 className="mt-4 max-w-[45ch] text-[clamp(28px,4.4vw,44px)] font-black">{article.title}</h1>
          <p className="mt-4 text-sm text-muted">{formatDate(new Date(article.publishedAt), locale)}</p>
        </Container>
      </div>
      <Container>
        <div className="section mx-auto max-w-3xl">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
          </div>
          <div className="mt-8 whitespace-pre-wrap leading-relaxed text-ink-soft">{article.content}</div>
          {article.gallery.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-lg font-extrabold text-ink">{t("pages.news.gallery")}</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {article.gallery.map((src, idx) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-lg bg-surface-2">
                    <Image
                      src={src}
                      alt={`${article.title} ${idx + 1}`}
                      fill
                      sizes="(min-width:640px) 33vw, 50vw"
                      className="object-cover transition hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </article>
  );
}
