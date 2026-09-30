"use client";

import { useLayoutEffect } from "react";

const STORAGE_KEY = "aloha-theme";
const THEME_INIT = `try{var t=localStorage.getItem('${STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(_){}`;

function readStored(): "light" | "dark" | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Keeps the stored theme on `<html data-theme>` from the first byte to the last.
 *
 * - Server: an inline, blocking `<script>` in `<head>` applies it before first paint.
 *   It is not rendered on the client — the `[locale]` layout re-renders there when the
 *   language is switched, and React warns about `<script>` elements created client-side.
 * - Client: switching language remounts the layout, and React wipes every attribute
 *   from `<html>` while doing so. `ThemeToggle` only restores `data-theme` in a passive
 *   effect, so a light frame could paint in between. This re-applies the stored theme
 *   before paint, and a `MutationObserver` puts it straight back if it is ever removed
 *   while a theme is stored (choosing "system" clears the storage, so it is left alone).
 */
export function ThemeInitScript() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const restore = () => {
      const stored = readStored();
      if (stored && root.getAttribute("data-theme") !== stored) {
        root.setAttribute("data-theme", stored);
      }
    };
    restore();
    const observer = new MutationObserver(restore);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  if (typeof window !== "undefined") return null;
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />;
}
