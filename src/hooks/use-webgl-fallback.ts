"use client";

import { useState, useEffect, useRef } from "react";

const FPS_THRESHOLD = 30;      // Below this → trigger fallback
const WARM_UP_MS    = 2_000;   // Wait 2s before judging (scene needs to load)
const SAMPLE_WINDOW = 3_000;   // Measure over a 3s rolling window

/**
 * Monitors real rendered FPS via requestAnimationFrame.
 * After a 2-second warm-up, if the average FPS over a 3-second window
 * drops below `FPS_THRESHOLD` (default 30fps), `shouldFallback` becomes `true`
 * and the WebGL canvas should be replaced with a CSS fallback.
 *
 * Once triggered, the fallback is sticky — we do NOT flip back to WebGL
 * mid-session to avoid visual thrashing on borderline-capable devices.
 */
export function useWebGLFallback(active: boolean): boolean {
  const [shouldFallback, setShouldFallback] = useState(false);

  const frameCountRef  = useRef(0);
  const windowStartRef = useRef<number | null>(null);
  const startTimeRef   = useRef<number | null>(null);
  const rafIdRef       = useRef<number | null>(null);

  useEffect(() => {
    // Don't monitor if already fallen back, or if WebGL isn't active
    if (!active || shouldFallback) return;

    const tick = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current  = timestamp;
        windowStartRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;

      // Skip warm-up period
      if (elapsed < WARM_UP_MS) {
        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }

      frameCountRef.current += 1;

      const windowElapsed = timestamp - (windowStartRef.current ?? timestamp);

      if (windowElapsed >= SAMPLE_WINDOW) {
        const fps = (frameCountRef.current / windowElapsed) * 1_000;

        if (fps < FPS_THRESHOLD) {
          setShouldFallback(true);
          return; // Stop the loop — fallback is sticky
        }

        // Reset for next window
        frameCountRef.current  = 0;
        windowStartRef.current = timestamp;
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      frameCountRef.current  = 0;
      startTimeRef.current   = null;
      windowStartRef.current = null;
    };
  }, [active, shouldFallback]);

  return shouldFallback;
}
