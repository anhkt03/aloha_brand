"use client";

import { Button } from "@/components/admin/ui";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6">
      <p className="text-sm font-semibold text-red-700">Không thể tải dữ liệu. Vui lòng thử lại.</p>
      <Button onClick={reset} variant="ghost" className="mt-3">Thử lại</Button>
    </div>
  );
}
