# ALOHA Admin CRUD — Implementation Roadmap

Thực hiện các task theo đúng thứ tự. Mỗi task chỉ được đánh dấu hoàn thành khi
toàn bộ mục **Definition of Done** đã đạt.

## Thứ tự triển khai

1. [01-auth-foundation.md](./01-auth-foundation.md)
2. [02-admin-shell.md](./02-admin-shell.md)
3. [03-course-taxonomy-crud.md](./03-course-taxonomy-crud.md)
4. [04-courses-crud.md](./04-courses-crud.md)
5. [05-news-taxonomy-crud.md](./05-news-taxonomy-crud.md)
6. [06-news-articles-crud.md](./06-news-articles-crud.md)
7. [07-enrollments-feedback-crud.md](./07-enrollments-feedback-crud.md)
8. [08-branches-users-crud.md](./08-branches-users-crud.md)
9. [09-media-storage.md](./09-media-storage.md)
10. [10-public-data-integration.md](./10-public-data-integration.md)
11. [11-security-testing-deploy.md](./11-security-testing-deploy.md)

## Quy ước chung

- Supabase Auth quản lý mật khẩu và session; không tự lưu password hash.
- Prisma chỉ chạy phía server và truy cập schema PostgreSQL `alohadb`.
- Server Actions/Route Handlers phải kiểm tra session và role ở bên trong.
- Mọi input phải validate bằng Zod ở server.
- Bản ghi cha và translations/tags phải ghi trong cùng transaction.
- Không expose `DATABASE_URL`, `DIRECT_URL` hoặc service-role key ra client.
- Dùng `ADMIN` và `STAFF`; chỉ `ADMIN` được quản lý tài khoản.
- Sau mỗi task chạy `npm run typecheck` và `npm run build`.

## Trạng thái

- [x] Database v2 và migrations ban đầu
- [x] Kết nối Supabase PostgreSQL
- [ ] Task 01–11

