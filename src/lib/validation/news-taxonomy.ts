import { z } from "zod";
import { taxonomyLocales } from "./course-taxonomy";
export const newsTaxonomySchema = z.object({ id: z.coerce.number().int().positive().optional(), sortOrder: z.coerce.number().int().min(0).default(0), iconUrl: z.string().url().optional().or(z.literal("")), translations: z.array(z.object({ locale: z.enum(taxonomyLocales), name: z.string().trim().min(1) })).length(taxonomyLocales.length) });
export function newsTaxonomyFromForm(formData: FormData) { return { id: formData.get("id") || undefined, sortOrder: formData.get("sortOrder"), iconUrl: formData.get("iconUrl"), translations: taxonomyLocales.map(locale => ({ locale, name: formData.get(`translation-${locale}`) })) }; }
