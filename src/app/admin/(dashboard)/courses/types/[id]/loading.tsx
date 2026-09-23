import { SkeletonBlock, SkeletonButton, SkeletonFields, SkeletonHeader, SkeletonImagePanel, SkeletonPanel, SkeletonTranslationGrid } from "@/components/admin/skeleton";

export default function Loading() {
  return (
    <>
      <SkeletonHeader />
      <div className="grid max-w-xl gap-5">
        <SkeletonImagePanel />
        <SkeletonPanel>
          <SkeletonFields count={1} />
        </SkeletonPanel>
        <SkeletonTranslationGrid />
        <SkeletonButton />
      </div>
      <div className="mt-5 flex gap-2">
        <SkeletonBlock className="h-9 w-24 rounded-md" />
        <SkeletonBlock className="h-9 w-24 rounded-md" />
      </div>
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <SkeletonBlock className="h-5 w-24" />
          <SkeletonBlock className="h-9 w-32 rounded-md" />
        </div>
        <div className="grid gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </>
  );
}
