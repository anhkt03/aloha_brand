# Task 05 — News Category và Tags CRUD

## Mục tiêu

CRUD `NewsArticleCategory`, `NewsArticleCategoryTranslation`, `NewsTags` và
`NewsTagsTranslation`.

## Công việc

- [ ] Tạo Zod schemas và DAL.
- [ ] Tạo category list/form với translation tabs.
- [ ] Tạo tag list/form với translation tabs.
- [ ] Hỗ trợ active và sortOrder cho category.
- [ ] Hỗ trợ active cho tags.
- [ ] Upsert translations nguyên tử theo locale.
- [ ] Chặn xóa category đang có article.
- [ ] Khi xóa tag, xử lý relation trong transaction.

## Definition of Done

- [ ] Category và tags CRUD hoạt động.
- [ ] Không có translation locale trùng.
- [ ] Dependency errors có thông báo rõ ràng.
- [ ] Chỉ admin/staff hợp lệ gọi được actions.
- [ ] Typecheck và production build thành công.

