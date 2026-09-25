import { EnrollmentStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;
const DEFAULT_PAGE_SIZE = 20;

function parseDay(value?: string): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

// Date-only ISO strings ("YYYY-MM-DD") parse as UTC midnight — matches how
// the rest of the app stores Vietnam wall-clock timestamps as UTC-labeled
// instants (see `formatDate` in `@/lib/utils`). `dateTo` is treated as
// inclusive of the whole day, so the upper bound moves to the next day.
function createdAtRange(dateFrom?: string, dateTo?: string): Prisma.DateTimeFilter | undefined {
  const from = parseDay(dateFrom);
  const to = parseDay(dateTo);
  if (!from && !to) return undefined;
  const range: Prisma.DateTimeFilter = {};
  if (from) range.gte = from;
  if (to) {
    to.setUTCDate(to.getUTCDate() + 1);
    range.lt = to;
  }
  return range;
}

export async function listEnrollments({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  status,
  dateFrom,
  dateTo,
}: {
  page?: number;
  pageSize?: number;
  status?: EnrollmentStatus;
  dateFrom?: string;
  dateTo?: string;
} = {}) {
  const size = PAGE_SIZE_OPTIONS.includes(pageSize as (typeof PAGE_SIZE_OPTIONS)[number]) ? pageSize : DEFAULT_PAGE_SIZE;
  const currentPage = Math.max(1, page);
  const range = createdAtRange(dateFrom, dateTo);
  const where: Prisma.EnrollmentWhereInput = {
    ...(status ? { status } : {}),
    ...(range ? { createdAt: range } : {}),
  };

  const [items, total] = await prisma.$transaction([
    prisma.enrollment.findMany({
      where,
      skip: (currentPage - 1) * size,
      take: size,
      include: {
        course: {
          include: {
            translations: { where: { locale: "vi" } },
            category: { include: { translations: { where: { locale: "vi" } } } },
            level: { include: { translations: { where: { locale: "vi" } } } },
          },
        },
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    }),
    prisma.enrollment.count({ where }),
  ]);

  return { items, total, page: currentPage, pageSize: size, totalPages: Math.max(1, Math.ceil(total / size)) };
}
