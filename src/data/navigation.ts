import type { NavItem } from "@/types/navigation";

/**
 * Order & routes for the primary navigation.
 * Labels come from `messages/{locale}.json` under `nav.<key>`.
 */
export const primaryNav: NavItem[] = [
  { key: "home", href: "/" },
  { key: "training", href: "/training" },
  { key: "global", href: "/global" },
  { key: "about", href: "/about" },
  { key: "branches", href: "/branches" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
];
