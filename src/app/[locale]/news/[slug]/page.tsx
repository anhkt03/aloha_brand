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
  const [article, t] = await Promise.all([getPublicNewsBySlug(locale, slug), getTranslations("nav")]);
  if (!article) notFound();
  return (
    <article>
      <div className="pagehero">
        <Container>
          <div className="flex gap-2 text-sm text-muted">
            <Link href="/">{t("home")}</Link>
            <span>/</span>
            <Link href="/news">{t("news")}</Link>
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
        </div>
      </Container>
    </article>
  );
}
