# Task 11 — Security, Audit, Testing và Deploy

## Mục tiêu

Hoàn thiện hệ thống trước production và đảm bảo CRUD không rò rỉ dữ liệu hoặc
phá vỡ quan hệ.

## Database và quyền

- [ ] Tạo DB role runtime riêng, không dùng `postgres` trong production.
- [ ] Cấp quyền tối thiểu trên schema `alohadb`, tables và sequences.
- [ ] Giữ `DIRECT_URL` chỉ cho migration/deploy.
- [ ] Kiểm tra mọi foreign key có index phù hợp.
- [ ] Kiểm tra query plans cho list/search chính.
- [ ] Thêm `AuditLog` cho mutation quản trị quan trọng.
- [ ] Không expose `alohadb` qua Data API nếu không sử dụng trực tiếp.

## Testing

- [ ] Unit tests cho Zod schemas và permission helpers.
- [ ] Integration tests cho DAL và Server Actions.
- [ ] Test ADMIN/STAFF/anonymous/inactive user.
- [ ] Test unique slug và translation locale.
- [ ] Test transaction rollback cho Course và News.
- [ ] Test Enrollment endpoint validation và rate limiting.
- [ ] Test upload permission và validation.
- [ ] Test accessibility cơ bản cho form/dialog/table.

## Deploy

- [ ] Dùng `prisma migrate deploy`, không dùng `migrate dev` trên production.
- [ ] Cấu hình toàn bộ environment variables trên hosting.
- [ ] Thêm Supabase redirect URLs cho production domain.
- [ ] Chạy `prisma migrate status`.
- [ ] Chạy typecheck, tests và production build.
- [ ] Smoke test login và CRUD từng module.
- [ ] Reset database password từng xuất hiện trong chat và cập nhật secrets.

## Definition of Done

- [ ] Không có lỗi critical/high trong security review.
- [ ] Mọi action đều có server-side authorization.
- [ ] Runtime không dùng database superuser.
- [ ] Migration deploy lặp lại an toàn.
- [ ] Toàn bộ test và build vượt qua.
- [ ] CRUD production được nghiệm thu theo từng role.
