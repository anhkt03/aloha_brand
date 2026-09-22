"use client";
export default function Error({ reset }: { reset: () => void }) { return <div><p className="text-red-700">Không thể tải dữ liệu. Vui lòng thử lại.</p><button onClick={reset} className="mt-3 rounded border px-3 py-2 text-sm">Thử lại</button></div>; }
