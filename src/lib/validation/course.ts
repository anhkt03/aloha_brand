import { CourseStatus } from "@prisma/client";
import { z } from "zod";
import { taxonomyLocales } from "./course-taxonomy";

export const courseSchema = z.object({
  id: z.coerce.number().int().positive().optional(), slug: z.string().trim().min(3).max(140).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  courseTypeId: z.coerce.number().int().positive(), courseLevelId: z.coerce.number().int().positive(), durationMonths: z.coerce.number().int().positive(), totalSessions: z.coerce.number().int().positive(),
  status: z.nativeEnum(CourseStatus), sortOrder: z.coerce.number().int().min(0), priceVnd: z.coerce.number().int().min(0).optional(), discountPercent: z.coerce.number().int().min(0).max(100).optional(), iconUrl: z.string().url().optional().or(z.literal("")),
  translations: z.array(z.object({ locale: z.enum(taxonomyLocales), title: z.string().trim().min(1), label: z.string().trim().min(1), target: z.string().trim().min(1), outcome: z.string().trim().min(1), syllabus: z.array(z.string().trim().min(1)).min(1), roadmap: z.string().trim().optional() })).length(taxonomyLocales.length),
});

export function courseFromForm(formData: FormData) { return { id: formData.get("id") || undefined, slug: formData.get("slug"), courseTypeId: formData.get("courseTypeId"), courseLevelId: formData.get("courseLevelId"), durationMonths: formData.get("durationMonths"), totalSessions: formData.get("totalSessions"), status: formData.get("status"), sortOrder: formData.get("sortOrder"), priceVnd: formData.get("priceVnd") || undefined, discountPercent: formData.get("discountPercent") || undefined, iconUrl: formData.get("iconUrl"), translations: taxonomyLocales.map(locale => ({ locale, title: formData.get(`title-${locale}`), label: formData.get(`label-${locale}`), target: formData.get(`target-${locale}`), outcome: formData.get(`outcome-${locale}`), syllabus: String(formData.get(`syllabus-${locale}`) ?? "").split("\n").filter(Boolean), roadmap: String(formData.get(`roadmap-${locale}`) ?? "") || undefined })) }; }
