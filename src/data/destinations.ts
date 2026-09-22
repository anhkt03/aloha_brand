/**
 * Study-abroad destinations shown on the /duhocquocte page.
 * Fake data — swap for a BE-backed model when available.
 * `image` is a placeholder path; upload real ones to
 * `public/images/global/<key>.jpg` and update the field.
 */
export type DestinationKey =
  | "china"
  | "korea"
  | "japan"
  | "uk"
  | "singapore"
  | "europe";

export interface Destination {
  key: DestinationKey;
  flag: string;
  /** Local image path (upload later). Fallback = null → gradient renders. */
  image: string | null;
  /** Chi phí ước lượng theo năm, VNĐ */
  tuitionRangeVnd: [number, number];
  /** Ngôn ngữ đầu vào tối thiểu */
  language: string;
  /** Chương trình học phổ biến */
  popularMajors: string[];
  /** Học bổng liên quan */
  scholarshipKeys: string[];
  /** Gradient màu chủ đạo dùng khi chưa có ảnh */
  gradient: string;
}

export const destinations: Destination[] = [
  {
    key: "china",
    flag: "🇨🇳",
    image: null,
    tuitionRangeVnd: [80_000_000, 200_000_000],
    language: "HSK 4 – HSK 5",
    popularMajors: ["Kinh tế", "Kỹ thuật", "Y – Dược", "Ngôn ngữ Trung"],
    scholarshipKeys: ["csc", "confucius"],
    gradient: "linear-gradient(135deg,#d93b3b,#e1ba23)",
  },
  {
    key: "korea",
    flag: "🇰🇷",
    image: null,
    tuitionRangeVnd: [120_000_000, 280_000_000],
    language: "TOPIK 3 – TOPIK 5",
    popularMajors: ["IT", "Kinh doanh", "Truyền thông", "Ẩm thực – Du lịch"],
    scholarshipKeys: ["gks", "kgsp"],
    gradient: "linear-gradient(135deg,#2f6fd0,#28b4d2)",
  },
  {
    key: "japan",
    flag: "🇯🇵",
    image: null,
    tuitionRangeVnd: [180_000_000, 320_000_000],
    language: "JLPT N3 – N2",
    popularMajors: ["Cơ khí – Điện tử", "IT", "Điều dưỡng", "Nhà hàng – Khách sạn"],
    scholarshipKeys: ["mext", "jasso"],
    gradient: "linear-gradient(135deg,#295326,#469142)",
  },
  {
    key: "uk",
    flag: "🇬🇧",
    image: null,
    tuitionRangeVnd: [450_000_000, 900_000_000],
    language: "IELTS 6.0+",
    popularMajors: ["Business", "Finance", "Engineering", "Data Science"],
    scholarshipKeys: ["chevening"],
    gradient: "linear-gradient(135deg,#12233f,#2f6fd0)",
  },
  {
    key: "singapore",
    flag: "🇸🇬",
    image: null,
    tuitionRangeVnd: [300_000_000, 650_000_000],
    language: "IELTS 6.0 – 6.5",
    popularMajors: ["Business", "Hospitality", "Data & AI", "Kỹ thuật"],
    scholarshipKeys: ["aseanScholarship"],
    gradient: "linear-gradient(135deg,#c9002b,#f4b400)",
  },
  {
    key: "europe",
    flag: "🇪🇺",
    image: null,
    tuitionRangeVnd: [200_000_000, 500_000_000],
    language: "IELTS 6.0+ / Ngôn ngữ bản địa",
    popularMajors: ["Kỹ thuật", "Nghệ thuật – Thiết kế", "Kinh tế", "Xã hội học"],
    scholarshipKeys: ["erasmus", "daad"],
    gradient: "linear-gradient(135deg,#0033a0,#e1ba23)",
  },
];
