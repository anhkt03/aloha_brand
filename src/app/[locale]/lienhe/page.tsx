import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";

export default function ContactPage() {
  const t = useTranslations();
  return (
    <>
      <PageHero
        eyebrow={t("pages.contact.eyebrow")}
        title={t("pages.contact.title")}
        lead={t("pages.contact.lead")}
        breadcrumb={
          <>
            <Link href="/" className="hover:text-brand">
              {t("nav.home")}
            </Link>
            <span>/</span>
            <span>{t("nav.contact")}</span>
          </>
        }
      />
      <ContactSection />
    </>
  );
}
