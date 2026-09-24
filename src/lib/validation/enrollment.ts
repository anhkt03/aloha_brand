import { EnrollmentType } from "@prisma/client";
import { z } from "zod";
export const enrollmentSchema = z.object({ type: z.nativeEnum(EnrollmentType), courseId: z.coerce.number().int().positive(), name: z.string().trim().min(2).max(120), phone: z.string().trim().regex(/^[+0-9][0-9 .()-]{7,19}$/), email: z.string().trim().email().optional().or(z.literal("")), note: z.string().trim().max(2000).optional() });
export const feedbackSchema = z.object({ id: z.coerce.number().int().positive().optional(), name: z.string().trim().min(2).max(120), rating: z.coerce.number().int().min(1).max(5), comment: z.string().trim().min(3).max(3000), active: z.coerce.boolean() });
