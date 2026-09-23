export function Pagination({ previousHref, nextHref }: { previousHref?: string; nextHref?: string }) {
  if (!previousHref && !nextHref) return null;
  return (
    <nav aria-label="Phân trang" className="flex justify-end gap-2">
      {previousHref ? <a href={previousHref} className="rounded border px-3 py-1.5 text-sm">Trước</a> : null}
      {nextHref ? <a href={nextHref} className="rounded border px-3 py-1.5 text-sm">Sau</a> : null}
    </nav>
  );
}
