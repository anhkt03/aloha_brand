export type TeacherRoleKey = "zh" | "en" | "ko" | "ja";

export interface TeacherMember {
  id: string;
  name: string;
  roleKey: TeacherRoleKey;
  credential: string;
  /** Set once real photos are provided; placeholder avatar renders until then. */
  image?: string;
}

export const teachers: TeacherMember[] = [
  { id: "duong-minh-ngoc", name: "Cô Dương Minh Ngọc", roleKey: "zh", credential: "HSK 6", image: "/images/teachers/duong-minh-ngoc.png" },
  { id: "nguyen-thuy-dung", name: "Cô Nguyễn Thùy Dung", roleKey: "en", credential: "IELTS 8.0", image: "/images/teachers/nguyen-thuy-dung.png" },
  { id: "nguyen-thi-ngoc-bich", name: "Cô Nguyễn Thị Ngọc Bích", roleKey: "ko", credential: "TOPIK 5", image: "/images/teachers/nguyen-thi-ngoc-bich.png" },
  { id: "nguyen-ngoc-han", name: "Cô Nguyễn Ngọc Hân", roleKey: "ja", credential: "JLPT N2", image: "/images/teachers/nguyen-ngoc-han.png" },
];
