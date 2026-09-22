"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BackToTopProps {
  /** Show button after scrolling past this many pixels. */
  threshold?: number;
}

/**
 * Floating "back to top" button — bottom-right on desktop, thumb-reachable
 * on mobile. Respects safe-area-insets and prefers-reduced-motion.
 */
export function BackToTop({ threshold = 320 }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const scrollTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed z-[120] grid h-12 w-12 place-items-center rounded-full text-white shadow-lg transition-all duration-300 hover:-translate-y-1 sm:h-[52px] sm:w-[52px]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
      style={{
        right: "clamp(16px, 3vw, 32px)",
        bottom: "calc(env(safe-area-inset-bottom, 0px) + clamp(16px, 3vw, 32px))",
        background: "var(--grad)",
      }}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
