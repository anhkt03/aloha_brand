/** Placeholder cards shown while `NewsListSection` awaits the database. */
export function NewsListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
          <div className="aspect-[16/10] animate-pulse bg-surface-2" />
          <div className="flex flex-1 flex-col gap-2 p-5">
            <div className="h-3 w-24 animate-pulse rounded bg-surface-2" />
            <div className="h-5 w-full animate-pulse rounded bg-surface-2" />
            <div className="mt-1 flex flex-col gap-2">
              <div className="h-3 w-full animate-pulse rounded bg-surface-2" />
              <div className="h-3 w-full animate-pulse rounded bg-surface-2" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-surface-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
