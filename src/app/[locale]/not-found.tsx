import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("pages.notFound");
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-wrap flex-col items-center justify-center px-6 text-center">
      <span className="eyebrow">{t("eyebrow")}</span>
      <h1 className="sec-title">{t("title")}</h1>
      <p className="sec-sub mt-2">{t("sub")}</p>
      <Link href="/" className="btn btn-primary mt-6">
        {t("cta")}
      </Link>
    </div>
  );
}
