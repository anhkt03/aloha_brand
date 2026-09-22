import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/common/Container";

const TRAINING_LINKS = [
  { label: "Tiếng Trung", href: "/training" as const },
  { label: "Tiếng Anh", href: "/training" as const },
  { label: "Tiếng Hàn", href: "/training" as const },
  { label: "Tiếng Nhật", href: "/training" as const },
];

const GLOBAL_LINKS = [
  { label: "Du học Đài Loan", href: "/global" as const },
  { label: "Du học Hàn Quốc", href: "/global" as const },
  { label: "Du học Nhật Bản", href: "/global" as const },
  { label: "Du học Châu Âu", href: "/global" as const },
  { label: "Du học Singapore", href: "/global" as const },
];

export function Footer() {
  const t = useTranslations();

  const aboutLinks = [
    { key: "intro", href: "/about" as const },
    { key: "team", href: "/about" as const },
    { key: "branches", href: "/branches" as const },
    { key: "news", href: "/news" as const },
    { key: "contact", href: "/contact" as const },
  ];

  return (
    <footer
      className="mt-5 py-14 text-[#dfeeda]"
      style={{ background: "#295326" }}
    >
      <Container>
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <div className="relative mb-4 block h-20 w-20 overflow-hidden rounded-full bg-white">
              <Image
                src="/images/brand/aloha-logo.jpg"
                alt={siteConfig.name}
                fill
                sizes="80px"
                className="scale-[1.6] object-contain object-center"
              />
            </div>
            <div className="font-display text-lg font-black text-white">{siteConfig.name}</div>
            <p className="mt-2 text-sm italic text-[#bcd4b5]">{siteConfig.tagline}</p>
            <div className="mt-5 flex gap-3">
              <SocialLink href={siteConfig.socials.facebook} label="Facebook" bg="#1877f2">
                <path d="M22 12a10 10 0 1 0-11.6 9.87v-6.98H7.9V12h2.5V9.8c0-2.48 1.48-3.85 3.74-3.85 1.08 0 2.22.2 2.22.2v2.44h-1.25c-1.23 0-1.62.77-1.62 1.55V12h2.76l-.44 2.89h-2.32v6.98A10 10 0 0 0 22 12z" />
              </SocialLink>
              <SocialLink href={siteConfig.socials.tiktok} label="TikTok" bg="#010101">
                <path d="M20 9.5a7.5 7.5 0 0 1-4.4-1.4v6.9a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v2.7a2.8 2.8 0 1 0 2 2.7V2h2.5a4.5 4.5 0 0 0 4.5 4.5v3Z" />
              </SocialLink>
              <SocialLink href={siteConfig.socials.youtube} label="YouTube" bg="#ff0000">
                <path d="M23.5 6.2s-.23-1.63-.94-2.35c-.9-.94-1.9-.94-2.36-1C16.9 2.5 12 2.5 12 2.5s-4.9 0-8.2.35c-.46.06-1.46.06-2.36 1C.73 4.57.5 6.2.5 6.2S.25 8.1.25 10v1.99c0 1.9.25 3.8.25 3.8s.23 1.62.94 2.34c.9.94 2.08.9 2.6 1 1.9.18 8 .35 8 .35s4.9-.01 8.2-.36c.46-.06 1.46-.06 2.36-1 .71-.72.94-2.34.94-2.34s.25-1.9.25-3.8V10c0-1.9-.25-3.8-.25-3.8ZM9.75 14.5v-6l6.5 3-6.5 3Z" />
              </SocialLink>
            </div>
          </div>

          <FooterList title={t("footer.training")} items={TRAINING_LINKS.map((l) => ({ label: l.label, href: l.href }))} />
          <FooterList title={t("footer.global")} items={GLOBAL_LINKS.map((l) => ({ label: l.label, href: l.href }))} />
          <FooterList
            title={t("footer.about")}
            items={aboutLinks.map((l) => ({ label: t(`footer.aboutLinks.${l.key}`), href: l.href }))}
          />

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-display text-[15px] font-extrabold text-white">{t("footer.contact")}</h4>
            <p className="mb-2 text-[13px] leading-relaxed text-[#bcd4b5]">
              <b className="font-display text-white">Hotline: </b>
              <a className="text-white" href={siteConfig.hotlineHref}>
                {siteConfig.hotline}
              </a>
            </p>
            <p className="mb-2 text-[13px] leading-relaxed text-[#bcd4b5]">
              <b className="font-display text-white">{t("footer.email")}: </b>
              <a className="text-white" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </p>
            <p className="text-[13px] leading-relaxed text-[#bcd4b5]">
              <b className="font-display text-white">{t("footer.address")}: </b>
              {siteConfig.address}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-[13px] text-[#a9c5a2]">
          <span>{t("footer.copyright")}</span>
          <span className="flex items-center gap-4">
            <a href="#" className="hover:text-white">
              {t("footer.policy")}
            </a>
            <span aria-hidden>·</span>
            <a href="#" className="hover:text-white">
              {t("footer.terms")}
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}

interface FooterListProps {
  title: string;
  items: Array<{ label: string; href: "/" | "/training" | "/global" | "/about" | "/branches" | "/news" | "/contact" }>;
}

function FooterList({ title, items }: FooterListProps) {
  return (
    <div>
      <h4 className="mb-4 font-display text-[15px] font-extrabold text-white">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, idx) => (
          <li key={`${item.label}-${idx}`}>
            <Link href={item.href} className="text-sm text-[#cfe4c9] transition hover:pl-1 hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SocialLinkProps {
  href: string;
  label: string;
  bg: string;
  children: React.ReactNode;
}

function SocialLink({ href, label, bg, children }: SocialLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-[42px] w-[42px] place-items-center rounded-[11px] text-white transition hover:-translate-y-1"
      style={{ background: bg }}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        {children}
      </svg>
    </a>
  );
}
