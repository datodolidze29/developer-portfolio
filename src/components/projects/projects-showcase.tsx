"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useRef, type ReactNode } from "react";
import type { ShowcaseProject } from "@/lib/showcase-projects";
import { Reveal } from "@/components/motion/reveal";
import { StaggerReveal, staggerChildVariants } from "@/components/motion/stagger-reveal";
import { useHydrationSafeReducedMotion } from "@/hooks/use-hydration-safe-reduced-motion";

export type ProjectShowcaseCardProps = {
  project: ShowcaseProject;
  sizes?: string;
  priority?: boolean;
  className?: string;
  reveal?: boolean;
  revealDelay?: number;
};

export function ProjectShowcaseCard({
  project,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  priority = false,
  className,
  reveal = false,
  revealDelay = 0,
}: ProjectShowcaseCardProps) {
  const reduce = useHydrationSafeReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = useCallback(() => {
    if (reduce || !project.video) return;
    const v = videoRef.current;
    if (!v) return;
    void v.play().catch(() => {});
  }, [project.video, reduce]);

  const pause = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    try {
      v.currentTime = 0;
    } catch {
      /* ignore */
    }
  }, []);

  const imageScale = !reduce ? "group-hover/card:scale-[1.045]" : "";

  const inner = (
    <motion.article
      id={project.id}
      className={`group/card flex h-full flex-col ${className ?? ""}`}
      whileHover={reduce ? undefined : { scale: 1.014 }}
      whileTap={reduce ? undefined : { scale: 0.993 }}
      transition={{ type: "spring", stiffness: 440, damping: 32 }}
      onMouseEnter={play}
      onMouseLeave={pause}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900 ring-1 ring-white/[0.04]">
        <div
          className={`relative h-full w-full transition-[transform,filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${imageScale} group-hover/card:brightness-[0.94]`}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />

          {project.video && !reduce ? (
            <video
              ref={videoRef}
              className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover/card:opacity-100"
              src={project.video}
              muted
              playsInline
              loop
              preload="none"
            />
          ) : null}
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 opacity-0 transition-opacity duration-500 ease-out group-hover/card:opacity-100 sm:p-6"
          aria-hidden
        >
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.26em] text-zinc-300">
            View case
          </span>
          <span className="mt-1 font-heading text-lg font-semibold tracking-tight text-white sm:text-xl">
            Open project →
          </span>
        </div>
      </div>

      <div className="space-y-1.5 pt-3 sm:pt-4">
        <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          <span className="relative inline-block">
            {project.title}
            <span
              className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white/45 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-x-100"
              aria-hidden
            />
          </span>
        </h3>
        <p className="text-sm leading-relaxed text-muted sm:text-[0.9375rem]">{project.description}</p>
      </div>
    </motion.article>
  );

  const linked =
    project.href != null && project.href.length > 0 ? (
      <Link
        href={project.href}
        className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        data-cursor-hover
      >
        {inner}
      </Link>
    ) : (
      inner
    );

  if (reveal) {
    return (
      <Reveal delay={revealDelay} y={22}>
        {linked}
      </Reveal>
    );
  }

  return linked;
}

export type ProjectsShowcaseProps = {
  items: ShowcaseProject[];
  /** Section heading (e.g. “Recent launches”) */
  title?: ReactNode;
  /** Small uppercase label above title */
  eyebrow?: ReactNode;
  /** Optional right column (e.g. “View all” link) */
  headerAside?: ReactNode;
  className?: string;
  /** Anchor id for in-page links */
  sectionId?: string;
  sectionAriaLabel?: string;
  /** Stagger scroll-reveal on each card */
  animateCards?: boolean;
  /** Scroll-reveal the title row (when a header is present) */
  revealHeader?: boolean;
};

export function ProjectsShowcase({
  items,
  title,
  eyebrow,
  headerAside,
  className,
  sectionId,
  sectionAriaLabel,
  animateCards = true,
  revealHeader = false,
}: ProjectsShowcaseProps) {
  const headerRow =
    eyebrow || title || headerAside ? (
      <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          {eyebrow ? (
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-muted">{eyebrow}</p>
          ) : null}
          {title ? (
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          ) : null}
        </div>
        {headerAside ? <div className="shrink-0">{headerAside}</div> : null}
      </div>
    ) : null;

  const isLandmark = Boolean(sectionId ?? sectionAriaLabel);
  const rootClass = className ?? "";

  const inner = (
    <>
      {headerRow ? (
        revealHeader ? <Reveal y={24}>{headerRow}</Reveal> : headerRow
      ) : null}

      {animateCards ? (
        <StaggerReveal className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-7 xl:grid-cols-3 xl:gap-8">
          {items.map((project, index) => (
            <motion.div key={project.id} variants={staggerChildVariants} className="min-h-0">
              <ProjectShowcaseCard
                project={project}
                priority={index < 2}
                className="scroll-mt-28"
                reveal={false}
              />
            </motion.div>
          ))}
        </StaggerReveal>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-7 xl:grid-cols-3 xl:gap-8">
          {items.map((project, index) => (
            <ProjectShowcaseCard
              key={project.id}
              project={project}
              priority={index < 2}
              className="scroll-mt-28"
              reveal={false}
            />
          ))}
        </div>
      )}
    </>
  );

  return isLandmark ? (
    <section id={sectionId} aria-label={sectionAriaLabel} className={rootClass}>
      {inner}
    </section>
  ) : (
    <div className={rootClass}>{inner}</div>
  );
}
