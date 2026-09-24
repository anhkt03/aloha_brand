import type { DestinationKey } from "./destinations";

/**
 * Featured scholarships shown on /duhocquocte.
 * Name/school/level/badge copy is localized — see
 * `pages.global.scholarships.items.<key>` and `.badges` in `messages/*.json`.
 * This file only holds structural/visual data.
 */
export type ScholarshipBadge = "full" | "partial" | "tuition";

export interface Scholarship {
  key: string;
  countryKey: DestinationKey;
  countryFlag: string;
  badge: ScholarshipBadge;
  /** Hạn đăng ký, hiển thị dạng dd/mm/yyyy */
  deadline: string;
  gradient: string;
}

export const scholarships: Scholarship[] = [
  {
    key: "taiwanUndergrad",
    countryKey: "taiwan",
    countryFlag: "🇹🇼",
    badge: "full",
    deadline: "30/11/2026",
    gradient: "linear-gradient(135deg,#c6302b,#e1ba23)",
  },
  {
    key: "koreaGks",
    countryKey: "korea",
    countryFlag: "🇰🇷",
    badge: "partial",
    deadline: "15/12/2026",
    gradient: "linear-gradient(135deg,#2f6fd0,#28b4d2)",
  },
  {
    key: "erasmus",
    countryKey: "europe",
    countryFlag: "🇪🇺",
    badge: "tuition",
    deadline: "31/01/2027",
    gradient: "linear-gradient(135deg,#0033a0,#e1ba23)",
  },
];
