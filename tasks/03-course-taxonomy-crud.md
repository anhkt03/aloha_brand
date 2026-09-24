# Task 03 — Course Type và Course Level CRUD

## Mục tiêu

CRUD đầy đủ `CourseType`, `CourseTypeTranslation`, `CourseLevel` và
`CourseLevelTranslation`.

## Công việc

- [ ] Tạo Zod schemas cho type, level và translations.
- [ ] Tạo DAL list/detail với filter `active`, search và sortOrder.
- [ ] Tạo Server Actions create/update/delete/toggle-active.
- [ ] Tạo trang danh sách và form Course Type.
- [ ] Tạo trang danh sách và form Course Level theo Course Type.
- [ ] Tạo `TranslationTabs` cho `vi`, `en`, `ko`, `ja`.
- [ ] Ghi parent và translations bằng nested write/transaction.
- [ ] Dùng upsert theo unique `[parentId, locale]`.
- [ ] Chặn xóa type đang có levels/courses.
- [ ] Chặn xóa level đang có courses.
- [ ] Revalidate admin và trang public liên quan sau mutation.

## Definition of Done

- [ ] CRUD và toggle active hoạt động cho cả hai module.
- [ ] Không tạo được hai translation cùng locale.
- [ ] Course Level luôn thuộc đúng Course Type.
- [ ] Xóa bản ghi có dependency trả lỗi dễ hiểu.
- [ ] Danh sách sắp xếp đúng theo `sortOrder`.
- [ ] Typecheck và production build thành công.

