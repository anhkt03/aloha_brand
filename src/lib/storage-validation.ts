export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
export const IMAGE_EXTENSIONS: Readonly<Record<string, string>> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};

export class ImageValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageValidationError";
  }
}

export function validateImageUpload(file: Pick<File, "type" | "size">, folder: string) {
  const extension = IMAGE_EXTENSIONS[file.type];
  if (!extension) throw new ImageValidationError("Unsupported image format.");
  if (file.size > MAX_IMAGE_SIZE) throw new ImageValidationError("Image exceeds the 5MB limit.");
  if (!/^news\/(?:\d+|new)\/(cover|gallery)$/.test(folder)) throw new ImageValidationError("Invalid upload folder.");
  return extension;
}

export function validateStoragePath(path: string) {
  if (path.includes("..") || path.startsWith("/") || !/^aloha\/[a-f0-9-]{36}$/i.test(path)) {
    throw new ImageValidationError("Invalid managed image path.");
  }
}
