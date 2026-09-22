# Cấu trúc Database — ALOHA Language School

Tài liệu tham chiếu cho backend. Nguồn chính thức của schema là
[`prisma/schema.prisma`](../prisma/schema.prisma) — file này giải thích ý
nghĩa từng trường và cho ví dụ payload JSON cho FE.

---

## 1. `Course` — Khóa học

| Trường            | Kiểu                | Ràng buộc / mô tả                                                                                             |
| ----------------- | ------------------- | -------------------------------------------------------------------------------------------------------------- |
| `id`              | `String`            | PK, `cuid()`                                                                                                   |
| `slug`            | `String`            | Unique, dùng cho URL — vd `hsk-1-3`                                                                            |
| `title`           | `String`            | Tiêu đề khóa — vd `HSK 1–3 (chuẩn HSK 3.0)`                                                                    |
| `language`        | `enum CourseLanguage` | `EN` \| `ZH` \| `KO` \| `JA`                                                                                 |
| `level`           | `enum CourseLevel`  | `HSK1..6`, `IELTS`, `TOEIC`, `TOPIK1..2`, `JLPT_N5..N1`                                                        |
| `levelLabel`      | `String`            | Nhãn hiển thị — vd `HSK 3`, `IELTS 6.5+`                                                                       |
| `band`            | `String`            | Phân loại — vd `Tiếng Trung · Sơ – Trung cấp`                                                                  |
| `durationMonths`  | `Int`               | Thời lượng theo tháng                                                                                          |
| `totalSessions`   | `Int`               | Tổng số buổi học                                                                                               |
| `target`          | `String`            | Đối tượng — vd `Người mới bắt đầu`                                                                             |
| `outcome`         | `String`            | Cam kết đầu ra — vd `HSK 3, HSKK sơ cấp, có nền tảng giao tiếp và sẵn sàng học HSK 4.`                         |
| `syllabus`        | `String[]`          | Danh sách bullet nội dung học                                                                                  |
| `status`          | `enum CourseStatus` | `OPEN` \| `COMING_SOON` \| `CLOSED`                                                                            |
| `featured`        | `Boolean`           | Hiển thị ưu tiên (homepage / trang danh sách)                                                                  |
| `gradient`        | `String`            | Gradient CSS cho card — vd `linear-gradient(135deg,#d93b3b,#e1ba23)`                                            |
| `glyph`           | `String`            | Ký tự đại diện ngôn ngữ — `EN`, `中`, `한`, `日`                                                                |
| `priceVnd`        | `Int?`              | Học phí (VND). Optional để BE có thể ẩn giá theo chính sách                                                    |
| `discountPercent` | `Int?`              | % ưu đãi (0–100)                                                                                               |
| `startsAt`        | `DateTime?`         | Ngày khai giảng gần nhất                                                                                       |
| `schedule`        | `String?`           | Lịch học — vd `T2-T4-T6 · 18:00 – 20:00`                                                                       |
| `createdAt`       | `DateTime`          | Tự động                                                                                                        |
| `updatedAt`       | `DateTime`          | Tự động                                                                                                        |

**Ví dụ JSON (FE consume):**

```json
{
  "id": "cmr123abc",
  "slug": "hsk-1-3",
  "title": "HSK 1–3 (chuẩn HSK 3.0)",
  "language": "ZH",
  "level": "HSK3",
  "levelLabel": "HSK 3",
  "band": "Tiếng Trung · Sơ – Trung cấp",
  "durationMonths": 8,
  "totalSessions": 78,
  "target": "Người mới bắt đầu",
  "outcome": "HSK 3, HSKK sơ cấp, có nền tảng giao tiếp và sẵn sàng học HSK 4.",
  "syllabus": [
    "Phát âm chuẩn Pinyin",
    "Từ vựng theo chuẩn HSK 3.0",
    "Ngữ pháp cơ bản → trung cấp",
    "Giao tiếp theo chủ đề"
  ],
  "status": "OPEN",
  "featured": true,
  "gradient": "linear-gradient(135deg,#d93b3b,#e1ba23)",
  "glyph": "中",
  "priceVnd": 6800000,
  "discountPercent": 10,
  "startsAt": "2025-11-15T00:00:00+07:00",
  "schedule": "T2-T4-T6 · 18:00 – 20:00"
}
```

---

## 2. `NewsArticle` — Tin tức

| Trường        | Kiểu                | Ràng buộc / mô tả                                        |
| ------------- | ------------------- | -------------------------------------------------------- |
| `id`          | `String`            | PK, `cuid()`                                             |
| `slug`        | `String`            | Unique — dùng cho URL bài viết                           |
| `title`       | `String`            | Tiêu đề bài                                              |
| `excerpt`     | `String`            | Đoạn tóm tắt hiển thị trên card                          |
| `content`     | `String @db.Text`   | Nội dung đầy đủ (Markdown hoặc HTML)                     |
| `coverImage`  | `String`            | URL ảnh bìa                                              |
| `gallery`     | `String[]`          | Ảnh phụ (mặc định `[]`)                                  |
| `category`    | `enum NewsCategory` | `LANGUAGE` \| `ABROAD` \| `ACTIVITY`                     |
| `tags`        | `String[]`          | Nhãn phân loại phụ                                       |
| `author`      | `String`            | Tác giả — vd `ALOHA Team`                                |
| `status`      | `enum NewsStatus`   | `DRAFT` \| `PUBLISHED` \| `ARCHIVED`                     |
| `featured`    | `Boolean`           | Bài nổi bật                                              |
| `viewCount`   | `Int`               | Lượt xem                                                 |
| `publishedAt` | `DateTime`          | Ngày công bố (dùng để sort)                              |
| `createdAt`   | `DateTime`          | Tự động                                                  |
| `updatedAt`   | `DateTime`          | Tự động                                                  |

Section "Tin tức" trên homepage chia làm 3 cột theo `category`:

- `LANGUAGE` — Ngoại ngữ
- `ABROAD` — Du học
- `ACTIVITY` — Hoạt động ALOHA

**Ví dụ JSON:**

```json
{
  "id": "cmr9x8y7",
  "slug": "khai-giang-hsk-3-0-thang-11",
  "title": "Khai giảng khóa HSK 3.0 chuẩn mới — Tháng 11/2025",
  "excerpt": "ALOHA triển khai lộ trình HSK 1–3 theo bộ giáo trình HSK 3.0 chuẩn mới nhất.",
  "content": "## Nội dung\nChương trình HSK 1–3 mới cập nhật hoàn toàn...",
  "coverImage": "/images/news/hsk-open.jpg",
  "gallery": [],
  "category": "LANGUAGE",
  "tags": ["hsk", "tuyển sinh"],
  "author": "ALOHA Team",
  "status": "PUBLISHED",
  "featured": true,
  "viewCount": 1240,
  "publishedAt": "2025-11-05T09:00:00+07:00"
}
```

---

## 3. `Testimonial` — Cảm nhận học viên

| Trường        | Kiểu       | Mô tả                                                                                    |
| ------------- | ---------- | ---------------------------------------------------------------------------------------- |
| `id`          | `String`   | PK                                                                                       |
| `name`        | `String`   | Họ tên học viên                                                                          |
| `course`      | `String`   | Nhãn khóa — `HSK3`, `HSK5`, `IELTS 6.5+`, ...                                            |
| `quote`       | `String`   | Câu chia sẻ                                                                              |
| `image`       | `String`   | URL ảnh score-card                                                                       |
| `scoresJson`  | `Json?`    | Điểm số (schema tùy loại — xem dưới)                                                     |
| `featured`    | `Boolean`  | Ưu tiên hiển thị                                                                         |
| `publishedAt` | `DateTime` | Ngày đăng                                                                                |

**`scoresJson` cho HSK / HSKK:**

```json
{
  "total": 288,
  "max": 300,
  "parts": [
    { "label": "Listening", "score": 100, "max": 100 },
    { "label": "Reading", "score": 98, "max": 100 },
    { "label": "Writing", "score": 90, "max": 100 }
  ]
}
```

**`scoresJson` cho IELTS:**

```json
{
  "overall": 6.5,
  "bands": [
    { "label": "Listening", "score": 7.0 },
    { "label": "Reading", "score": 6.5 },
    { "label": "Writing", "score": 6.0 },
    { "label": "Speaking", "score": 6.0 }
  ]
}
```

---

## 4. `Lead` — Lead từ form đăng ký

Được insert khi user submit modal "Học thử" hoặc form ở trang Liên hệ.

| Trường      | Kiểu        | Mô tả                                                     |
| ----------- | ----------- | --------------------------------------------------------- |
| `name`      | `String`    | Bắt buộc                                                  |
| `phone`     | `String`    | Bắt buộc                                                  |
| `email`     | `String?`   | Optional                                                  |
| `language`  | `String?`   | Ngôn ngữ quan tâm                                         |
| `message`   | `String?`   | Lời nhắn                                                  |
| `source`    | `String?`   | `modal` \| `contact-page` \| `hero`                       |
| `handled`   | `Boolean`   | Đã liên hệ / tư vấn xong                                  |
| `handledAt` | `DateTime?` | Thời điểm xử lý                                           |
| `createdAt` | `DateTime`  | Tự động                                                   |

---

## 5. `Enrollment` — Đăng ký khóa cụ thể

| Trường     | Kiểu                    | Mô tả                                              |
| ---------- | ----------------------- | -------------------------------------------------- |
| `courseId` | `String`                | FK → `Course.id`                                   |
| `name`     | `String`                | Học viên                                           |
| `phone`    | `String`                | Bắt buộc                                           |
| `email`    | `String?`               |                                                    |
| `note`     | `String?`               |                                                    |
| `status`   | `enum EnrollmentStatus` | `PENDING` \| `CONFIRMED` \| `CANCELLED` \| `COMPLETED` |

---

## 6. `Branch` — Cơ sở

| Trường    | Kiểu       | Mô tả                              |
| --------- | ---------- | ---------------------------------- |
| `code`    | `String`   | Unique — vd `CS1`                  |
| `name`    | `String`   | Tên cơ sở — `Cầu Giấy`             |
| `address` | `String`   |                                    |
| `phone`   | `String?`  |                                    |
| `mapUrl`  | `String?`  | Link Google Maps                   |
| `lat`     | `Float?`   |                                    |
| `lng`     | `Float?`   |                                    |
| `active`  | `Boolean`  |                                    |

---

## Migration

```bash
# Generate client
npx prisma generate

# Tạo migration mới sau khi sửa schema
npx prisma migrate dev --name init

# Deploy migration lên môi trường prod
npx prisma migrate deploy
```

## API BE (dự kiến)

Các route Next.js API sẽ được đặt dưới `src/app/api/`:

```
src/app/api/
├── courses/route.ts              GET (list), POST (create)
├── courses/[slug]/route.ts       GET (detail), PATCH, DELETE
├── news/route.ts                 GET, POST
├── news/[slug]/route.ts          GET, PATCH, DELETE
├── testimonials/route.ts         GET, POST
├── leads/route.ts                POST (từ form)
├── enrollments/route.ts          POST
└── branches/route.ts             GET
```
