"use client";

import { motion } from "framer-motion";
import { staggerChildVariants } from "@/components/motion/stagger-reveal";
import { useHydrationSafeReducedMotion } from "@/hooks/use-hydration-safe-reduced-motion";
import { TRANSITION_MICRO } from "@/components/motion/constants";

const chip =
  "rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-foreground/90";

type SkillTagGridProps = {
  skills: readonly string[];
};

export function SkillTagGrid({ skills }: SkillTagGridProps) {
  const reduce = useHydrationSafeReducedMotion();

  if (reduce) {
    return (
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li key={skill} className={chip}>
            {skill}
          </li>
        ))}
      </ul>
    );
  }

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.032,
        delayChildren: 0.06,
      },
    },
  };

  return (
    <motion.ul
      className="flex flex-wrap gap-2"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px -4% 0px" }}
    >
      {skills.map((skill) => (
        <motion.li
          key={skill}
          variants={staggerChildVariants}
          className={chip}
          whileHover={{ y: -1, transition: TRANSITION_MICRO }}
        >
          {skill}
        </motion.li>
      ))}
    </motion.ul>
  );
}
