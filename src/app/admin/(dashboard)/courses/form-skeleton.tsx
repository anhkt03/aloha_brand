import { SkeletonBlock, SkeletonPanel } from "@/components/admin/skeleton";

export function CourseFormSkeleton({ actions = false }: { actions?: boolean }) {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <SkeletonBlock className="h-3 w-20" />
          <SkeletonBlock className="mt-2 h-7 w-52" />
        </div>
        {actions ? (
          <div className="flex gap-2">
            <SkeletonBlock className="h-9 w-28 rounded-md" />
            <SkeletonBlock className="h-9 w-16 rounded-md" />
          </div>
        ) : null}
      </div>

      <div className="grid gap-5">
        <SkeletonPanel>
          <SkeletonBlock className="mb-4 h-4 w-32" />
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <SkeletonBlock className="h-3 w-24" />
                <SkeletonBlock className="mt-2 h-9 w-full" />
              </div>
            ))}
          </div>
        </SkeletonPanel>

        <SkeletonPanel>
          <SkeletonBlock className="mb-4 h-4 w-44" />
          <div className="flex gap-1.5 border-b border-slate-200 pb-2.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonBlock key={index} className="h-7 w-16" />
            ))}
          </div>
          <div className="mt-4 grid gap-3">
            <SkeletonBlock className="h-9 w-full" />
            <SkeletonBlock className="h-9 w-full" />
            <SkeletonBlock className="h-32 w-full" />
          </div>
        </SkeletonPanel>

        <SkeletonBlock className="h-10 w-36 justify-self-start rounded-md" />
      </div>
    </>
  );
}
