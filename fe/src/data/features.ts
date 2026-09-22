import { GRADIENTS } from "@/lib/constants";

export type FeatureIconKey = "path" | "teacher" | "commitment" | "experience";

export interface FeatureItem {
  key: FeatureIconKey;
  gradient: string;
}

export const whyFeatures: FeatureItem[] = [
  { key: "path", gradient: GRADIENTS.brand },
  { key: "teacher", gradient: "linear-gradient(135deg,#28b4d2,#469142)" },
  { key: "commitment", gradient: GRADIENTS.warm },
  { key: "experience", gradient: "linear-gradient(135deg,#469142,#295326)" },
];

export const languageCards = [
  { code: "en" as const, glyph: "EN", gradient: GRADIENTS.langEN },
  { code: "zh" as const, glyph: "中", gradient: GRADIENTS.langZH },
  { code: "ko" as const, glyph: "한", gradient: GRADIENTS.langKO },
  { code: "ja" as const, glyph: "日", gradient: GRADIENTS.langJA },
];
