import { Container } from "@/components/common/Container";
import { CoursesListSkeleton } from "./courses-list-skeleton";

/**
 * Route-level fallback for `/ngoaingu`. Prefetched by `<Link>`, so it shows
 * instantly on click instead of the navigation stalling on the DB fetch —
 * the real page (with the course list already Suspense-bound) swaps in once
 * ready.
 */
export default function Loading() {
  return (
    <>
      <div className="relative overflow-hidden bg-surface-2" aria-hidden="true">
        <Container>
          <div className="max-w-xl py-[clamp(48px,9vw,104px)]">
            <div className="h-4 w-32 animate-pulse rounded-full bg-surface-3" />
            <div className="mt-3.5 h-9 w-full max-w-md animate-pulse rounded bg-surface-3" />
            <div className="mt-2 h-9 w-2/3 animate-pulse rounded bg-surface-3" />
            <div className="mt-5 h-4 w-full max-w-sm animate-pulse rounded bg-surface-3" />
            <div className="mt-8 h-11 w-40 animate-pulse rounded-full bg-surface-3" />
          </div>
        </Container>
      </div>
      <Container>
        <div className="section" style={{ paddingTop: 0 }}>
          <div className="mx-auto h-7 w-72 max-w-full animate-pulse rounded bg-surface-2" />
          <div className="mt-10">
            <CoursesListSkeleton />
          </div>
        </div>
      </Container>
    </>
  );
}
