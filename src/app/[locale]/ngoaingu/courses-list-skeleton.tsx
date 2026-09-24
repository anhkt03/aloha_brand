/** Placeholder cards shown while `CoursesListSection` awaits the database. */
export function CoursesListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
          <div className="h-[86px] animate-pulse bg-surface-2" />
          <div className="flex flex-1 flex-col gap-3 p-6">
            <div className="h-5 w-3/4 animate-pulse rounded bg-surface-2" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-surface-2" />
            <div className="flex flex-col gap-2 pt-1">
              <div className="h-3 w-full animate-pulse rounded bg-surface-2" />
              <div className="h-3 w-full animate-pulse rounded bg-surface-2" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-surface-2" />
            </div>
            <div className="mt-auto pt-3">
              <div className="h-9 w-24 animate-pulse rounded-full bg-surface-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
