import { SkeletonBlock } from "@/components/admin/skeleton";

export default function Loading() {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <SkeletonBlock className="h-3 w-20" />
          <SkeletonBlock className="mt-2 h-7 w-36" />
        </div>
        <SkeletonBlock className="h-9 w-36 rounded-md" />
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <SkeletonBlock className="h-9 w-64 rounded-md" />
          <SkeletonBlock className="h-9 w-32 rounded-md" />
          <SkeletonBlock className="h-9 w-16 rounded-md" />
        </div>
        <SkeletonBlock className="h-6 w-28 rounded-md" />
      </div>

      <div className="overflow-hidden rounded-md border border-slate-200 bg-white" style={{ height: "70vh" }}>
        <div className="flex gap-6 border-b border-slate-200 bg-slate-50 px-4 py-3.5">
          <SkeletonBlock className="h-3 w-32" />
          <SkeletonBlock className="h-3 w-24" />
          <SkeletonBlock className="h-3 w-16" />
          <SkeletonBlock className="h-3 w-16" />
        </div>
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex items-center gap-6 px-4 py-4">
              <div className="w-1/3"><SkeletonBlock className="h-4 w-full max-w-[200px]" /><SkeletonBlock className="mt-1.5 h-3 w-24" /></div>
              <SkeletonBlock className="h-4 w-20" />
              <SkeletonBlock className="h-5 w-20 rounded-full" />
              <div className="flex gap-1"><SkeletonBlock className="h-8 w-8 rounded-md" /><SkeletonBlock className="h-8 w-8 rounded-md" /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <SkeletonBlock className="h-4 w-36" />
        <SkeletonBlock className="h-8 w-52 rounded-md" />
      </div>
    </>
  );
}
