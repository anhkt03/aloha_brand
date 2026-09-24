# Task 07 — Enrollments và Feedback CRUD

## Mục tiêu

Biến form đăng ký public thành dữ liệu thật và cung cấp màn hình xử lý đăng ký,
feedback trong admin.

## Công việc

- [ ] Tạo public Route Handler `POST /api/enrollments`.
- [ ] Validate name, phone, email, courseId và `TRIAL`/`REAL` bằng Zod.
- [ ] Thêm rate limiting/chống submit lặp cho endpoint public.
- [ ] Nối RegisterModal và contact form với endpoint thật.
- [ ] Tạo admin enrollment list/detail với filters và cursor pagination.
- [ ] Tạo action cập nhật `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`.
- [ ] Tạo Feedback list/create/edit/delete.
- [ ] Validate rating 1–5 cả ứng dụng và database.
- [ ] Quyết định và bổ sung `active`/`published` cho Feedback nếu cần duyệt.
- [ ] Không expose email/phone qua API public.

## Definition of Done

- [ ] Form public tạo đúng Enrollment trong Supabase.
- [ ] Submit lỗi không hiển thị trạng thái thành công giả.
- [ ] Admin lọc và đổi trạng thái enrollment được.
- [ ] Feedback CRUD hoạt động và rating luôn hợp lệ.
- [ ] Public không đọc được danh sách enrollment.
- [ ] Typecheck và production build thành công.

