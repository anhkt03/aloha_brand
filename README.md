# ALOHA Language School

Website chính thức của ALOHA (đào tạo ngoại ngữ và du học) kèm trang quản trị.
Frontend và backend nằm chung một project Next.js.

- **Next.js 16** (App Router, Server Actions) + React 19 + TypeScript
- **Tailwind CSS 3** — design token trong `src/app/globals.css`
- **next-intl 4** — 5 ngôn ngữ: `vi` (mặc định), `en`, `zh`, `ko`, `ja`
- **Prisma 5 + PostgreSQL** (Supabase) — chỉ truy cập từ server
- **Cloudinary** — lưu ảnh tin tức
- **Zod 4** — validate input ở server · **Vitest** — unit test

> Next.js 16 có breaking change so với các phiên bản cũ (ví dụ `middleware` đổi
> tên thành `proxy`, có `updateTag`). Xem `AGENTS.md` và
> `node_modules/next/dist/docs/` trước khi viết code liên quan.

## Chạy dev

```bash
npm install          # tự chạy prisma generate
cp .env.example .env # bỏ dấu # ở các biến cần dùng và điền giá trị (xem bên dưới)
npm run db:migrate   # áp migration vào DATABASE_URL
npm run db:seed-admin
npm run dev
```

Mở http://localhost:3000 (tự chuyển sang `/vi`). Trang quản trị: `/admin`.

### Biến môi trường

| Biến | Bắt buộc | Ghi chú |
| --- | --- | --- |
| `DATABASE_URL` | có | Kết nối pooled dùng lúc chạy |
| `DIRECT_URL` | có | Kết nối trực tiếp, dùng cho `prisma migrate` |
| `AUTH_SESSION_SECRET` | có | Khóa ký cookie session admin (chuỗi ngẫu nhiên ~64 ký tự). Thiếu là app không khởi động |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | khi upload ảnh | Chỉ dùng phía server |
| `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_HOTLINE` | không | Mặc định `http://localhost:3000` / hotline trong `src/config/site.ts` |

Không bao giờ đưa `DATABASE_URL`, `DIRECT_URL` hoặc secret Cloudinary ra client.

### Scripts

| Lệnh | Việc |
| --- | --- |
| `npm run dev` / `build` / `start` | Chạy dev, build, chạy production |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest |
| `npm run lint` | ESLint |
| `npm run db:migrate` / `db:generate` / `db:studio` | Prisma |
| `npm run db:seed-admin` | Tạo tài khoản admin mặc định |
| `npm run smoke:seed` / `smoke:http` | Smoke test với dữ liệu thật (cần `.env`) |

## Cấu trúc

```
src/
├── proxy.ts                  # next-intl routing; bỏ qua /admin
├── app/
│   ├── [locale]/             # Site công khai, theo locale
│   │   ├── page.tsx          # Trang chủ (server, lấy 2 tin mới nhất) → home-content.tsx
│   │   ├── about/            # Về ALOHA
│   │   ├── ngoaingu/         # Đào tạo ngoại ngữ + danh sách khóa học (DB)
│   │   ├── duhocquocte/      # Du học quốc tế
│   │   ├── branches/         # Hệ thống cơ sở
│   │   ├── news/[slug]/      # Tin tức + chi tiết (DB)
│   │   └── contact/
│   ├── admin/                # Trang quản trị (không có prefix locale)
│   │   ├── login/
│   │   └── (dashboard)/      # courses, news, enrollments, feedback, branches, users
│   └── api/
│       ├── enrollments/      # GET danh sách khóa học, POST đăng ký (public, có rate limit)
│       └── admin/            # media (upload/xóa ảnh), enrollments/export (xlsx)
├── components/               # common, layout, sections, about, training, global, branches, admin
├── lib/
│   ├── dal/                  # Truy vấn: public-data.ts (có cache) + các DAL cho admin
│   ├── validation/           # Schema Zod
│   ├── auth.ts, session.ts, password.ts, permissions.ts   # Auth admin
│   ├── storage.ts, storage-validation.ts                  # Cloudinary
│   ├── audit.ts, rate-limit.ts, prisma.ts
├── data/                     # Nội dung marketing cố định (giảng viên, học bổng, cơ sở, ...)
├── i18n/                     # routing + request config của next-intl
└── hooks/, config/, types/
messages/                     # Bản dịch vi/en/zh/ko/ja
prisma/                       # schema.prisma + migrations
scripts/                      # seed admin, smoke test
tasks/                        # Roadmap triển khai admin (01–11)
docs/                         # deploy.md, ghi chú database
```

## Dữ liệu và cache

Nguồn sự thật của schema là [`prisma/schema.prisma`](prisma/schema.prisma)
(`docs/database*.md` là ghi chú cũ, có thể lệch).

- Nội dung đa ngôn ngữ nằm ở các bảng `*Translation` (unique theo `id + locale`).
  Nếu thiếu bản dịch thì fallback sang `vi`.
- Trang công khai đọc DB qua `src/lib/dal/public-data.ts`, bọc `unstable_cache` với
  tag `courses` / `news` / `feedback` / `branches` (hết hạn sau 300 giây).
- **Quy ước khi sửa dữ liệu trong admin:** Server Action phải gọi
  `updateTag("<tag>")` cho tag tương ứng để trang công khai thấy thay đổi ngay.
  `revalidatePath` một mình **không** xóa được cache của `unstable_cache`.
  Các trang công khai dùng DB đều là `force-dynamic`, nên chỉ cần tag.
- Ghi bản ghi cha và translations trong cùng một transaction, kèm `AuditLog`.

## Trang quản trị

- Đăng nhập bằng username/mật khẩu (hash `scrypt`), session là cookie
  `aloha_admin_session` ký HMAC, sống 8 giờ. **Không** dùng Supabase Auth.
- Hai role: `ADMIN` và `STAFF`; chỉ `ADMIN` được quản lý tài khoản.
- Server Action / Route Handler phải tự kiểm tra session và role bên trong.
- API `/api/admin/media` trả JSON `401` khi hết phiên (không redirect) và trả lỗi dạng `{ "message": "..." }` với status đúng
  (`400` dữ liệu không hợp lệ, `401` hết phiên, `500` lỗi máy chủ/Cloudinary);
  xem message thật ở DevTools → Network.

## Đa ngôn ngữ

- Prefix bắt buộc: `/vi/...`, `/en/...`, `/zh/...`, `/ko/...`, `/ja/...`
- Bản dịch UI: [`messages/*.json`](messages). Dùng `Link`, `useRouter`,
  `usePathname` từ `@/i18n/routing` để giữ locale khi điều hướng.

## Design tokens

Bảng màu brand ở [`src/app/globals.css`](src/app/globals.css) dưới dạng CSS variables,
mirror trong [`src/lib/constants.ts`](src/lib/constants.ts) và
[`tailwind.config.ts`](tailwind.config.ts).

| Token          | Value     |
| -------------- | --------- |
| `--brand`      | `#469142` |
| `--brand-deep` | `#295326` |
| `--teal`       | `#28b4d2` |
| `--accent`     | `#e1ba23` |

Theme Sáng / Tối / Hệ thống lưu ở `localStorage` key `aloha-theme`.

## Triển khai

Xem [`docs/deploy.md`](docs/deploy.md). Trước khi release chạy
`npm test`, `npm run typecheck`, `npm run build`.

## TODO

- [ ] **Rate limit đăng nhập admin** (`src/app/admin/actions.ts` chưa giới hạn số lần thử).
- [ ] **Rate limit đăng ký `/api/enrollments` dùng store dùng chung** (Redis/DB).
      Hiện `FixedWindowRateLimiter` chỉ nằm trong bộ nhớ từng instance và tin header
      `x-forwarded-for`, nên không chặn được spam khi chạy nhiều instance.
- [ ] Bỏ mật khẩu cố định trong `scripts/seed-default-admin.mjs` (đọc từ env hoặc sinh ngẫu nhiên).
- [ ] Dọn phần Supabase Auth cũ: `src/lib/supabase/*` và 2 gói `@supabase/*` không còn được import;
      cập nhật lại `tasks/README.md` cho khớp (đang ghi "Supabase Auth quản lý mật khẩu").
- [ ] Trang công khai vẫn dùng dữ liệu tĩnh trong `src/data/` cho cơ sở và đánh giá học viên;
      `getPublicBranches` / `getPublicFeedback` đã có nhưng chưa được dùng.
- [ ] Cập nhật hoặc xóa `docs/database.md`, `docs/databasev2.md` cho khớp `schema.prisma`.
