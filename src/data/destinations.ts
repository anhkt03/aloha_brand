/**
 * Study-abroad destinations shown on the /duhocquocte page.
 * Name and highlight copy are localized — see `pages.global.destinations.<key>`
 * in `messages/*.json`. This file only holds structural/visual data.
 */
export type DestinationKey = "taiwan" | "korea" | "japan" | "singapore" | "europe";

export interface Destination {
  key: DestinationKey;
  flag: string;
  /** Local image path. Fallback = null → gradient renders. */
  image: string | null;
  /** Gradient màu chủ đạo dùng khi chưa có ảnh */
  gradient: string;
}

export const destinations: Destination[] = [
  {
    key: "taiwan",
    flag: "🇹🇼",
    image: "/images/global/taiwan.jpg",
    gradient: "linear-gradient(135deg,#c6302b,#e1ba23)",
  },
  {
    key: "korea",
    flag: "🇰🇷",
    image: "/images/global/korea.jpg",
    gradient: "linear-gradient(135deg,#2f6fd0,#28b4d2)",
  },
  {
    key: "japan",
    flag: "🇯🇵",
    image: "/images/global/japan.jpg",
    gradient: "linear-gradient(135deg,#295326,#469142)",
  },
  {
    key: "singapore",
    flag: "🇸🇬",
    image: "/images/global/singapore.jpg",
    gradient: "linear-gradient(135deg,#c9002b,#f4b400)",
  },
  {
    key: "europe",
    flag: "🇪🇺",
    image: "/images/global/europe.jpg",
    gradient: "linear-gradient(135deg,#0033a0,#e1ba23)",
  },
];
