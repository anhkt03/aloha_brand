export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
export const IMAGE_EXTENSIONS: Readonly<Record<string, string>> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};

export function validateImageUpload(file: Pick<File, "type" | "size">, folder: string) {
  const extension = IMAGE_EXTENSIONS[file.type];
  if (!extension) throw new Error("Định dạng ảnh không được hỗ trợ.");
  if (file.size > MAX_IMAGE_SIZE) throw new Error("Ảnh vượt quá giới hạn 5MB.");
  if (!/^(course-types|courses|news|branches)\/\d+(\/(cover|gallery))?$/.test(folder)) {
    throw new Error("Đường dẫn upload không hợp lệ.");
  }
  return extension;
}

export function validateStoragePath(path: string) {
  if (path.includes("..") || path.startsWith("/") || !/^(course-types|courses|news|branches)\/\d+\//.test(path)) {
    throw new Error("Đường dẫn ảnh không hợp lệ.");
  }
}
