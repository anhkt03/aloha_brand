import { GRADIENTS } from "@/lib/constants";
import type { LanguageBadge } from "@/types/common";

export const heroLanguages: LanguageBadge[] = [
  { code: "en", label: "en", glyph: "EN", gradient: GRADIENTS.langEN },
  { code: "zh", label: "zh", glyph: "中", gradient: GRADIENTS.langZH },
  { code: "ko", label: "ko", glyph: "한", gradient: GRADIENTS.langKO },
  { code: "ja", label: "ja", glyph: "日", gradient: GRADIENTS.langJA },
];

export const heroStats = [
  { icon: "students", value: "10.000+", labelKey: "students" },
  { icon: "star", value: "4.9/5", labelKey: "rating" },
  { icon: "pin", value: "10+", labelKey: "branches" },
] as const;
