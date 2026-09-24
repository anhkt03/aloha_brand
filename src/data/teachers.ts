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
  { id: "nguyen-thi-mai", name: "Cô Nguyễn Thị Mai", roleKey: "zh", credential: "HSK 6" },
  { id: "tran-minh-duc", name: "Thầy Trần Minh Đức", roleKey: "en", credential: "8.5 IELTS" },
  { id: "park-ji-eun", name: "Cô Park Ji-eun", roleKey: "ko", credential: "TOPIK 6" },
  { id: "tanaka-yumi", name: "Cô Tanaka Yumi", roleKey: "ja", credential: "JLPT N1" },
];
