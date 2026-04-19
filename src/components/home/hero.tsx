"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { site } from "@/lib/site";
import { CharReveal, WordReveal } from "@/components/motion/char-reveal";
import { TRANSITION_MICRO } from "@/components/motion/constants";
import { HoverLift } from "@/components/motion/hover-lift";
import { Magnetic } from "@/components/motion/magnetic";
import { useHydrationSafeReducedMotion } from "@/hooks/use-hydration-safe-reduced-motion";

const noiseSvg =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export function Hero() {
  const reduce = useHydrationSafeReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 28, damping: 22, mass: 0.45 });
  const sy = useSpring(my, { stiffness: 28, damping: 22, mass: 0.45 });

  const orbX = useTransform(sx, [-0.5, 0.5], [56, -56]);
  const orbY = useTransform(sy, [-0.5, 0.5], [44, -44]);
  const sheenX = useTransform(sx, [-0.5, 0.5], [24, -24]);
  const sheenY = useTransform(sy, [-0.5, 0.5], [18, -18]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my]);

  return (
    <section className="relative isolate flex min-h-[calc(100dvh-4.75rem)] flex-col justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(244,244,245,0.07),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_50%,rgba(113,113,122,0.12),transparent_50%),radial-gradient(ellipse_60%_45%_at_0%_80%,rgba(63,63,70,0.15),transparent_55%)]"
        aria-hidden
      />
      {!reduce && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-1/4 top-1/4 h-[min(90vw,720px)] w-[min(90vw,720px)] rounded-full bg-white/[0.045] blur-3xl"
            style={{ x: orbX, y: orbY }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[38%] h-[min(70vw,480px)] w-[min(95vw,880px)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(244,244,245,0.06),transparent_72%)] blur-2xl"
            style={{ x: sheenX, y: sheenY }}
            aria-hidden
          />
        </>
      )}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage: noiseSvg,
          backgroundSize: "240px 240px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-12">
        <motion.div
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-muted"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90" aria-hidden />
          {site.availability}
        </motion.div>

        <div className="space-y-8 lg:space-y-10">
          <h1 className="font-heading text-[clamp(2.85rem,8.5vw,5.75rem)] font-semibold leading-[0.92] tracking-tight text-foreground">
            <CharReveal text={site.name} stagger={0.02} />
            <span className="mt-2 block max-w-[22ch] text-[clamp(1.35rem,3.8vw,2.35rem)] font-medium leading-[1.1] tracking-tight text-muted">
              <CharReveal text={site.role} stagger={0.014} />
            </span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-muted sm:text-xl lg:text-[1.35rem] lg:leading-relaxed">
            <WordReveal text={site.tagline} stagger={0.035} />
          </p>
        </div>

        <motion.div
          className="flex flex-wrap items-center gap-5 sm:gap-8"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <Magnetic className="inline-block" strength={0.38}>
            <motion.a
              href="#projects"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-foreground px-7 py-3 text-sm font-semibold tracking-tight text-background ring-1 ring-white/10 transition-[transform,box-shadow] after:pointer-events-none after:absolute after:inset-0 after:translate-x-[-120%] after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:transition-transform after:duration-700 after:ease-out after:content-[''] hover:shadow-[0_0_0_1px_rgba(244,244,245,0.14),0_20px_48px_-14px_rgba(244,244,245,0.22)] hover:after:translate-x-[120%]"
              data-cursor-hover
              whileHover={reduce ? undefined : { scale: 1.015, y: -1 }}
              whileTap={reduce ? undefined : { scale: 0.985 }}
              transition={TRANSITION_MICRO}
            >
              View Work
            </motion.a>
          </Magnetic>

          <Magnetic className="inline-block" strength={0.32}>
            <HoverLift className="inline-block">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                data-cursor-hover
              >
                <span className="relative pb-0.5">
                  Start a project
                  <span
                    className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-[0.35] bg-white/35 transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-hover:bg-white/80"
                    aria-hidden
                  />
                </span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </HoverLift>
          </Magnetic>

          <span className="hidden h-4 w-px bg-white/[0.12] sm:block" aria-hidden />
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted sm:text-[0.7rem]">
            {site.location}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
