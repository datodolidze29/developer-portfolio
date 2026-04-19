"use client";

import { motion } from "framer-motion";
import { useHydrationSafeReducedMotion } from "@/hooks/use-hydration-safe-reduced-motion";

const noise =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.55'/%3E%3C/svg%3E\")";

/**
 * Site-wide film grain / noise (non-interactive, very low contrast).
 */
export function GrainOverlay() {
  const reduce = useHydrationSafeReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[115] overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.22] mix-blend-overlay contrast-125"
        style={{
          backgroundImage: noise,
          backgroundSize: "180px 180px",
        }}
      />
      {!reduce && (
        <motion.div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: noise,
            backgroundSize: "220px 220px",
          }}
          animate={{ x: [0, 3, -2, 0], y: [0, -2, 1, 0] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </div>
  );
}
