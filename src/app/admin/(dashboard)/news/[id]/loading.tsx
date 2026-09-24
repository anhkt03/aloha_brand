import { SkeletonBlock, SkeletonButton, SkeletonFields, SkeletonGalleryPanel, SkeletonHeader, SkeletonImagePanel, SkeletonPanel } from "@/components/admin/skeleton";

export default function Loading() {
  return (
    <>
      <SkeletonHeader actions={2} />
      <div className="grid gap-5">
        <SkeletonPanel>
          <SkeletonFields count={3} columns={2} />
        </SkeletonPanel>
        <SkeletonImagePanel />
        <SkeletonGalleryPanel />
        <SkeletonPanel>
          <SkeletonBlock className="mb-4 h-4 w-16" />
          <div className="grid gap-3">
            <SkeletonBlock className="h-9 w-full" />
            <SkeletonBlock className="h-40 w-full" />
          </div>
        </SkeletonPanel>
        <SkeletonButton />
      </div>
    </>
  );
}
