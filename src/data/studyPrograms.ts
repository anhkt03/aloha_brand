/**
 * "Các chương trình du học" cards on /duhocquocte.
 * Title/desc copy is localized — see `pages.global.programs.items.<key>`
 * in `messages/*.json`. This file only holds structural/visual data.
 * `image` files live at `public/images/global/programs/<key>.webp`.
 */
export type StudyProgramIcon = "undergrad" | "postgrad" | "language" | "scholarship";

export interface StudyProgram {
  key: StudyProgramIcon;
  gradient: string;
  image: string;
}

export const studyPrograms: StudyProgram[] = [
  { key: "undergrad", gradient: "linear-gradient(135deg,#295326,#469142)", image: "/images/global/programs/undergrad.webp" },
  { key: "postgrad", gradient: "linear-gradient(135deg,#12233f,#2f6fd0)", image: "/images/global/programs/postgrad.webp" },
  { key: "language", gradient: "linear-gradient(135deg,#1b6d80,#28b4d2)", image: "/images/global/programs/language.webp" },
  { key: "scholarship", gradient: "linear-gradient(135deg,#a0790f,#e1ba23)", image: "/images/global/programs/scholarship.webp" },
];
