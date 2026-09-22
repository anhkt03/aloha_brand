import type { NewsArticle } from "@/types/product";

/**
 * Fake news list — the BE (see `prisma/schema.prisma` `News`) will replace this.
 */
export const news: NewsArticle[] = [
  {
    id: "hsk-3-0-open",
    slug: "khoa-hsk-3-0-khai-giang-thang-11",
    title: "Khai giảng khoá HSK 3.0 chuẩn mới — Tháng 11/2025",
    excerpt:
      "ALOHA triển khai lộ trình HSK 1–3 theo bộ giáo trình HSK 3.0 chuẩn mới nhất, 78 buổi học, cam kết đầu ra HSK 3 + HSKK sơ cấp.",
    content:
      "Chương trình HSK 1–3 mới cập nhật hoàn toàn theo giáo trình HSK 3.0 phát hành 2024. Học viên được test đầu vào, chia lớp theo trình độ và cam kết đầu ra HSK 3 kèm HSKK sơ cấp sau 78 buổi học...",
    coverImage: "/images/news/placeholder.svg",
    category: "Tuyển sinh",
    author: "ALOHA Team",
    publishedAt: "2025-11-05T09:00:00+07:00",
    featured: true,
  },
  {
    id: "topik-victory",
    slug: "hoc-vien-aloha-dat-topik-6",
    title: "5 học viên ALOHA đạt TOPIK 6 trong kỳ thi tháng 10/2025",
    excerpt:
      "Kỳ thi TOPIK II tháng 10 vừa qua ghi nhận 5 học viên khóa Tiếng Hàn Cao cấp của ALOHA đạt band 6 — mức điểm cao nhất.",
    content:
      "Cả 5 bạn đều đến từ các cơ sở ALOHA tại Hà Nội và Hải Dương, hoàn thành 8 tháng lộ trình TOPIK cùng đội ngũ giáo viên bản ngữ...",
    coverImage: "/images/news/placeholder.svg",
    category: "Học viên",
    author: "Phòng Học vụ",
    publishedAt: "2025-10-28T14:30:00+07:00",
  },
  {
    id: "cs-mo-rong",
    slug: "aloha-khai-truong-co-so-hai-phong",
    title: "ALOHA khai trương cơ sở thứ 11 tại Hải Phòng",
    excerpt:
      "Ngày 12/10, ALOHA chính thức đưa vào vận hành cơ sở mới tại Hải Phòng, mở rộng hệ thống toàn miền Bắc.",
    content:
      "Cơ sở mới toạ lạc tại trung tâm quận Ngô Quyền, thiết kế 8 phòng học chuẩn tương tác và 1 studio ghi hình học liệu số...",
    coverImage: "/images/news/placeholder.svg",
    category: "Sự kiện",
    author: "Truyền thông ALOHA",
    publishedAt: "2025-10-12T18:00:00+07:00",
  },
  {
    id: "workshop-jlpt",
    slug: "workshop-luyen-thi-jlpt-mien-phi",
    title: "Workshop miễn phí: Chiến lược luyện thi JLPT N3 – N2",
    excerpt:
      "Workshop 3 tiếng cùng chuyên gia bản ngữ, chia sẻ chiến lược làm bài & tài liệu ôn thi JLPT dành cho các bạn hướng tới N3, N2.",
    content:
      "Workshop diễn ra sáng Chủ nhật 20/11 tại cơ sở CS1 Cầu Giấy, giới hạn 60 bạn. Đăng ký tại form phía dưới hoặc gọi hotline...",
    coverImage: "/images/news/placeholder.svg",
    category: "Sự kiện",
    author: "ALOHA Team",
    publishedAt: "2025-11-01T10:00:00+07:00",
  },
  {
    id: "clb-english",
    slug: "clb-english-thang-11",
    title: "CLB English Speaking Club khởi động chủ đề tháng 11",
    excerpt:
      "CLB tiếng Anh miễn phí mỗi tuần dành cho học viên và cộng đồng, chủ đề tháng 11: “Travel & Culture”.",
    content:
      "CLB tổ chức 4 buổi vào tối thứ Sáu hàng tuần với sự đồng hành của các giáo viên bản ngữ...",
    coverImage: "/images/news/placeholder.svg",
    category: "Cộng đồng",
    author: "ALOHA Team",
    publishedAt: "2025-11-03T19:00:00+07:00",
  },
];
