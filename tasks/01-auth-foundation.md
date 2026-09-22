# Task 01 — Supabase Auth Foundation

## Mục tiêu

Đăng nhập/đăng xuất bằng Supabase Auth, liên kết identity với profile quản trị
trong bảng `users`, và cung cấp hàm kiểm tra role dùng cho toàn bộ admin.

## Phụ thuộc

- Supabase project đang hoạt động.
- Có Project URL và Publishable/Anon key.
- Prisma schema `alohadb` đã migrate.

## Công việc

- [ ] Cài `@supabase/supabase-js`, `@supabase/ssr`, `zod`.
- [ ] Thêm `NEXT_PUBLIC_SUPABASE_URL` và
      `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` vào `.env`/`.env.example`.
- [ ] Sửa model `User`: thêm `authUserId String @unique @db.Uuid`, bỏ
      `passwordHash`, thêm index cần thiết và tạo migration.
- [ ] Tạo Supabase browser client và server client trong `src/lib/supabase/`.
- [ ] Ghép refresh auth cookie vào middleware `next-intl` hiện tại.
- [ ] Tạo Prisma singleton tại `src/lib/prisma.ts`.
- [ ] Tạo DAL `getCurrentAdmin`, `requireAdminUser`, `requireRole`.
- [ ] Tạo `/admin/login` với email/password.
- [ ] Tạo Server Action đăng nhập và đăng xuất.
- [ ] Chặn user không có profile hoặc `active = false`.
- [ ] Tạo admin đầu tiên trong Supabase Auth và profile `users` tương ứng.

## Quy tắc bảo mật

- Không dựa riêng vào middleware; mỗi mutation phải gọi `requireAdminUser()`.
- Không trả auth token hoặc dữ liệu nhạy cảm qua props/client component.
- Không dùng service-role key trong browser.
- Không cho tự đăng ký tài khoản admin từ trang public.

## Definition of Done

- [ ] Admin hợp lệ đăng nhập và được chuyển tới `/admin`.
- [ ] Sai mật khẩu hiển thị lỗi chung, không tiết lộ tài khoản có tồn tại.
- [ ] User inactive hoặc thiếu profile bị từ chối.
- [ ] Đăng xuất xóa session và quay lại `/admin/login`.
- [ ] Truy cập trực tiếp URL admin khi chưa login bị chặn.
- [ ] Prisma migration status up to date.
- [ ] Typecheck và production build thành công.

