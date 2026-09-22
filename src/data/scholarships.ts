/**
 * Featured scholarships shown on /duhocquocte.
 * Fake data — replace with BE-backed CMS entries later.
 */
export interface Scholarship {
  key: string;
  name: string;
  country: string;
  /** Tổng giá trị hoặc phần trăm học bổng */
  value: string;
  /** Ai nộp được */
  audience: string;
  gradient: string;
  countryFlag: string;
}

export const scholarships: Scholarship[] = [
  {
    key: "csc",
    name: "CSC — China Scholarship Council",
    country: "Trung Quốc",
    countryFlag: "🇨🇳",
    value: "100% học phí + KTX + trợ cấp",
    audience: "Cử nhân · Thạc sĩ · Tiến sĩ",
    gradient: "linear-gradient(135deg,#d93b3b,#e1ba23)",
  },
  {
    key: "confucius",
    name: "Confucius Institute Scholarship",
    country: "Trung Quốc",
    countryFlag: "🇨🇳",
    value: "Học phí + trợ cấp sinh hoạt",
    audience: "Ngành Ngôn ngữ Trung, GV tiếng Trung",
    gradient: "linear-gradient(135deg,#e1ba23,#d93b3b)",
  },
  {
    key: "gks",
    name: "GKS — Global Korea Scholarship",
    country: "Hàn Quốc",
    countryFlag: "🇰🇷",
    value: "100% học phí + vé máy bay + trợ cấp",
    audience: "Cử nhân · Thạc sĩ · Tiến sĩ",
    gradient: "linear-gradient(135deg,#2f6fd0,#28b4d2)",
  },
  {
    key: "mext",
    name: "MEXT — Bộ Giáo dục Nhật Bản",
    country: "Nhật Bản",
    countryFlag: "🇯🇵",
    value: "100% học phí + trợ cấp 117.000 JPY/tháng",
    audience: "Nghiên cứu · Sau ĐH · Chuyên tu",
    gradient: "linear-gradient(135deg,#295326,#469142)",
  },
  {
    key: "chevening",
    name: "Chevening Scholarship",
    country: "Anh Quốc",
    countryFlag: "🇬🇧",
    value: "100% học phí Thạc sĩ 1 năm + trợ cấp",
    audience: "Thạc sĩ, ≥2 năm kinh nghiệm",
    gradient: "linear-gradient(135deg,#12233f,#2f6fd0)",
  },
  {
    key: "erasmus",
    name: "Erasmus Mundus Joint Master",
    country: "Châu Âu",
    countryFlag: "🇪🇺",
    value: "Học bổng toàn phần đa quốc gia",
    audience: "Thạc sĩ liên trường 2 năm",
    gradient: "linear-gradient(135deg,#0033a0,#e1ba23)",
  },
];
