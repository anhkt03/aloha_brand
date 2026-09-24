import "server-only";

import { createHash, randomUUID } from "crypto";
import { validateImageUpload, validateStoragePath } from "@/lib/storage-validation";

const CLOUDINARY_FOLDER = "aloha";

type CloudinaryConfig = { cloudName: string; apiKey: string; apiSecret: string };

function cloudinaryConfig(): CloudinaryConfig {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) throw new Error("Cloudinary is not configured.");
  return { cloudName, apiKey, apiSecret };
}

function signature(params: Record<string, string>, apiSecret: string) {
  const value = Object.entries(params).sort(([left], [right]) => left.localeCompare(right)).map(([key, param]) => `${key}=${param}`).join("&");
  return createHash("sha1").update(`${value}${apiSecret}`).digest("hex");
}

async function cloudinaryRequest(url: string, body: FormData) {
  const response = await fetch(url, { method: "POST", body });
  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data && typeof data === "object" && "error" in data && data.error && typeof data.error === "object" && "message" in data.error ? String(data.error.message) : "Cloudinary could not process the image.";
    throw new Error(message);
  }
  return data;
}

export async function uploadImage(file: File, folder: string) {
  validateImageUpload(file, folder);
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig();
  const timestamp = String(Math.floor(Date.now() / 1_000));
  const publicId = randomUUID();
  const signingParams = { folder: CLOUDINARY_FOLDER, public_id: publicId, timestamp };
  const body = new FormData();
  body.set("file", file);
  body.set("api_key", apiKey);
  body.set("folder", CLOUDINARY_FOLDER);
  body.set("public_id", publicId);
  body.set("timestamp", timestamp);
  body.set("signature", signature(signingParams, apiSecret));

  const uploaded = await cloudinaryRequest(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, body);
  if (!uploaded || typeof uploaded !== "object" || !("public_id" in uploaded) || !("secure_url" in uploaded)) throw new Error("Cloudinary returned invalid image data.");
  const path = String(uploaded.public_id);
  validateStoragePath(path);
  return { path, url: String(uploaded.secure_url) };
}

export async function deleteImage(path: string) {
  validateStoragePath(path);
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig();
  const timestamp = String(Math.floor(Date.now() / 1_000));
  const body = new FormData();
  body.set("api_key", apiKey);
  body.set("public_id", path);
  body.set("timestamp", timestamp);
  body.set("signature", signature({ public_id: path, timestamp }, apiSecret));
  await cloudinaryRequest(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, body);
}

export function storagePathFromUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.hostname !== "res.cloudinary.com") return null;
    const marker = "/image/upload/";
    const index = parsed.pathname.indexOf(marker);
    if (index < 0) return null;
    const pathname = decodeURIComponent(parsed.pathname.slice(index + marker.length));
    const path = pathname.replace(/^v\d+\//, "").replace(/\.[a-z0-9]+$/i, "");
    validateStoragePath(path);
    return path;
  } catch {
    return null;
  }
}

export async function deleteManagedImages(urls: Iterable<string>) {
  const paths = [...new Set(Array.from(urls, storagePathFromUrl).filter((path): path is string => Boolean(path)))];
  await Promise.allSettled(paths.map(deleteImage));
}
