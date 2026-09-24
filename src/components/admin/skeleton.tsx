import { cn } from "@/lib/utils";

export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-slate-200", className)} />;
}

export function SkeletonHeader({ actions = 0 }: { actions?: number }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <SkeletonBlock className="h-3 w-20" />
        <SkeletonBlock className="mt-2 h-7 w-44" />
      </div>
      {actions > 0 ? (
        <div className="flex gap-2">
          {Array.from({ length: actions }).map((_, index) => (
            <SkeletonBlock key={index} className="h-9 w-28 rounded-md" />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function SkeletonPanel({ bordered = true, className, children }: { bordered?: boolean; className?: string; children: React.ReactNode }) {
  return <div className={cn(bordered && "rounded-xl border border-slate-200 bg-white p-5 shadow-sm", className)}>{children}</div>;
}

export function SkeletonFields({ count, columns = 1 }: { count: number; columns?: 1 | 2 }) {
  return (
    <div className={cn("grid gap-4", columns === 2 && "md:grid-cols-2")}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          <SkeletonBlock className="h-3 w-24" />
          <SkeletonBlock className="mt-2 h-9 w-full" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonTranslationGrid({ count = 5 }: { count?: number }) {
  return (
    <SkeletonPanel>
      <SkeletonBlock className="mb-4 h-4 w-24" />
      <SkeletonFields count={count} columns={2} />
    </SkeletonPanel>
  );
}

export function SkeletonImagePanel() {
  return (
    <SkeletonPanel>
      <SkeletonBlock className="mb-4 h-4 w-24" />
      <SkeletonBlock className="h-32 w-48 rounded-lg" />
    </SkeletonPanel>
  );
}

export function SkeletonGalleryPanel() {
  return (
    <SkeletonPanel>
      <SkeletonBlock className="mb-4 h-4 w-32" />
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonBlock key={index} className="h-24 w-36 rounded-lg" />
        ))}
      </div>
    </SkeletonPanel>
  );
}

export function SkeletonChipsPanel({ count = 6 }: { count?: number }) {
  return (
    <SkeletonPanel>
      <SkeletonBlock className="mb-4 h-4 w-16" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonBlock key={index} className="h-7 w-20 rounded-full" />
        ))}
      </div>
    </SkeletonPanel>
  );
}

export function SkeletonButton() {
  return <SkeletonBlock className="h-10 w-36 justify-self-start rounded-md" />;
}

/** Header + optional filter row + a bordered table with `columns` × `rows` cells, mirroring DataTable. */
export function SkeletonListPage({
  columns,
  rows = 8,
  filters = 0,
  createButtons = 1,
  loadMore = false,
}: {
  columns: number;
  rows?: number;
  filters?: number;
  createButtons?: number;
  loadMore?: boolean;
}) {
  return (
    <>
      <SkeletonHeader actions={createButtons} />
      {filters > 0 ? (
        <div className="mb-5 flex flex-wrap gap-2">
          {Array.from({ length: filters }).map((_, index) => (
            <SkeletonBlock key={index} className="h-10 w-44 rounded-xl" />
          ))}
        </div>
      ) : null}
      <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
        <div className="flex gap-8 border-b border-slate-200 bg-slate-50 px-4 py-3.5">
          {Array.from({ length: columns }).map((_, index) => (
            <SkeletonBlock key={index} className="h-3 w-20" />
          ))}
        </div>
        <div className="divide-y divide-slate-100">
          {Array.from({ length: rows }).map((_, row) => (
            <div key={row} className="flex items-center gap-8 px-4 py-4">
              {Array.from({ length: columns }).map((_, col) => (
                <SkeletonBlock key={col} className="h-4 w-20" />
              ))}
            </div>
          ))}
        </div>
      </div>
      {loadMore ? <SkeletonBlock className="mt-5 h-9 w-28 rounded-md" /> : null}
    </>
  );
}

/**
 * Header + a field panel (optionally preceded by an image panel and
 * followed by a translations panel) + save button, mirroring the plain
 * one-off admin forms (branches, feedback, users, course/news taxonomy).
 * `belowActions` draws the toggle/delete row these forms render under
 * the form itself, rather than in the header.
 */
export function SimpleFormSkeleton({
  fields,
  columns = 1,
  bordered = true,
  image = false,
  translations = false,
  belowActions = 0,
}: {
  fields: number;
  columns?: 1 | 2;
  bordered?: boolean;
  image?: boolean;
  translations?: boolean;
  belowActions?: number;
}) {
  return (
    <>
      <SkeletonHeader />
      <div className="grid max-w-xl gap-5">
        {image ? <SkeletonImagePanel /> : null}
        <SkeletonPanel bordered={bordered}>
          <SkeletonFields count={fields} columns={columns} />
        </SkeletonPanel>
        {translations ? <SkeletonTranslationGrid /> : null}
        <SkeletonButton />
      </div>
      {belowActions > 0 ? (
        <div className="mt-5 flex gap-2">
          {Array.from({ length: belowActions }).map((_, index) => (
            <SkeletonBlock key={index} className="h-9 w-24 rounded-md" />
          ))}
        </div>
      ) : null}
    </>
  );
}
