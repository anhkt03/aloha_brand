/**
 * Success stories on /duhocquocte page.
 * Photos reuse the testimonial folder for now — replace with real ones later.
 */
export interface GlobalStory {
  id: string;
  name: string;
  school: string;
  country: string;
  countryFlag: string;
  year: number;
  quote: string;
  image: string;
}

export const globalStories: GlobalStory[] = [
  {
    id: "story-korea-1",
    name: "Lô Huyền Trang",
    school: "Đại học Yonsei",
    country: "Hàn Quốc",
    countryFlag: "🇰🇷",
    year: 2024,
    quote:
      "ALOHA hỗ trợ em từ TOPIK 2 lên TOPIK 5 chỉ trong 10 tháng, cùng hồ sơ apply Yonsei rất kỹ. Giờ em đã ở Seoul.",
    image: "/images/testimonials/4.png",
  },
  {
    id: "story-japan-1",
    name: "Đặng Thị Thảo Nhi",
    school: "Waseda University",
    country: "Nhật Bản",
    countryFlag: "🇯🇵",
    year: 2024,
    quote:
      "Từ JLPT N5 sang N2 rồi apply Waseda — hành trình 2 năm nhưng có đội ngũ ALOHA đồng hành nên rất chắc chắn.",
    image: "/images/testimonials/6.png",
  },
  {
    id: "story-china-1",
    name: "Dương Thị Hà Vy",
    school: "Đại học Bắc Kinh",
    country: "Trung Quốc",
    countryFlag: "🇨🇳",
    year: 2023,
    quote:
      "Học bổng CSC toàn phần Bắc Kinh — mình biết ơn ALOHA đã lo cả HSK lẫn bộ hồ sơ scholarship rất chỉn chu.",
    image: "/images/testimonials/3.png",
  },
  {
    id: "story-uk-1",
    name: "Trần Cẩm Vân",
    school: "University of Manchester",
    country: "Anh Quốc",
    countryFlag: "🇬🇧",
    year: 2024,
    quote:
      "IELTS 6.5 sau 5 tháng luyện tập ở ALOHA, đủ đầu vào Master Business tại Manchester. Cảm ơn thầy cô!",
    image: "/images/testimonials/9.png",
  },
];
