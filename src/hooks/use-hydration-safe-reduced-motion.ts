"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Framer's `useReducedMotion()` can read the real media query on the client
 * before hydration finishes, producing different markup than SSR.
 * This hook returns `false` until mount so the first client render matches the server.
 */
export function useHydrationSafeReducedMotion(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);
  const prefersReduced = useFramerReducedMotion();
  return mounted && Boolean(prefersReduced);
}
