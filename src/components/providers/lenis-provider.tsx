"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type LenisContextValue = Lenis | null;

const LenisContext = createContext<LenisContextValue>(null);

export function useLenis() {
  return useContext(LenisContext);
}

type LenisProviderProps = {
  children: ReactNode;
};

/**
 * Inertial smooth scrolling. Disabled when `prefers-reduced-motion: reduce`.
 */
export function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const instance = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.05,
      wheelMultiplier: 0.92,
      autoRaf: true,
    });

    queueMicrotask(() => setLenis(instance));
    document.documentElement.classList.add("lenis");

    return () => {
      document.documentElement.classList.remove("lenis");
      instance.destroy();
      queueMicrotask(() => setLenis(null));
    };
  }, []);

  const value = useMemo(() => lenis, [lenis]);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
