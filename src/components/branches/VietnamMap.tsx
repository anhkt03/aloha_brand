"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { branches, branchMapUrl, type Branch } from "@/data/branches";

const MIN_SCALE = 1;
const MAX_SCALE = 3;
const STEP = 0.5;

/**
 * Vietnam map with clickable branch pins.
 *
 * Base map is the flag-styled silhouette at
 * `public/images/branches/vietnam-map.jpg` (aspect 11:20). Pin coordinates
 * are `x` / `y` percentages of the same image, stored in
 * `src/data/branches.ts`. Users can zoom in (up to 3×) and drag to pan
 * when zoomed. The highlighted pin is lifted above the others.
 */
export function VietnamMap({
  onSelect,
  selectedCode,
}: {
  onSelect?: (branch: Branch) => void;
  selectedCode?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragRef = useRef({ active: false, startX: 0, startY: 0, origX: 0, origY: 0, moved: false });

  const zoomIn = () => setScale((s) => Math.min(s + STEP, MAX_SCALE));
  const zoomOut = () =>
    setScale((s) => {
      const next = Math.max(s - STEP, MIN_SCALE);
      if (next === 1) setPos({ x: 0, y: 0 });
      return next;
    });
  const reset = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (scale <= 1) return;
      dragRef.current = {
        active: true,
        startX: event.clientX,
        startY: event.clientY,
        origX: pos.x,
        origY: pos.y,
        moved: false,
      };
      (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    },
    [pos, scale],
  );

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const dx = event.clientX - dragRef.current.startX;
    const dy = event.clientY - dragRef.current.startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) dragRef.current.moved = true;
    setPos({ x: dragRef.current.origX + dx, y: dragRef.current.origY + dy });
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current.active = false;
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-line bg-white p-3 shadow-sm"
      style={{ aspectRatio: "11 / 20" }}
    >
      {/* Zoom controls */}
      <div
        className="absolute right-3 top-3 z-30 flex flex-col overflow-hidden rounded-lg shadow-lg"
        style={{ background: "#35902f" }}
      >
        <ZoomButton onClick={zoomIn} disabled={scale >= MAX_SCALE} label="Phóng to">
          <path d="M12 5v14M5 12h14" />
        </ZoomButton>
        <div className="h-px bg-white/15" />
        <ZoomButton onClick={zoomOut} disabled={scale <= MIN_SCALE} label="Thu nhỏ">
          <path d="M5 12h14" />
        </ZoomButton>
        <div className="h-px bg-white/15" />
        <ZoomButton onClick={reset} disabled={scale === 1 && pos.x === 0 && pos.y === 0} label="Về vị trí ban đầu">
          <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
        </ZoomButton>
      </div>

      {/* Scale badge */}
      {scale > 1 && (
        <span className="absolute left-3 top-3 z-30 rounded-full bg-surface/95 px-2.5 py-1 font-display text-[11px] font-bold text-ink shadow-sm">
          {scale.toFixed(1)}×
        </span>
      )}

      {/* Pan/zoom wrapper */}
      <div
        className="relative h-full w-full select-none touch-none"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
          transformOrigin: "center center",
          transition: dragRef.current.active ? "none" : "transform 0.2s ease",
          cursor: scale > 1 ? (dragRef.current.active ? "grabbing" : "grab") : "default",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <Image
          src="/images/branches/vietnam-map.jpg"
          alt="Bản đồ Việt Nam"
          fill
          sizes="(min-width:1024px) 420px, 100vw"
          className="pointer-events-none object-contain"
          priority
          draggable={false}
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
              onClick={(event) => {
                // If the user was dragging, cancel the click so pan doesn't
                // accidentally open a new tab.
                if (dragRef.current.moved) event.preventDefault();
                onSelect?.(branch);
              }}
              aria-label={`Mở Google Maps: ALOHA ${branch.name}`}
              className={`group absolute -translate-x-1/2 -translate-y-full ${highlighted ? "z-20" : "z-10"}`}
              style={{ left: `${branch.x}%`, top: `${branch.y}%` }}
            >
              <PinIcon highlighted={highlighted} />
              <span
                className={`pointer-events-none absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md px-2 py-1 font-display text-[11px] font-bold text-white shadow-lg transition-opacity ${
                  highlighted ? "opacity-100" : "opacity-0"
                }`}
                style={{ background: "#182a17" }}
              >
                {branch.code} · {branch.name}
              </span>
            </a>
          );
        })}
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-surface/95 px-3 py-1.5 text-[11px] font-semibold text-ink-soft shadow-sm">
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

function ZoomButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </button>
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
