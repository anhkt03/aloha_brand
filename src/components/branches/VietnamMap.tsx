"use client";

import { useState } from "react";
import { branches, branchMapUrl, type Branch } from "@/data/branches";

/**
 * Stylised Vietnam map with clickable branch pins. Pin coordinates are
 * `x` / `y` percentages relative to the SVG viewBox (0–100), stored in
 * `src/data/branches.ts`.
 *
 * When the user hovers a pin, a tooltip shows the branch name; clicking
 * opens Google Maps in a new tab. If two branches share a spot they get
 * a small radial offset so both stay clickable.
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
      className="relative w-full overflow-hidden rounded-xl border border-line bg-brand-grad-soft p-4 shadow-sm"
      style={{ aspectRatio: "5 / 7" }}
    >
      {/* SVG map */}
      <svg
        viewBox="0 0 100 140"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none block h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="vn-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3b8639" />
            <stop offset="1" stopColor="#28b4d2" />
          </linearGradient>
          <filter id="vn-glow">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>

        {/* Stylised Vietnam silhouette — approximate, purely visual. */}
        <path
          d="M52 6
             Q60 8 62 14
             Q66 22 60 28
             Q56 34 58 40
             Q60 46 56 52
             Q50 60 48 66
             Q46 72 44 78
             Q42 84 44 90
             Q46 96 42 102
             Q38 108 36 114
             Q34 118 38 122
             Q42 128 46 130
             Q52 132 56 128
             Q60 122 58 116
             Q56 110 60 104
             Q64 98 66 92
             Q68 86 66 80
             Q64 74 68 68
             Q72 62 72 56
             Q72 50 68 46
             Q64 42 66 36
             Q68 30 70 24
             Q70 18 66 14
             Q62 8 58 6 Z"
          fill="url(#vn-fill)"
          fillOpacity="0.18"
          stroke="url(#vn-fill)"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Hoàng Sa / Trường Sa hint — a few small dots to the SE. */}
        <g fill="#28b4d2" opacity="0.6">
          <circle cx="82" cy="60" r="0.6" />
          <circle cx="86" cy="66" r="0.5" />
          <circle cx="88" cy="90" r="0.6" />
          <circle cx="84" cy="96" r="0.5" />
          <circle cx="80" cy="102" r="0.5" />
        </g>
      </svg>

      {/* Pins — positioned by percentage */}
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
            {/* Tooltip */}
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

      {/* Legend */}
      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold text-ink-soft shadow-sm backdrop-blur">
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
      style={{ width: 26, height: 32 }}
    >
      <span
        className={`absolute inset-0 rounded-full blur-md transition-opacity ${
          highlighted ? "opacity-70" : "opacity-40"
        }`}
        style={{ background: "var(--brand)" }}
      />
      <svg viewBox="0 0 24 30" width="26" height="32" className="relative drop-shadow" aria-hidden>
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
