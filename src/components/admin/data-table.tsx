import { EmptyState } from "./empty-state";

export function DataTable({ headers, children, isEmpty }: { headers: string[]; children: React.ReactNode; isEmpty?: boolean }) {
  if (isEmpty) return <EmptyState />;
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600"><tr>{headers.map((header) => <th key={header} className="px-4 py-3 font-semibold">{header}</th>)}</tr></thead>
        <tbody className="divide-y divide-slate-100">{children}</tbody>
      </table>
    </div>
  );
}
