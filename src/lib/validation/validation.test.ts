import { describe, expect, it } from "vitest";
import { enrollmentSchema, feedbackSchema } from "./enrollment";
import { branchSchema, userSchema } from "./administration";
import { courseSchema } from "./course";
import { newsArticleSchema } from "./news-article";
import { taxonomyLocales } from "./course-taxonomy";
describe("server validation", () => {
  it("rejects invalid enrollment and accepts normalized input", () => { expect(enrollmentSchema.safeParse({ type: "TRIAL", courseId: 1, name: "A", phone: "abc" }).success).toBe(false); expect(enrollmentSchema.safeParse({ type: "REAL", courseId: "1", name: "Nguyen Van A", phone: "0901234567", email: "a@example.com" }).success).toBe(true); });
  it("enforces feedback rating", () => { expect(feedbackSchema.safeParse({ name: "Test", rating: 6, comment: "Good", active: true }).success).toBe(false); });
  it("validates branch coordinates and user password", () => { expect(branchSchema.safeParse({ code: "HN01", name: "Ha Noi", address: "Address", lat: 91, active: true }).success).toBe(false); expect(userSchema.safeParse({ username: "staff_1", name: "Staff One", email: "", role: "STAFF", active: true, password: "password123" }).success).toBe(true); });
  it("requires a category, a level, and every supported course locale", () => {
    const translations = taxonomyLocales.map((locale) => ({ locale, title: "Title", duration: "10 buổi", content: "Content" }));
    const base = { categoryId: 1, levelId: 1, status: "PUBLISHED", translations };
    expect(courseSchema.safeParse(base).success).toBe(true);
    expect(courseSchema.safeParse({ ...base, categoryId: undefined }).success).toBe(false);
    expect(courseSchema.safeParse({ ...base, translations: translations.slice(1) }).success).toBe(false);
  });
  it("parses publish dates as Vietnam time and rejects malformed gallery URLs", () => {
    const translations = taxonomyLocales.map((locale) => ({ locale, title: "Title", content: "Content" }));
    const base = { slug: "article-slug", coverImage: "https://example.com/cover.webp", gallery: [], status: "PUBLISHED", publishedAt: "2026-01-01T10:00", translations };
    const parsed = newsArticleSchema.safeParse(base);
    expect(parsed.success && parsed.data.publishedAt.toISOString()).toBe("2026-01-01T10:00:00.000Z");
    expect(newsArticleSchema.safeParse({ ...base, gallery: ["bad-url"] }).success).toBe(false);
    expect(newsArticleSchema.safeParse({ ...base, translations: translations.slice(1) }).success).toBe(false);
  });
});
