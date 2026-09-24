# Task 06 — News Articles CRUD

## Mục tiêu

CRUD bài viết đa ngôn ngữ, danh mục, tags, trạng thái và gallery.

## Công việc

- [ ] Tạo Zod schema cho article và translations.
- [ ] Tạo list có search, category, status, prominent và date filters.
- [ ] Dùng cursor pagination theo `(publishedAt, id)`.
- [ ] Tạo form create/edit với category và multi-select tags.
- [ ] Tạo translation tabs cho title, excerpt và content.
- [ ] Tạo editor phù hợp cho Markdown hoặc rich text đã chọn.
- [ ] Ghi article, translations và `NewsArticleTag` trong một transaction.
- [ ] Dùng connect/disconnect hoặc replace relation an toàn.
- [ ] Tạo action publish, archive và toggle prominent.
- [ ] Revalidate news list/detail theo locale và slug.

## Definition of Done

- [ ] CRUD và workflow trạng thái hoạt động.
- [ ] Slug unique.
- [ ] Tags không bị lặp trên cùng article.
- [ ] Transaction rollback toàn bộ nếu một translation/tag lỗi.
- [ ] List/detail query không có N+1.
- [ ] Typecheck và production build thành công.

