"use client";

import Image from "next/image";
import { useState } from "react";
import { branches, branchMapUrl, type Branch } from "@/data/branches";

/**
 * Vietnam map with clickable branch pins.
 *
 * Base map is the flag-styled silhouette at
 * `public/images/branches/vietnam-map.jpg` (aspect 11:20). Pin coordinates
 * are `x` / `y` percentages of the same image, stored in
 * `src/data/branches.ts`.
 */
export function VietnamMap({
  onSelect,
  selectedCode,
}: {
  onSelect?: (branch: Branch) => void;
  selectedCode?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-line bg-white p-3 shadow-sm"
      style={{ aspectRatio: "11 / 20" }}
    >
      <div className="relative h-full w-full">
        <Image
          src="/images/branches/vietnam-map.jpg"
          alt="Bản đồ Việt Nam"
          fill
          sizes="(min-width:1024px) 420px, 100vw"
          className="object-contain"
          priority
        />

        {branches.map((branch) => {
          const active = branch.code === selectedCode;
          const highlighted = branch.code === hovered || active;
          return (
            <a
              key={branch.code}
              href={branchMapUrl(branch)}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(branch.code)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(branch.code)}
              onBlur={() => setHovered(null)}
              onClick={() => onSelect?.(branch)}
              aria-label={`Mở Google Maps: ALOHA ${branch.name}`}
              className="group absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${branch.x}%`, top: `${branch.y}%` }}
            >
              <PinIcon highlighted={highlighted} />
              <span
                className={`pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-ink px-2 py-1 font-display text-[11px] font-bold text-white shadow-lg transition-opacity ${
                  highlighted ? "opacity-100" : "opacity-0"
                }`}
              >
                {branch.code} · {branch.name}
              </span>
            </a>
          );
        })}
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-ink-soft shadow-sm">
        <span className="grid h-4 w-4 place-items-center rounded-full text-white" style={{ background: "var(--grad)" }}>
          <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
            <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
          </svg>
        </span>
        Cơ sở ALOHA
      </div>
    </div>
  );
}

function PinIcon({ highlighted }: { highlighted?: boolean }) {
  return (
    <span
      className={`relative block transition-all ${
        highlighted ? "scale-125" : "scale-100 group-hover:scale-110"
      }`}
      style={{ width: 22, height: 28 }}
    >
      <span
        className={`absolute inset-0 rounded-full blur-md transition-opacity ${
          highlighted ? "opacity-70" : "opacity-30"
        }`}
        style={{ background: "#28b4d2" }}
      />
      <svg viewBox="0 0 24 30" width="22" height="28" className="relative drop-shadow-md" aria-hidden>
        <defs>
          <linearGradient id="pin-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#28b4d2" />
            <stop offset="1" stopColor="#469142" />
          </linearGradient>
        </defs>
        <path
          d="M12 0C5.4 0 0 5.4 0 12c0 8 12 18 12 18s12-10 12-18C24 5.4 18.6 0 12 0z"
          fill="url(#pin-fill)"
          stroke="#fff"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="11" r="4.5" fill="#fff" />
      </svg>
    </span>
  );
}
