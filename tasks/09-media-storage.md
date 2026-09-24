# Task 09 — Supabase Storage

## Mục tiêu

Upload, thay thế và xóa icon/cover/gallery an toàn.

## Công việc

- [ ] Tạo bucket `aloha-media` và quyết định public/private.
- [ ] Tạo Storage policies chỉ cho admin/staff upload/delete.
- [ ] Tạo server-only upload/delete helpers.
- [ ] Validate MIME type, extension và giới hạn dung lượng.
- [ ] Dùng UUID cho tên object.
- [ ] Tạo `ImageUploader` và gallery manager.
- [ ] Tích hợp Course Type icon, Course icon và News images.
- [ ] Chỉ xóa ảnh cũ sau khi DB update thành công.
- [ ] Có cleanup cho upload thành công nhưng DB transaction thất bại.
- [ ] Cấu hình Next Image remote pattern nếu cần.

## Object path

```text
course-types/{id}/{uuid}.ext
courses/{id}/{uuid}.ext
news/{articleId}/cover/{uuid}.ext
news/{articleId}/gallery/{uuid}.ext
branches/{id}/{uuid}.ext
```

## Definition of Done

- [ ] Upload và preview hoạt động.
- [ ] File sai loại/quá lớn bị từ chối.
- [ ] User không đăng nhập không upload/xóa được.
- [ ] Thay/xóa record không để orphan files theo luồng bình thường.
- [ ] Typecheck và production build thành công.

