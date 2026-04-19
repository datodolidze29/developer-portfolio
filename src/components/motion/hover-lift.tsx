"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { TRANSITION_MICRO } from "@/components/motion/constants";
import { useHydrationSafeReducedMotion } from "@/hooks/use-hydration-safe-reduced-motion";

type HoverLiftProps = {
  children: ReactNode;
  className?: string;
  /** Vertical lift on hover (px) */
  y?: number;
};

/** Subtle hover lift + light press feedback for links and controls */
export function HoverLift({ children, className, y = -0.75 }: HoverLiftProps) {
  const reduce = useHydrationSafeReducedMotion();

  if (reduce) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={className}
      whileHover={{ y }}
      whileTap={{ scale: 0.985 }}
      transition={TRANSITION_MICRO}
    >
      {children}
    </motion.span>
  );
}
