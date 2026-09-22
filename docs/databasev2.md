# Database v2 — Course Type

## `CourseType`

Danh mục loại khóa học dùng chung cho toàn hệ thống. Các thuộc tính không phụ
thuộc ngôn ngữ được lưu tại đây.

```prisma
model CourseType {
  id           Int                     @id @default(autoincrement())
  iconUrl      String?                 // URL ảnh/icon, ví dụ /images/course-types/chinese.svg
  sortOrder    Int                     @default(0)
  active       Boolean                 @default(true)
  createdAt    DateTime                @default(now())
  updatedAt    DateTime                @updatedAt

  courses      Course[]
  levels       CourseLevel[]
  translations CourseTypeTranslation[]
}
```

## `CourseTypeTranslation`

Tên loại khóa học theo từng ngôn ngữ giao diện.

```prisma
model CourseTypeTranslation {
  id           Int        @id @default(autoincrement())
  courseTypeId Int
  locale       String     // vi, en, ko, ja
  name         String

  courseType   CourseType @relation(fields: [courseTypeId], references: [id], onDelete: Cascade)

  @@unique([courseTypeId, locale])
  @@index([locale])
}
```

## `CourseLevel`

Mỗi cấp độ thuộc về một loại khóa học.

```prisma
model CourseLevel {
  id           Int                      @id @default(autoincrement())
  courseTypeId Int
  name         String                   // HSK1, IELTS, TOPIK1, JLPT_N5
  sortOrder    Int                      @default(0)
  active       Boolean                  @default(true)
  createdAt    DateTime                 @default(now())
  updatedAt    DateTime                 @updatedAt

  courseType   CourseType               @relation(fields: [courseTypeId], references: [id], onDelete: Cascade)
  courses      Course[]
  translations CourseLevelTranslation[]

  @@unique([courseTypeId, name])
  @@index([courseTypeId, active])
}
```

## `CourseLevelTranslation`

```prisma
model CourseLevelTranslation {
  id            Int         @id @default(autoincrement())
  courseLevelId Int
  locale        String      // vi, en, ko, ja
  name          String

  courseLevel   CourseLevel @relation(fields: [courseLevelId], references: [id], onDelete: Cascade)

  @@unique([courseLevelId, locale])
  @@index([locale])
}
```

## `Course`

```prisma
model Course {
  id              Int            @id @default(autoincrement())
  slug            String         @unique

  courseTypeId    Int
  courseLevelId   Int
  courseType      CourseType     @relation(fields: [courseTypeId], references: [id])
  courseLevel     CourseLevel    @relation(fields: [courseLevelId], references: [id])

  durationMonths  Int
  totalSessions   Int
  status          CourseStatus   @default(OPEN)
  sortOrder       Int            @default(0)
  iconUrl         String?
  priceVnd        Int?
  discountPercent Int?
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  enrollments     Enrollment[]
  translations    CourseTranslation[]

  @@index([courseTypeId, status])
  @@index([courseLevelId, status])
  @@index([sortOrder, status])
}
```

## `CourseTranslation`

Nội dung hiển thị của khóa học theo từng ngôn ngữ.

```prisma
model CourseTranslation {
  id        Int      @id @default(autoincrement())
  courseId  Int
  locale    String   // vi, en, ko, ja
  title     String
  label     String
  target    String
  outcome   String
  syllabus  String[]
  roadmap   String?  // ví dụ: "12 buổi | 90 phút"

  course    Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@unique([courseId, locale])
  @@index([locale])
}
```

## Thay đổi từ schema cũ

- `Course.id`: `Int @id @default(autoincrement())`.
- `language` thay bằng `courseTypeId` và relation `courseType`.
- `level` thay bằng `courseLevelId` và relation `courseLevel`.
- `title`, `levelLabel` (đổi thành `label`), `target`, `outcome`, `syllabus` và
  `roadmap` được lưu trong `CourseTranslation`.
- Bỏ `band`, `featured`, `glyph`, `startsAt`, `schedule`.
- Thêm `sortOrder`, `iconUrl`, `roadmap`.
- Bỏ hai enum `CourseLanguage` và `CourseLevel`.

---

## `NewsArticleCategory`

```prisma
model NewsArticleCategory {
  id           Int                              @id @default(autoincrement())
  iconUrl      String?
  sortOrder    Int                              @default(0)
  active       Boolean                          @default(true)
  createdAt    DateTime                         @default(now())
  updatedAt    DateTime                         @updatedAt

  articles     NewsArticle[]
  translations NewsArticleCategoryTranslation[]
}
```

## `NewsArticleCategoryTranslation`

```prisma
model NewsArticleCategoryTranslation {
  id         Int                 @id @default(autoincrement())
  categoryId Int
  locale     String              // vi, en, ko, ja
  name       String

  category   NewsArticleCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@unique([categoryId, locale])
  @@index([locale])
}
```

## `NewsTags`

```prisma
model NewsTags {
  id           Int                   @id @default(autoincrement())
  active       Boolean               @default(true)
  createdAt    DateTime              @default(now())
  updatedAt    DateTime              @updatedAt

  articles     NewsArticle[]
  translations NewsTagsTranslation[]
}
```

## `NewsTagsTranslation`

```prisma
model NewsTagsTranslation {
  id        Int      @id @default(autoincrement())
  newsTagId Int
  locale    String   // vi, en, ko, ja
  name      String

  newsTag   NewsTags @relation(fields: [newsTagId], references: [id], onDelete: Cascade)

  @@unique([newsTagId, locale])
  @@index([locale])
}
```

## `NewsArticle`

```prisma
model NewsArticle {
  id          Int                 @id @default(autoincrement())
  slug        String              @unique
  coverImage  String
  gallery     String[]            @default([])
  categoryId  Int
  author      String
  status      NewsStatus          @default(PUBLISHED)
  prominent   Boolean             @default(false)
  viewCount   Int                 @default(0)
  publishedAt DateTime
  createdAt   DateTime            @default(now())
  updatedAt   DateTime            @updatedAt

  category    NewsArticleCategory @relation(fields: [categoryId], references: [id])
  tagLinks    NewsArticleTag[]
  translations NewsArticleTranslation[]

  @@index([categoryId, publishedAt(sort: Desc)])
  @@index([status, publishedAt(sort: Desc)])
  @@index([prominent, status])
}
```

## `NewsArticleTag`

Bảng liên kết nhiều-nhiều giữa bài viết và tag.

```prisma
model NewsArticleTag {
  newsArticleId Int
  newsTagId     Int

  newsArticle   NewsArticle @relation(fields: [newsArticleId], references: [id], onDelete: Cascade)
  newsTag       NewsTags    @relation(fields: [newsTagId], references: [id], onDelete: Cascade)

  @@id([newsArticleId, newsTagId])
  @@index([newsTagId])
}
```

## `NewsArticleTranslation`

```prisma
model NewsArticleTranslation {
  id            Int         @id @default(autoincrement())
  newsArticleId Int
  locale        String      // vi, en, ko, ja
  title         String
  excerpt       String
  content       String      @db.Text

  newsArticle   NewsArticle @relation(fields: [newsArticleId], references: [id], onDelete: Cascade)

  @@unique([newsArticleId, locale])
  @@index([locale])
}
```

## Thay đổi từ schema cũ

- `NewsArticle.id`: `Int @id @default(autoincrement())`.
- `category NewsCategory` thay bằng `categoryId` liên kết đến `NewsArticleCategory`.
- `tags String[]` thay bằng quan hệ nhiều-nhiều với `NewsTags`.
- `featured` đổi thành `prominent`.
- `title`, `excerpt`, `content` được lưu tại `NewsArticleTranslation`.

---

## `Feedback`

```prisma
model Feedback {
  id        Int      @id @default(autoincrement())
  name      String   // họ tên học viên
  rating    Int      // số sao, từ 1 đến 5
  comment   String   @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Thay đổi từ schema cũ

- Đổi `Testimonial` thành `Feedback`.
- Bỏ `course`, `image`, `scoresJson`, `featured`, `publishedAt`.
- Giữ lại họ tên học viên và nội dung đánh giá dưới dạng `name`, `rating`,
  `comment`.

---

## `Enrollment`

Gộp dữ liệu từ `Lead`/`RegisterForm` và đăng ký khóa học. `type` phân biệt
đăng ký học thử với đăng ký khóa học chính thức.

```prisma
enum EnrollmentType {
  TRIAL
  REAL
}

model Enrollment {
  id           Int              @id @default(autoincrement())
  type         EnrollmentType
  courseId     Int
  name         String
  phone        String
  email        String?
  note         String?
  status       EnrollmentStatus @default(PENDING)
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt

  course       Course           @relation(fields: [courseId], references: [id])

  @@index([type, status])
  @@index([courseId, status])
  @@index([createdAt(sort: Desc)])
}
```

## Thay đổi từ schema cũ

- Gộp `Lead`/`RegisterForm` và `Enrollment` cũ vào `Enrollment`.
- Thêm `EnrollmentType`: `TRIAL` (học thử) và `REAL` (đăng ký chính thức).
- Cả `TRIAL` và `REAL` đều lưu `courseId`; `courseType` được suy ra qua
  quan hệ `Course`.

---

## `Branch`

```prisma
model Branch {
  id        Int      @id @default(autoincrement())
  code      String   @unique
  name      String
  address   String
  phone     String?
  mapUrl    String?
  lat       Float?
  lng       Float?
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## `User`

Tài khoản quản trị đăng nhập vào hệ thống.

```prisma
enum UserRole {
  ADMIN
  STAFF
}

model User {
  id           Int      @id @default(autoincrement())
  name         String
  email        String   @unique
  passwordHash String
  role         UserRole @default(STAFF)
  active       Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

`passwordHash` chỉ lưu mật khẩu đã được hash; không lưu password gốc.
