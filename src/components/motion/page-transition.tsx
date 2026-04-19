"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { TRANSITION_PAGE } from "@/components/motion/constants";
import { useHydrationSafeReducedMotion } from "@/hooks/use-hydration-safe-reduced-motion";

/**
 * Route-level enter / exit: soft fade + short vertical slide.
 * Pairs with `template.tsx` (no duplicate motion there).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useHydrationSafeReducedMotion();

  if (reduce) {
    return children;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={TRANSITION_PAGE}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
