"use client";

import { useState, useEffect } from "react";

/**
 * SSR-safe hook to detect mobile/touch devices.
 * Returns `true` when the viewport is ≤768px OR when the device has touch points.
 * Defaults to `false` during SSR (server-side) to avoid hydration mismatches.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const touchDevice =
        typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
      const smallViewport = window.innerWidth <= 768;
      setIsMobile(touchDevice || smallViewport);
    };

    check();

    const mql = window.matchMedia("(max-width: 768px)");
    mql.addEventListener("change", check);
    return () => mql.removeEventListener("change", check);
  }, []);

  return isMobile;
}
