import type { NavItem } from "@/types/navigation";

/**
 * Order & routes for the primary navigation.
 * Labels come from `messages/{locale}.json` under `nav.<key>`.
 */
export const primaryNav: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/vealoha" },
  { key: "training", href: "/ngoaingu" },
  { key: "global", href: "/duhocquocte" },
  { key: "branches", href: "/coso" },
  { key: "news", href: "/tintuc" },
  { key: "contact", href: "/lienhe" },
];
