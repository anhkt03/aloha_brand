/**
 * Best-effort flag lookup from a free-text category name (e.g. "Tiếng Anh"),
 * used as a faint watermark on course banners. Category names are
 * admin-entered strings, not a fixed language enum, hence the keyword match.
 */
const FLAG_BY_KEYWORD: Array<[string, string]> = [
  ["trung", "/images/flags/china.png"],
  ["anh", "/images/flags/uk.png"],
  ["hàn", "/images/flags/korea.png"],
  ["nhật", "/images/flags/japan.png"],
];

export function getCategoryFlag(category: string): string | null {
  const normalized = category.toLowerCase();
  return FLAG_BY_KEYWORD.find(([keyword]) => normalized.includes(keyword))?.[1] ?? null;
}
