import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/common/Container";
import { news } from "@/data/news";
import { formatDate } from "@/lib/utils";

interface Params {
  params: Promise<{ slug: string; locale: string }>;
}

export function generateStaticParams() {
  return news.map((article) => ({ slug: article.slug }));
}

export default async function NewsDetailPage({ params }: Params) {
  const { slug } = await params;
  const article = news.find((n) => n.slug === slug);
  if (!article) notFound();

  const t = await getTranslations("nav");
  const locale = await getLocale();

  return (
    <article>
      <div className="pagehero">
        <Container>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-muted">
            <Link href="/" className="hover:text-brand">
              {t("home")}
            </Link>
            <span>/</span>
            <Link href="/news" className="hover:text-brand">
              {t("news")}
            </Link>
            <span>/</span>
            <span className="truncate">{article.title}</span>
          </div>
          <span className="pill brand mt-4">{article.category}</span>
          <h1 className="mt-4 max-w-[45ch] font-display text-[clamp(28px,4.4vw,44px)] font-black">{article.title}</h1>
          <div className="mt-4 text-[14px] text-muted">
            {formatDate(article.publishedAt, locale)} · {article.author}
          </div>
        </Container>
      </div>
      <Container>
        <div className="section mx-auto max-w-3xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-surface-2">
            <Image src={article.coverImage} alt={article.title} fill sizes="(min-width:1024px) 768px, 100vw" className="object-cover" />
          </div>
          <div className="prose prose-lg mt-8 max-w-none text-ink-soft">
            <p className="text-[17px] leading-relaxed">{article.excerpt}</p>
            <p className="mt-4 text-[16px] leading-relaxed">{article.content}</p>
          </div>
        </div>
      </Container>
    </article>
  );
}
