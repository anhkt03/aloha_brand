/**
 * Brand palette — single source of truth. Also mirrored as CSS variables in
 * `src/app/globals.css` and Tailwind tokens in `tailwind.config.ts`.
 */
export const COLORS = {
  brand: "#469142",
  brandDeep: "#295326",
  brandHover: "#3c8138",
  teal: "#28b4d2",
  accent: "#e1ba23",
  ink: "#182a17",
  inkSoft: "#3f5140",
  muted: "#6c7f6a",
  surface: "#ffffff",
  bg: "#f4f8f1",
  line: "#d8e5d2",
} as const;

export const GRADIENTS = {
  brand: "linear-gradient(135deg, #469142 0%, #28b4d2 100%)",
  warm: "linear-gradient(135deg, #e1ba23 0%, #469142 100%)",
  soft: "linear-gradient(135deg, #eaf5e6 0%, #dff1f6 100%)",
  langEN: "linear-gradient(135deg, #469142, #28b4d2)",
  langZH: "linear-gradient(135deg, #d93b3b, #e1ba23)",
  langKO: "linear-gradient(135deg, #2f6fd0, #28b4d2)",
  langJA: "linear-gradient(135deg, #295326, #469142)",
} as const;

export const LAYOUT = {
  maxWidth: 1200,
  navHeight: 72,
} as const;

export const BREAKPOINTS = {
  sm: 440,
  md: 680,
  lg: 1000,
  xl: 1280,
} as const;

export const LOCALES = ["vi", "en", "zh", "ko", "ja"] as const;
export const DEFAULT_LOCALE = "vi";
export type Locale = (typeof LOCALES)[number];
