import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { LOCALES } from "./src/lib/constants";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Public routes that were renamed to Vietnamese slugs. Old URLs keep working through
 * permanent redirects. The locale pattern is what stops `/admin/news` (admin area,
 * unchanged) from being caught by the `/:locale/news` rule.
 */
const RENAMED_ROUTES = {
  about: "vealoha",
  contact: "lienhe",
  branches: "coso",
  news: "tintuc",
} as const;
const LOCALE_PATTERN = LOCALES.join("|");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return Object.entries(RENAMED_ROUTES).flatMap(([from, to]) => [
      { source: `/:locale(${LOCALE_PATTERN})/${from}/:path*`, destination: `/:locale/${to}/:path*`, permanent: true },
      { source: `/${from}/:path*`, destination: `/${to}/:path*`, permanent: true },
    ]);
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/aloha-media/**" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
