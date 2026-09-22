import type { ReactNode } from "react";

export type WithChildren = { children: ReactNode };

export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export type LanguageCode = "en" | "zh" | "ko" | "ja";

export interface LanguageBadge {
  code: LanguageCode;
  label: string;
  glyph: string;
  gradient: string;
}
