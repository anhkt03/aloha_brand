export const siteConfig = {
  name: "ALOHA Language School",
  shortName: "ALOHA",
  tagline: "More Languages, A Brighter You",
  hotline: "1900 9309",
  hotlineHref: "tel:19009309",
  email: "hello@aloha.edu.vn",
  address: "Hệ thống cơ sở toàn miền Bắc",
  socials: {
    facebook: "https://facebook.com/aloha",
    youtube: "https://youtube.com/@aloha",
    tiktok: "https://tiktok.com/@aloha",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export type SiteConfig = typeof siteConfig;
