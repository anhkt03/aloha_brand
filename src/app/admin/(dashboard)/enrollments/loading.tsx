import { SkeletonBlock, SkeletonListPage } from "@/components/admin/skeleton";

export default function Loading() {
  return (
    <>
      <SkeletonListPage columns={6} filters={4} createButtons={1} />
      <div className="mt-4 flex items-center justify-between">
        <SkeletonBlock className="h-4 w-36" />
        <SkeletonBlock className="h-8 w-52 rounded-md" />
      </div>
    </>
  );
}
