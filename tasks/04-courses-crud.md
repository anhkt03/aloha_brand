# Task 04 — Courses CRUD

## Mục tiêu

Quản lý toàn bộ khóa học và nội dung đa ngôn ngữ.

## Công việc

- [ ] Tạo Zod schema cho Course và CourseTranslation.
- [ ] Tạo danh sách có search, status, Course Type và Course Level filters.
- [ ] Dùng cursor pagination theo `(createdAt, id)` hoặc `id`.
- [ ] Tạo form create/edit với translations.
- [ ] Khi chọn Course Type, chỉ load Course Level thuộc type đó.
- [ ] Validate Course Level thuộc đúng Course Type ở server.
- [ ] Quản lý syllabus dạng danh sách động.
- [ ] Validate giá không âm và discount 0–100.
- [ ] Tạo actions create/update/toggle-status/delete.
- [ ] Ghi Course và translations trong một transaction.
- [ ] Chặn xóa Course đã có Enrollment; dùng trạng thái `CLOSED`.

## Definition of Done

- [ ] CRUD Course hoạt động đầy đủ.
- [ ] Slug unique và lỗi trùng slug hiển thị đúng.
- [ ] Không thể gửi courseLevelId thuộc Course Type khác.
- [ ] Translation được tạo/cập nhật/xóa nguyên tử.
- [ ] Danh sách không có N+1 queries.
- [ ] Typecheck và production build thành công.

