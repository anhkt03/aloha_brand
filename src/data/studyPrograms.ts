/**
 * "Các chương trình du học" cards on /duhocquocte.
 * Title/desc copy is localized — see `pages.global.programs.items.<key>`
 * in `messages/*.json`. This file only holds structural/visual data.
 */
export type StudyProgramIcon = "undergrad" | "postgrad" | "language" | "scholarship";

export interface StudyProgram {
  key: StudyProgramIcon;
  gradient: string;
}

export const studyPrograms: StudyProgram[] = [
  { key: "undergrad", gradient: "linear-gradient(135deg,#295326,#469142)" },
  { key: "postgrad", gradient: "linear-gradient(135deg,#12233f,#2f6fd0)" },
  { key: "language", gradient: "linear-gradient(135deg,#1b6d80,#28b4d2)" },
  { key: "scholarship", gradient: "linear-gradient(135deg,#a0790f,#e1ba23)" },
];
