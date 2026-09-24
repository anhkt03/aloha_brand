"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { inputClass } from "./ui";

/**
 * Reads/writes its own `pageSize`/`page` query params via the client-side
 * router — a Server Component can't hand a Client Component a function
 * prop (it isn't serializable across the RSC boundary), so this derives
 * the target URL itself instead of taking a `makeHref` callback.
 */
export function PageSizeSelect({ value, options }: { value: number; options: readonly number[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(size: number) {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", String(size));
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <label className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm text-slate-500">
      Hiển thị
      <select value={value} onChange={(event) => handleChange(Number(event.target.value))} className={`${inputClass} mt-0 w-auto py-1.5`}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      / trang
    </label>
  );
}
