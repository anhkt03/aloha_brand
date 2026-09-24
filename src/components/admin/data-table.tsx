import { EmptyState } from "./empty-state";

export function DataTable({
  headers,
  children,
  isEmpty,
  maxHeight,
}: {
  headers: string[];
  children: React.ReactNode;
  isEmpty?: boolean;
  /** CSS height (e.g. "70vh") — when set, the table scrolls inside a fixed-height frame with the header pinned. */
  maxHeight?: string;
}) {
  if (isEmpty) return <EmptyState />;
  return (
    <div className="overflow-auto rounded-md border border-slate-200 bg-white" style={maxHeight ? { height: maxHeight } : undefined}>
      <table className="min-w-full text-left text-sm">
        <thead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-slate-200 bg-slate-50 px-4 py-3" style={maxHeight ? { position: "sticky", top: 0, zIndex: 1 } : undefined}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700 [&_tr]:transition [&_tr:hover]:bg-slate-50">{children}</tbody>
      </table>
    </div>
  );
}
