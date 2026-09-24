/** Placeholder shown while `NewsListSection` awaits the database — mirrors the featured + grid layout. */
export function NewsListSkeleton() {
  return (
    <div className="flex flex-col gap-10" aria-hidden="true">
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm md:grid md:grid-cols-2">
        <div className="aspect-[16/10] animate-pulse bg-surface-2 md:aspect-auto md:h-full" />
        <div className="flex flex-col gap-3 p-6 md:p-9">
          <div className="h-5 w-24 animate-pulse rounded-full bg-surface-2" />
          <div className="h-7 w-full animate-pulse rounded bg-surface-2" />
          <div className="h-3 w-20 animate-pulse rounded bg-surface-2" />
          <div className="flex flex-col gap-2 pt-1">
            <div className="h-3 w-full animate-pulse rounded bg-surface-2" />
            <div className="h-3 w-full animate-pulse rounded bg-surface-2" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-surface-2" />
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, idx) => (
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
    </div>
  );
}
