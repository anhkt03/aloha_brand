import type { DestinationKey } from "./destinations";

/**
 * "Cẩm nang du học" articles on /duhocquocte.
 * Title copy is localized — see `pages.global.knowledge.items.<key>` in
 * `messages/*.json`. `categoryKey` picks the badge label: a destination
 * key reuses that market's name, "scholarship" uses `knowledge.scholarshipLabel`.
 */
export interface StudyAbroadArticle {
  key: string;
  categoryKey: DestinationKey | "scholarship";
  /** ISO date */
  date: string;
  image: string;
}

export const studyAbroadArticles: StudyAbroadArticle[] = [
  { key: "japanConditions", categoryKey: "japan", date: "2026-08-12", image: "/images/news/placeholder.svg" },
  { key: "koreaCost", categoryKey: "korea", date: "2026-08-08", image: "/images/news/placeholder.svg" },
  { key: "taiwanScholarships", categoryKey: "scholarship", date: "2026-08-05", image: "/images/news/placeholder.svg" },
  { key: "singaporeMajors", categoryKey: "singapore", date: "2026-08-01", image: "/images/news/placeholder.svg" },
];
