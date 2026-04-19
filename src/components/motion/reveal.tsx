"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { TRANSITION_REVEAL } from "@/components/motion/constants";
import { useHydrationSafeReducedMotion } from "@/hooks/use-hydration-safe-reduced-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset before reveal (px) */
  y?: number;
  /** Intersection margin — larger triggers earlier */
  margin?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  margin = "-11% 0px -7% 0px",
}: RevealProps) {
  const reduce = useHydrationSafeReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{
        ...TRANSITION_REVEAL,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
