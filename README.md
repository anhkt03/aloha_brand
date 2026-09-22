# ALOHA Language School

Website chính thức — Next.js 15 (App Router) + TypeScript + TailwindCSS + next-intl.
Frontend và Backend nằm chung một Next.js project. BE dùng API Routes dưới
`src/app/api/*` (viết sau).

## Chạy dev

```bash
npm install
npm run dev
```

Mở http://localhost:3000 (auto redirect sang `/vi`).

## Cấu trúc

```
.
├── src/
│   ├── app/[locale]/         # App Router pages theo locale
│   │   ├── page.tsx          # Trang chủ (10 sections)
│   │   ├── training/         # Đào tạo ngoại ngữ
│   │   ├── global/           # Du học
│   │   ├── about/            # Về ALOHA
│   │   ├── branches/         # Hệ thống cơ sở
│   │   ├── news/[slug]/      # Tin tức + chi tiết
│   │   └── contact/          # Liên hệ
│   ├── app/globals.css       # Design tokens (CSS variables)
│   ├── components/
│   │   ├── common/           # Button, Container, Section, Image
│   │   ├── layout/           # Header, Footer, MobileMenu, RegisterModal, ...
│   │   └── sections/         # 10 sections của homepage
│   ├── data/                 # Fake data (courses/news/testimonials)
│   ├── config/site.ts        # Config website (tên, hotline, socials)
│   ├── lib/                  # constants, utils
│   ├── hooks/
│   ├── i18n/                 # next-intl config + routing
│   └── types/                # TS types (Course, NewsArticle, Testimonial, …)
├── messages/                 # Bản dịch 4 ngôn ngữ (vi/en/ja/ko)
├── prisma/schema.prisma      # DB schema (Course, News, Testimonial, Lead, Enrollment, Branch)
├── docs/database.md          # Tài liệu field DB cho BE
├── public/                   # Assets tĩnh (logo, ảnh testimonial, ảnh news…)
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

## Design tokens

Bảng màu brand nằm ở [`src/app/globals.css`](src/app/globals.css) dưới dạng CSS
variables, mirror trong [`src/lib/constants.ts`](src/lib/constants.ts) và
[`tailwind.config.ts`](tailwind.config.ts).

| Token          | Value     |
| -------------- | --------- |
| `--brand`      | `#469142` |
| `--brand-deep` | `#295326` |
| `--teal`       | `#28b4d2` |
| `--accent`     | `#e1ba23` |

## Đa ngôn ngữ

- 4 ngôn ngữ: `vi` (mặc định), `en`, `ja`, `ko`
- Prefix bắt buộc: `/vi/...`, `/en/...`, `/ja/...`, `/ko/...`
- Nguồn: [`messages/*.json`](messages)

## Backend (sau này)

Đọc [`docs/database.md`](docs/database.md) để biết cấu trúc từng bảng
và ví dụ JSON. Các API route sẽ ở `src/app/api/*` và consume Prisma client:

```bash
# 1. Sửa DATABASE_URL trong .env
# 2. Tạo migration đầu tiên
npx prisma migrate dev --name init
# 3. Generate client
npx prisma generate
```

## Theme sáng / tối

Nút toggle Light → Dark → System (theo hệ thống) ở header. Lựa chọn lưu vào
`localStorage` key `aloha-theme`. Palette dark đã được định nghĩa sẵn trong
`globals.css`.
