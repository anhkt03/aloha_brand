"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  /** Target end value. */
  end: number;
  /** Duration in ms. Default 3000. */
  duration?: number;
  /** Start counting only after this element enters the viewport. */
  triggerRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Animates a number from 0 to `end` using requestAnimationFrame with an
 * ease-out curve. When `triggerRef` is provided the animation starts once
 * the element intersects the viewport; otherwise it starts on mount.
 */
export function useCountUp({ end, duration = 3000, triggerRef }: Options) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const start = () => {
      if (started.current) return;
      started.current = true;
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        setValue(Math.round(end * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!triggerRef?.current) {
      start();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(triggerRef.current);
    return () => io.disconnect();
  }, [end, duration, triggerRef]);

  return value;
}
