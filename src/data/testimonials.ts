import type { Testimonial } from "@/types/product";

/**
 * Real ALOHA students' score cards — images live at
 * `public/images/testimonials/{1..11}.png`.
 * Order matches the 11 attached score-card images.
 */
export const testimonials: Testimonial[] = [
  {
    id: "kieu-thanh-the-anh",
    name: "Kiều Thanh Thế Anh",
    course: "HSK3",
    image: "/images/testimonials/1.png",
    quote:
      "Cảm ơn ALOHA và thầy cô đã luôn đồng hành, giúp em có phương pháp học hiệu quả và tự tin chinh phục mục tiêu HSK.",
    scores: {
      total: 244,
      max: 300,
      parts: [
        { label: "Listening", score: 88, max: 100 },
        { label: "Reading", score: 81, max: 100 },
        { label: "Writing", score: 75, max: 100 },
      ],
    },
  },
  {
    id: "tran-luu-quang",
    name: "Trần Lưu Quang",
    course: "HSK3",
    image: "/images/testimonials/2.png",
    quote:
      "Cảm ơn ALOHA và thầy cô đã luôn đồng hành, giúp em có phương pháp học hiệu quả và tự tin chinh phục mục tiêu HSK.",
    scores: {
      total: 286,
      max: 300,
      parts: [
        { label: "Listening", score: 100, max: 100 },
        { label: "Reading", score: 100, max: 100 },
        { label: "Writing", score: 86, max: 100 },
      ],
    },
  },
  {
    id: "duong-thi-ha-vy",
    name: "Dương Thị Hà Vy",
    course: "HSK5",
    image: "/images/testimonials/3.png",
    quote:
      "Cảm ơn ALOHA và thầy cô đã luôn đồng hành, giúp em có phương pháp học hiệu quả và tự tin chinh phục mục tiêu HSK.",
    scores: {
      total: 288,
      max: 300,
      parts: [
        { label: "Listening", score: 100, max: 100 },
        { label: "Reading", score: 98, max: 100 },
        { label: "Writing", score: 90, max: 100 },
      ],
    },
  },
  {
    id: "lo-huyen-trang",
    name: "Lô Huyền Trang",
    course: "HSK3",
    image: "/images/testimonials/4.png",
    quote:
      "Cảm ơn ALOHA và thầy cô đã luôn đồng hành, giúp em có phương pháp học hiệu quả và tự tin chinh phục mục tiêu HSK.",
    scores: {
      total: 272,
      max: 300,
      parts: [
        { label: "Listening", score: 97, max: 100 },
        { label: "Reading", score: 93, max: 100 },
        { label: "Writing", score: 82, max: 100 },
      ],
    },
  },
  {
    id: "nguyen-phuong-anh",
    name: "Nguyễn Phương Anh",
    course: "HSK4",
    image: "/images/testimonials/5.png",
    quote:
      "Cảm ơn ALOHA và thầy cô đã luôn đồng hành, giúp em có phương pháp học hiệu quả và tự tin chinh phục mục tiêu HSK.",
    scores: {
      total: 276,
      max: 300,
      parts: [
        { label: "Listening", score: 90, max: 100 },
        { label: "Reading", score: 100, max: 100 },
        { label: "Writing", score: 86, max: 100 },
      ],
    },
  },
  {
    id: "dang-thi-thao-nhi",
    name: "Đặng Thị Thảo Nhi",
    course: "HSK4",
    image: "/images/testimonials/6.png",
    quote:
      "Cảm ơn ALOHA và thầy cô đã luôn đồng hành, giúp em có phương pháp học hiệu quả và tự tin chinh phục mục tiêu HSK.",
    scores: {
      total: 293,
      max: 300,
      parts: [
        { label: "Listening", score: 98, max: 100 },
        { label: "Reading", score: 100, max: 100 },
        { label: "Writing", score: 95, max: 100 },
      ],
    },
  },
  {
    id: "nguyen-thi-tra-my",
    name: "Nguyễn Thị Trà My",
    course: "HSK5",
    image: "/images/testimonials/7.png",
    quote:
      "Cảm ơn ALOHA và thầy cô đã luôn đồng hành, giúp em có phương pháp học hiệu quả và tự tin chinh phục mục tiêu HSK.",
    scores: {
      total: 243,
      max: 300,
      parts: [
        { label: "Listening", score: 83, max: 100 },
        { label: "Reading", score: 77, max: 100 },
        { label: "Writing", score: 83, max: 100 },
      ],
    },
  },
  {
    id: "nong-hong-hanh",
    name: "Nông Hồng Hạnh",
    course: "HSK6",
    image: "/images/testimonials/8.png",
    quote:
      "Cảm ơn ALOHA và thầy cô đã luôn đồng hành, giúp em có phương pháp học hiệu quả và tự tin chinh phục mục tiêu HSK.",
    scores: {
      total: 232,
      max: 300,
      parts: [
        { label: "Listening", score: 87, max: 100 },
        { label: "Reading", score: 71, max: 100 },
        { label: "Writing", score: 74, max: 100 },
      ],
    },
  },
  {
    id: "tran-cam-van",
    name: "Trần Cẩm Vân",
    course: "IELTS 6.5+",
    image: "/images/testimonials/9.png",
    quote:
      "Cảm ơn ALOHA và thầy cô đã luôn đồng hành, giúp em có phương pháp học hiệu quả và tự tin chinh phục mục tiêu đầu ra.",
    scores: {
      overall: 6.5,
      bands: [
        { label: "Listening", score: 7.0 },
        { label: "Reading", score: 6.5 },
        { label: "Writing", score: 6.0 },
        { label: "Speaking", score: 6.0 },
      ],
    },
  },
  {
    id: "phung-phuong-thao",
    name: "Phùng Phương Thảo",
    course: "IELTS 6.5+",
    image: "/images/testimonials/10.png",
    quote:
      "Trước em học tiếng Anh khá chật vật, nhưng vào ALOHA được hướng dẫn từng bước nên việc học nhẹ nhàng hơn nhiều.",
    scores: {
      overall: 7.0,
      bands: [
        { label: "Listening", score: 8.0 },
        { label: "Reading", score: 7.5 },
        { label: "Writing", score: 6.5 },
        { label: "Speaking", score: 6.0 },
      ],
    },
  },
  {
    id: "ho-huyen-linh",
    name: "Hồ Huyền Linh",
    course: "IELTS 6.5+",
    image: "/images/testimonials/11.png",
    quote:
      "Thầy cô theo sát và sửa từng lỗi nên em biết mình yếu ở đâu để cải thiện. Sau một thời gian học, em tự tin hơn hẳn khi sử dụng tiếng Anh.",
    scores: {
      overall: 7.0,
      bands: [
        { label: "Listening", score: 7.5 },
        { label: "Reading", score: 7.0 },
        { label: "Writing", score: 7.5 },
        { label: "Speaking", score: 6.0 },
      ],
    },
  },
];
