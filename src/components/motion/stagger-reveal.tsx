"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { TRANSITION_REVEAL } from "@/components/motion/constants";
import { useHydrationSafeReducedMotion } from "@/hooks/use-hydration-safe-reduced-motion";

export const staggerChildVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_REVEAL,
  },
};

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  /** Viewport margin for whileInView */
  margin?: string;
  staggerDelay?: number;
};

/**
 * Scroll-triggered stagger. Children should set `variants={staggerChildVariants}`.
 */
export function StaggerReveal({
  children,
  className,
  margin = "-10% 0px -6% 0px",
  staggerDelay = 0.055,
}: StaggerRevealProps) {
  const reduce = useHydrationSafeReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.04,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
    >
      {children}
    </motion.div>
  );
}
