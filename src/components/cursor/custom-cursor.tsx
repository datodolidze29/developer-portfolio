"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const SELECTOR =
  "a, button, [data-cursor-hover], input, textarea, select, [role='button']";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 480, damping: 38, mass: 0.28 });
  const sy = useSpring(y, { stiffness: 480, damping: 38, mass: 0.28 });

  useEffect(() => {
    const mqFine = window.matchMedia("(pointer: fine)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      const on = mqFine.matches && !mqReduce.matches;
      setEnabled(on);
      document.documentElement.dataset.cursor = on ? "fine" : "coarse";
    };
    apply();
    mqFine.addEventListener("change", apply);
    mqReduce.addEventListener("change", apply);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setHovering(!!el?.closest(SELECTOR));
    };

    const down = () => setPressing(true);
    const up = () => setPressing(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      mqFine.removeEventListener("change", apply);
      mqReduce.removeEventListener("change", apply);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.dataset.cursor = "coarse";
    };
  }, [x, y]);

  if (!enabled) return null;

  const base = hovering ? 9 : 6;
  const scale = pressing ? 0.88 : hovering ? 1.05 : 1;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[120]"
    >
      <motion.div
        className="absolute rounded-full border border-white/25 bg-white/85 shadow-[0_0_0_1px_rgba(0,0,0,0.2)] backdrop-blur-[0.5px]"
        style={{
          left: sx,
          top: sy,
          width: base,
          height: base,
          translateX: "-50%",
          translateY: "-50%",
          scale,
        }}
        transition={{ type: "spring", stiffness: 560, damping: 32, mass: 0.32 }}
      />
    </motion.div>
  );
}
