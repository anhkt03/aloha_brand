# Task 08 — Branches và Users CRUD

## Mục tiêu

Quản lý cơ sở và tài khoản quản trị.

## Công việc — Branches

- [ ] Tạo list/form Branch.
- [ ] Validate code unique, name, address, phone, mapUrl, lat/lng.
- [ ] Hỗ trợ active/inactive.
- [ ] Revalidate trang branches public.

## Công việc — Users

- [ ] Chỉ role `ADMIN` được truy cập module.
- [ ] List profile admin/staff và trạng thái active.
- [ ] Tạo user qua Supabase Admin API trong server-only action.
- [ ] Tạo profile `users` cùng transaction/compensation flow.
- [ ] Cập nhật name, role và active.
- [ ] Gửi reset password qua Supabase Auth.
- [ ] Không cho admin tự vô hiệu hóa hoặc hạ role tài khoản cuối cùng.
- [ ] Không xóa cứng auth user theo mặc định; ưu tiên deactivate.

## Definition of Done

- [ ] Branch CRUD hoạt động.
- [ ] ADMIN tạo và quản lý STAFF được.
- [ ] STAFF không gọi được user actions kể cả gọi trực tiếp.
- [ ] Không có password được lưu trong `alohadb`.
- [ ] Typecheck và production build thành công.

