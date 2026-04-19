import type { ReactNode } from "react";

/**
 * Remounts on navigation (Next template behavior) without extra motion here —
 * enter/exit is handled by {@link PageTransition} in the root layout.
 */
export default function Template({ children }: { children: ReactNode }) {
  return children;
}
