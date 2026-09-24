import { Container } from "@/components/common/Container";
import { NewsListSkeleton } from "./news-list-skeleton";

/**
 * Route-level fallback for `/news`. Prefetched by `<Link>`, so it shows
 * instantly on click instead of the navigation stalling on the DB fetch —
 * the real page (with the news grid already Suspense-bound) swaps in once
 * ready.
 */
export default function Loading() {
  return (
    <>
      <div className="pagehero" aria-hidden="true">
        <Container>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-muted">
            <div className="h-3 w-16 animate-pulse rounded bg-surface-3" />
            <span>/</span>
            <div className="h-3 w-16 animate-pulse rounded bg-surface-3" />
          </div>
          <div className="mt-3 h-4 w-24 animate-pulse rounded-full bg-surface-3" />
          <div className="mt-3.5 h-10 w-72 max-w-full animate-pulse rounded bg-surface-3" />
          <div className="mt-4 h-4 w-full max-w-md animate-pulse rounded bg-surface-3" />
        </Container>
      </div>
      <Container>
        <div className="section">
          <NewsListSkeleton />
        </div>
      </Container>
    </>
  );
}
