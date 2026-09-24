import type { DestinationKey } from "./destinations";

/**
 * Success stories on /duhocquocte page.
 * School/quote copy is localized — see `pages.global.stories.items.<key>`
 * in `messages/*.json`. Student names are proper nouns and stay as-is.
 * No real student photos yet — cards render a gradient avatar instead of
 * a placeholder photo (the testimonial score-card images elsewhere on the
 * site have a *different* student's name baked into the pixels, which
 * would visibly contradict the caption here).
 */
export interface GlobalStory {
  key: string;
  name: string;
  countryKey: DestinationKey;
  countryFlag: string;
  year: number;
}

export const globalStories: GlobalStory[] = [
  { key: "taiwan1", name: "Lê Thu Trang", countryKey: "taiwan", countryFlag: "🇹🇼", year: 2026 },
  { key: "korea1", name: "Trần Hoàng Nam", countryKey: "korea", countryFlag: "🇰🇷", year: 2025 },
  { key: "japan1", name: "Nguyễn Minh Anh", countryKey: "japan", countryFlag: "🇯🇵", year: 2025 },
  { key: "taiwan2", name: "Dương Thị Hà Vy", countryKey: "taiwan", countryFlag: "🇹🇼", year: 2024 },
  { key: "singapore1", name: "Phạm Gia Bảo", countryKey: "singapore", countryFlag: "🇸🇬", year: 2025 },
  { key: "europe1", name: "Trần Cẩm Vân", countryKey: "europe", countryFlag: "🇪🇺", year: 2024 },
  { key: "korea2", name: "Lô Huyền Trang", countryKey: "korea", countryFlag: "🇰🇷", year: 2024 },
];
