import { z } from "zod";

export const taxonomyLocales = ["vi", "en", "ko", "ja"] as const;
const translationSchema = z.object({ locale: z.enum(taxonomyLocales), name: z.string().trim().min(1).max(160) });

export const courseTypeSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  iconUrl: z.string().url().optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().min(0).default(0),
  translations: z.array(translationSchema).length(taxonomyLocales.length),
});

export const courseLevelSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  courseTypeId: z.coerce.number().int().positive(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  translations: z.array(translationSchema).length(taxonomyLocales.length),
});

export function translationsFromForm(formData: FormData) {
  return taxonomyLocales.map((locale) => ({ locale, name: String(formData.get(`translation-${locale}`) ?? "") }));
}
