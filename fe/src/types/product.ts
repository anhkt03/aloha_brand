/**
 * Course schema — mirrors `prisma/schema.prisma` `Course` model.
 * The frontend consumes this shape whether the source is fake JSON
 * or the future backend API.
 */
export type CourseLanguage = "en" | "zh" | "ko" | "ja";
export type CourseLevel =
  | "HSK1"
  | "HSK2"
  | "HSK3"
  | "HSK4"
  | "HSK5"
  | "HSK6"
  | "IELTS"
  | "TOEIC"
  | "TOPIK1"
  | "TOPIK2"
  | "JLPT_N5"
  | "JLPT_N4"
  | "JLPT_N3"
  | "JLPT_N2"
  | "JLPT_N1";

export interface Course {
  id: string;
  slug: string;
  title: string;
  language: CourseLanguage;
  level: CourseLevel;
  levelLabel: string;
  band: string;
  durationMonths: number;
  totalSessions: number;
  target: string;
  outcome: string;
  syllabus: string[];
  status: "OPEN" | "COMING_SOON" | "CLOSED";
  gradient: string;
  glyph: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  publishedAt: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  quote: string;
  image: string;
  scores?: {
    total?: number;
    max?: number;
    parts?: Array<{ label: string; score: number; max: number }>;
    overall?: number;
    bands?: Array<{ label: string; score: number }>;
  };
}
