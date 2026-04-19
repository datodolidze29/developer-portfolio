/** Shared easing — calm, editorial feel */
export const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const TRANSITION_PAGE = {
  duration: 0.42,
  ease: EASE_PREMIUM,
} as const;

export const TRANSITION_REVEAL = {
  duration: 0.58,
  ease: EASE_PREMIUM,
} as const;

export const TRANSITION_MICRO = {
  type: "spring" as const,
  stiffness: 520,
  damping: 34,
  mass: 0.55,
};
