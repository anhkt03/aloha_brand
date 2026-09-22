import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";

export default function ContactPage() {
  const t = useTranslations("nav");
  return (
    <>
      <PageHero
        eyebrow="Liên hệ"
        title="ALOHA lắng nghe bạn"
        lead="Gửi tin nhắn hoặc gọi hotline để được tư vấn miễn phí lộ trình học phù hợp nhất."
        breadcrumb={
          <>
            <Link href="/" className="hover:text-brand">
              {t("home")}
            </Link>
            <span>/</span>
            <span>{t("contact")}</span>
          </>
        }
      />
      <ContactSection />
    </>
  );
}
