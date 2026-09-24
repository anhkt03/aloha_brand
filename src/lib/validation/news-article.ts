import { NewsStatus } from "@prisma/client";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import { parseLocalDateTime } from "@/lib/utils";
import { taxonomyLocales } from "./course-taxonomy";

/** A brand-new article has no id yet, so its cover can't be uploaded to `news/{id}/cover/` — fall back until the first save gives it one. */
const DEFAULT_COVER_IMAGE = `${siteConfig.url}/images/news/placeholder.svg`;

export const newsArticleSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  slug: z.string().trim().min(3).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  coverImage: z.string().url(),
  gallery: z.array(z.string().url()).max(20),
  status: z.nativeEnum(NewsStatus),
  publishedAt: z.string().min(1).transform(parseLocalDateTime),
  translations: z
    .array(
      z.object({
        locale: z.enum(taxonomyLocales),
        title: z.string().trim().min(1),
        content: z.string().trim().min(1),
      }),
    )
    .length(taxonomyLocales.length),
});

export function newsArticleFromForm(formData: FormData) {
  return {
    id: formData.get("id") || undefined,
    slug: formData.get("slug"),
    coverImage: formData.get("coverImage") || DEFAULT_COVER_IMAGE,
    gallery: String(formData.get("gallery") ?? "")
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean),
    status: formData.get("status"),
    publishedAt: formData.get("publishedAt"),
    translations: taxonomyLocales.map((locale) => ({
      locale,
      title: formData.get(`title-${locale}`),
      content: formData.get(`content-${locale}`),
    })),
  };
}
