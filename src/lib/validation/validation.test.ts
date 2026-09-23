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
  it("requires normalized slugs and every supported course locale", () => {
    const translations = taxonomyLocales.map((locale) => ({ locale, title: "Title", label: "Label", target: "Target", outcome: "Outcome", syllabus: ["Lesson"] }));
    const base = { slug: "valid-slug", courseTypeId: 1, courseLevelId: 1, durationMonths: 1, totalSessions: 4, status: "OPEN", sortOrder: 0, iconUrl: "", translations };
    expect(courseSchema.safeParse(base).success).toBe(true);
    expect(courseSchema.safeParse({ ...base, slug: "Invalid Slug" }).success).toBe(false);
    expect(courseSchema.safeParse({ ...base, translations: translations.slice(1) }).success).toBe(false);
  });
  it("deduplicates news tags and rejects malformed gallery URLs", () => {
    const translations = taxonomyLocales.map((locale) => ({ locale, title: "Title", excerpt: "Excerpt", content: "Content" }));
    const parsed = newsArticleSchema.safeParse({ slug: "article-slug", coverImage: "https://example.com/cover.webp", gallery: [], categoryId: 1, tagIds: [1, 1, 2], author: "Author", status: "DRAFT", prominent: false, publishedAt: new Date(), translations });
    expect(parsed.success && parsed.data.tagIds).toEqual([1, 2]);
    expect(newsArticleSchema.safeParse({ ...(parsed.success ? parsed.data : {}), gallery: ["bad-url"] }).success).toBe(false);
  });
});
