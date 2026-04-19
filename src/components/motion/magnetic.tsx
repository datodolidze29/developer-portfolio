"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useRef, type ReactNode } from "react";
import { TRANSITION_MICRO } from "@/components/motion/constants";
import { useHydrationSafeReducedMotion } from "@/hooks/use-hydration-safe-reduced-motion";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Pull intensity (0–1 typical ~0.12–0.35) */
  strength?: number;
};

/**
 * Subtle pull toward the cursor on hover (fine pointer only).
 */
export function Magnetic({ children, className, strength = 0.22 }: MagneticProps) {
  const reduce = useHydrationSafeReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, TRANSITION_MICRO);
  const sy = useSpring(y, TRANSITION_MICRO);

  const move = useCallback(
    (e: React.MouseEvent) => {
      if (reduce) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength * 0.12;
      const dy = (e.clientY - cy) * strength * 0.12;
      x.set(dx);
      y.set(dy);
    },
    [reduce, strength, x, y],
  );

  const leave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (reduce) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      {children}
    </motion.span>
  );
}
