import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getCurrentAdmin: vi.fn(),
  uploadImage: vi.fn(),
  deleteImage: vi.fn(),
  writeAuditLog: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ getCurrentAdmin: mocks.getCurrentAdmin }));
vi.mock("@/lib/storage", () => ({ uploadImage: mocks.uploadImage, deleteImage: mocks.deleteImage }));
vi.mock("@/lib/audit", () => ({ writeAuditLog: mocks.writeAuditLog }));

import { ImageValidationError } from "@/lib/storage-validation";
import { DELETE, POST } from "./route";

const admin = { id: 1, username: "admin", name: "Admin", email: null, role: "ADMIN" as const };
const PATH = "aloha/5af8fc58-9d35-476b-b50f-a8a6434aa40d";

function deleteRequest(body: BodyInit) {
  return new NextRequest("http://localhost/api/admin/media", { method: "DELETE", headers: { "content-type": "application/json" }, body });
}

function uploadRequest(fields: Record<string, string | Blob>) {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) form.set(key, value);
  return new NextRequest("http://localhost/api/admin/media", { method: "POST", body: form });
}

describe("/api/admin/media", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    mocks.getCurrentAdmin.mockResolvedValue(admin);
  });

  it("answers anonymous callers with a JSON 401 instead of a redirect", async () => {
    mocks.getCurrentAdmin.mockResolvedValue(null);
    for (const response of [await DELETE(deleteRequest(JSON.stringify({ path: PATH }))), await POST(uploadRequest({}))]) {
      expect(response.status).toBe(401);
      expect(await response.json()).toEqual({ message: expect.stringContaining("đăng nhập") });
    }
    expect(mocks.deleteImage).not.toHaveBeenCalled();
  });

  it("DELETE rejects a malformed body or a missing path with 400", async () => {
    for (const body of ["not json", "{}", JSON.stringify({ path: 5 }), "null"]) {
      const response = await DELETE(deleteRequest(body));
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ message: expect.stringContaining("path") });
    }
    expect(mocks.deleteImage).not.toHaveBeenCalled();
  });

  it("DELETE returns the validation message as 400 and the storage message as 500", async () => {
    mocks.deleteImage.mockRejectedValueOnce(new ImageValidationError("Invalid managed image path."));
    const invalid = await DELETE(deleteRequest(JSON.stringify({ path: "../etc/passwd" })));
    expect(invalid.status).toBe(400);
    expect(await invalid.json()).toEqual({ message: "Invalid managed image path." });

    mocks.deleteImage.mockRejectedValueOnce(new Error("Cloudinary is not configured."));
    const broken = await DELETE(deleteRequest(JSON.stringify({ path: PATH })));
    expect(broken.status).toBe(500);
    expect(await broken.json()).toEqual({ message: "Cloudinary is not configured." });
    expect(mocks.writeAuditLog).not.toHaveBeenCalled();
  });

  it("DELETE removes the image and writes an audit entry", async () => {
    const response = await DELETE(deleteRequest(JSON.stringify({ path: PATH })));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(mocks.deleteImage).toHaveBeenCalledWith(PATH);
    expect(mocks.writeAuditLog).toHaveBeenCalledWith(expect.objectContaining({ action: "DELETE", entityId: PATH }));
  });

  it("POST reports a missing file and upload failures with the real message", async () => {
    const missing = await POST(uploadRequest({ folder: "news/new/cover" }));
    expect(missing.status).toBe(400);
    expect(await missing.json()).toEqual({ message: "Thiếu file." });

    const file = new File(["x"], "a.png", { type: "image/png" });
    mocks.uploadImage.mockRejectedValueOnce(new ImageValidationError("Invalid upload folder."));
    const invalid = await POST(uploadRequest({ file, folder: "nope" }));
    expect(invalid.status).toBe(400);
    expect(await invalid.json()).toEqual({ message: "Invalid upload folder." });

    mocks.uploadImage.mockRejectedValueOnce(new Error("Invalid image file"));
    const failed = await POST(uploadRequest({ file, folder: "news/new/cover" }));
    expect(failed.status).toBe(500);
    expect(await failed.json()).toEqual({ message: "Invalid image file" });
  });
});
