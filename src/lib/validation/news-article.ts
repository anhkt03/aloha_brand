import { NewsStatus } from "@prisma/client";
import { z } from "zod";
import { taxonomyLocales } from "./course-taxonomy";

export const newsArticleSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  slug: z.string().trim().min(3).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  coverImage: z.string().url(),
  gallery: z.array(z.string().url()).max(20),
  categoryId: z.coerce.number().int().positive(),
  tagIds: z.array(z.coerce.number().int().positive()).max(30).transform((ids) => [...new Set(ids)]),
  author: z.string().trim().min(2).max(120),
  status: z.nativeEnum(NewsStatus), prominent: z.coerce.boolean(), publishedAt: z.coerce.date(),
  translations: z.array(z.object({ locale: z.enum(taxonomyLocales), title: z.string().trim().min(1), excerpt: z.string().trim().min(1), content: z.string().trim().min(1) })).length(4),
});

export function newsArticleFromForm(formData: FormData) { return { id: formData.get("id") || undefined, slug: formData.get("slug"), coverImage: formData.get("coverImage"), gallery: String(formData.get("gallery") ?? "").split("\n").map(x => x.trim()).filter(Boolean), categoryId: formData.get("categoryId"), tagIds: formData.getAll("tagIds"), author: formData.get("author"), status: formData.get("status"), prominent: formData.get("prominent") === "on", publishedAt: formData.get("publishedAt"), translations: taxonomyLocales.map(locale => ({ locale, title: formData.get(`title-${locale}`), excerpt: formData.get(`excerpt-${locale}`), content: formData.get(`content-${locale}`) })) }; }
