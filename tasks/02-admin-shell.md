# Task 02 — Admin Shell và UI dùng chung

## Mục tiêu

Tạo layout quản trị thống nhất để các module CRUD sau chỉ cần tập trung vào dữ
liệu và nghiệp vụ.

## Công việc

- [ ] Tạo route group `src/app/admin/(dashboard)` và protected layout.
- [ ] Tạo sidebar responsive, header, profile menu và logout.
- [ ] Tạo dashboard ban đầu với count Course, News, Enrollment, Feedback.
- [ ] Tạo component dùng chung: `DataTable`, `Pagination`, `SearchInput`,
      `StatusBadge`, `ConfirmDialog`, `EmptyState`, `FormError`.
- [ ] Tạo pattern loading/error/not-found cho admin routes.
- [ ] Tạo permission map cho `ADMIN` và `STAFF`.
- [ ] Chuẩn hóa response của Server Action: `success`, `message`,
      `fieldErrors`.
- [ ] Chuẩn hóa toast và confirm trước thao tác xóa.

## Definition of Done

- [ ] Layout hoạt động trên desktop và mobile.
- [ ] Route admin được bảo vệ bằng DAL.
- [ ] Sidebar chỉ hiện module user management cho `ADMIN`.
- [ ] Dashboard không tạo N+1 queries.
- [ ] Loading, empty và error state đều có giao diện.
- [ ] Typecheck và production build thành công.

