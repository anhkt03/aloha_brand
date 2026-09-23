import { SkeletonBlock, SkeletonButton, SkeletonChipsPanel, SkeletonFields, SkeletonGalleryPanel, SkeletonHeader, SkeletonImagePanel, SkeletonPanel } from "@/components/admin/skeleton";

export default function Loading() {
  return (
    <>
      <SkeletonHeader />
      <div className="grid gap-5">
        <SkeletonPanel>
          <SkeletonFields count={6} columns={2} />
        </SkeletonPanel>
        <SkeletonImagePanel />
        <SkeletonGalleryPanel />
        <SkeletonChipsPanel />
        <SkeletonPanel>
          <SkeletonBlock className="mb-4 h-4 w-16" />
          <div className="grid gap-3">
            <SkeletonBlock className="h-9 w-full" />
            <SkeletonBlock className="h-9 w-full" />
            <SkeletonBlock className="h-40 w-full" />
          </div>
        </SkeletonPanel>
        <SkeletonButton />
      </div>
    </>
  );
}
