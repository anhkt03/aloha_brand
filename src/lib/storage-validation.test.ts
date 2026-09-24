import { describe, expect, it } from "vitest";
import { MAX_IMAGE_SIZE, validateImageUpload, validateStoragePath } from "./storage-validation";

describe("storage validation", () => {
  it("accepts supported images in an allowed object folder", () => {
    expect(validateImageUpload({ type: "image/webp", size: 1_024 }, "news/12/cover")).toBe("webp");
    expect(validateImageUpload({ type: "image/webp", size: 1_024 }, "news/new/gallery")).toBe("webp");
  });

  it("rejects unsupported, oversized, and unsafe uploads", () => {
    expect(() => validateImageUpload({ type: "application/pdf", size: 10 }, "news/12/cover")).toThrow();
    expect(() => validateImageUpload({ type: "image/png", size: MAX_IMAGE_SIZE + 1 }, "news/12/cover")).toThrow();
    expect(() => validateImageUpload({ type: "image/png", size: 10 }, "../news/12")).toThrow();
    expect(() => validateStoragePath("aloha/../../secret")).toThrow();
    expect(() => validateStoragePath("aloha/5af8fc58-9d35-476b-b50f-a8a6434aa40d")).not.toThrow();
  });
});
