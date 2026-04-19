"use client";

import { motion } from "framer-motion";
import { TRANSITION_REVEAL } from "@/components/motion/constants";
import { useHydrationSafeReducedMotion } from "@/hooks/use-hydration-safe-reduced-motion";

type CharRevealProps = {
  text: string;
  className?: string;
  /** Delay between characters (s) */
  stagger?: number;
};

/**
 * Character-by-character scroll reveal (respects reduced motion).
 */
export function CharReveal({ text, className, stagger = 0.018 }: CharRevealProps) {
  const reduce = useHydrationSafeReducedMotion();
  const chars = [...text];

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={`${i}-${char === " " ? "sp" : char}`}
          className="inline-block"
          initial={{ opacity: 0, y: "0.22em" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px -6% 0px" }}
          transition={{
            ...TRANSITION_REVEAL,
            delay: i * stagger,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

type WordRevealProps = {
  text: string;
  className?: string;
  stagger?: number;
};

/** Word-by-word reveal for longer copy */
export function WordReveal({ text, className, stagger = 0.04 }: WordRevealProps) {
  const reduce = useHydrationSafeReducedMotion();
  const words = text.split(/(\s+)/);

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${i}-${word}`}
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, y: "0.2em" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6% 0px" }}
          transition={{
            ...TRANSITION_REVEAL,
            delay: i * stagger,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
