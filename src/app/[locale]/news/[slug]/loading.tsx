import { Container } from "@/components/common/Container";

/**
 * Route-level fallback for `/news/[slug]`. Prefetched by `<Link>`, so it
 * shows instantly on click instead of the navigation stalling on the DB
 * fetch — the real article swaps in once ready.
 */
export default function Loading() {
  return (
    <article aria-hidden="true">
      <div className="pagehero">
        <Container>
          <div className="flex gap-2 text-sm text-muted">
            <div className="h-3 w-16 animate-pulse rounded bg-surface-3" />
            <span>/</span>
            <div className="h-3 w-16 animate-pulse rounded bg-surface-3" />
          </div>
          <div className="mt-4 h-10 w-full max-w-2xl animate-pulse rounded bg-surface-3" />
          <div className="mt-2 h-10 w-2/3 max-w-lg animate-pulse rounded bg-surface-3" />
          <div className="mt-4 h-3 w-28 animate-pulse rounded bg-surface-3" />
        </Container>
      </div>
      <Container>
        <div className="section mx-auto max-w-3xl">
          <div className="aspect-video animate-pulse rounded-lg bg-surface-2" />
          <div className="mt-8 flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="h-4 w-full animate-pulse rounded bg-surface-2" />
            ))}
            <div className="h-4 w-2/3 animate-pulse rounded bg-surface-2" />
          </div>
        </div>
      </Container>
    </article>
  );
}
