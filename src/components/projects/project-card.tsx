"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { useHydrationSafeReducedMotion } from "@/hooks/use-hydration-safe-reduced-motion";
import { useCallback, useRef } from "react";

type ProjectCardProps = {
  project: Project;
  sizes?: string;
  priority?: boolean;
  href?: string;
};

export function ProjectCard({
  project,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  href = "/projects",
}: ProjectCardProps) {
  const reduce = useHydrationSafeReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = useCallback(() => {
    if (reduce || !project.video) return;
    const v = videoRef.current;
    if (!v) return;
    void v.play().catch(() => {
      /* autoplay policies */
    });
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

  return (
    <Link
      href={`${href}#${project.slug}`}
      className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      data-cursor-hover
    >
      <motion.article
        layout
        className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-surface ring-1 ring-white/[0.04]"
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onMouseEnter={play}
        onMouseLeave={pause}
      >
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-zinc-900">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          />

          {project.video && !reduce ? (
            <video
              ref={videoRef}
              className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              src={project.video}
              muted
              playsInline
              loop
              preload="none"
            />
          ) : null}

          <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:from-black/45 group-hover:via-black/10 group-hover:opacity-75" />

          <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col gap-2 p-6 sm:p-8">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-zinc-300">
              {project.client} · {project.year}
            </p>
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {project.title}
            </h3>
            <p className="max-w-prose text-sm leading-relaxed text-zinc-200/90">
              {project.summary}
            </p>
            {project.metrics ? (
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-200/90">
                {project.metrics}
              </p>
            ) : null}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
