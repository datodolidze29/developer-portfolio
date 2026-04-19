"use client";

import { useLenis } from "@/components/providers/lenis-provider";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const STICKY_OFFSET = -76;

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scrolls to `location.hash` after navigation or in-page hash updates.
 * Uses Lenis when available; otherwise native `scrollIntoView`.
 */
export function HashScroll() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [hash, setHash] = useState("");

  const read = useCallback(() => {
    setHash(window.location.hash.slice(1).toLowerCase());
  }, []);

  useEffect(() => {
    queueMicrotask(read);
    window.addEventListener("hashchange", read);
    window.addEventListener("popstate", read);
    return () => {
      window.removeEventListener("hashchange", read);
      window.removeEventListener("popstate", read);
    };
  }, [read]);

  useEffect(() => {
    queueMicrotask(read);
  }, [pathname, read]);

  useEffect(() => {
    if (!hash) return;

    const scrollTo = () => {
      const reduce = prefersReducedMotion();
      const target = `#${hash}`;

      if (lenis && !reduce) {
        const el = document.getElementById(hash);
        if (el) {
          lenis.scrollTo(target, {
            offset: STICKY_OFFSET,
            duration: 1.05,
          });
        }
        return;
      }

      const el = document.getElementById(hash);
      if (!el) return;
      el.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    };

    const t0 = window.requestAnimationFrame(scrollTo);
    const t1 = window.setTimeout(scrollTo, 200);
    return () => {
      window.cancelAnimationFrame(t0);
      window.clearTimeout(t1);
    };
  }, [pathname, hash, lenis]);

  return null;
}
