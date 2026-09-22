# Task 10 — Nối frontend public với database

## Mục tiêu

Loại bỏ dữ liệu giả và đọc dữ liệu thật từ Supabase qua Prisma server DAL.

## Công việc

- [ ] Tạo public DAL/DTO cho Course, News, Feedback và Branch.
- [ ] Query translation theo locale hiện tại, fallback về `vi`.
- [ ] Thay `src/data/products.ts` bằng Course queries.
- [ ] Thay `src/data/news.ts` bằng News queries.
- [ ] Thay `src/data/testimonials.ts` bằng Feedback queries.
- [ ] Thay branch constants bằng Branch queries.
- [ ] Chỉ hiển thị record active/published/open phù hợp.
- [ ] Tạo loading, empty và database error states.
- [ ] Thiết lập caching/revalidation phù hợp.
- [ ] Không tạo internal HTTP fetch từ Server Component về chính app.
- [ ] Xóa fake data/import không còn sử dụng.

## Definition of Done

- [ ] Homepage và các trang detail dùng dữ liệu database.
- [ ] Đổi locale trả đúng translation hoặc fallback `vi`.
- [ ] Admin update được phản ánh trên public sau revalidation.
- [ ] Không còn fake data trong luồng production.
- [ ] Typecheck và production build thành công.

