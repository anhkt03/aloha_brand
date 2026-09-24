import { z } from "zod";
import { LOCALES } from "../constants";

export const taxonomyLocales = LOCALES;
const translationSchema = z.object({ locale: z.enum(taxonomyLocales), name: z.string().trim().min(1).max(160) });

/** Category and level are both just a name translated into every locale. */
export const taxonomySchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  translations: z.array(translationSchema).length(taxonomyLocales.length),
});

export function translationsFromForm(formData: FormData) {
  return taxonomyLocales.map((locale) => ({ locale, name: String(formData.get(`translation-${locale}`) ?? "") }));
}
