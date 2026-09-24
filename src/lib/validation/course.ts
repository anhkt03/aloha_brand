import { CourseStatus } from "@prisma/client";
import { z } from "zod";
import { taxonomyLocales } from "./course-taxonomy";

export const courseSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  categoryId: z.coerce.number().int().positive(),
  levelId: z.coerce.number().int().positive(),
  status: z.nativeEnum(CourseStatus),
  translations: z
    .array(
      z.object({
        locale: z.enum(taxonomyLocales),
        title: z.string().trim().min(1),
        duration: z.string().trim().min(1),
        content: z.string().trim().min(1),
      }),
    )
    .length(taxonomyLocales.length),
});

export function courseFromForm(formData: FormData) {
  return {
    id: formData.get("id") || undefined,
    categoryId: formData.get("categoryId"),
    levelId: formData.get("levelId"),
    status: formData.get("status"),
    translations: taxonomyLocales.map((locale) => ({
      locale,
      title: formData.get(`title-${locale}`),
      duration: formData.get(`duration-${locale}`),
      content: formData.get(`content-${locale}`),
    })),
  };
}
