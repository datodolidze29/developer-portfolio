import type { Metadata } from "next";
import { SkillTagGrid } from "@/components/about/skill-tag-grid";
import { skillGroups } from "@/lib/skills";
import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About",
  description: "Background, approach, and skills.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-24">
        <div className="space-y-10">
          <Reveal className="space-y-5">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-muted">
              About
            </p>
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Pragmatic craft, humane pace
            </h1>
          </Reveal>

          <Reveal className="space-y-6 text-lg leading-relaxed text-muted" delay={0.06}>
            <p>
              I partner with teams who care about clarity: readable codebases,
              resilient UX states, and instrumentation that tells the truth.
            </p>
            <p>
              My default mode is to prototype quickly, then harden—performance,
              accessibility, and maintainability are not polish passes; they are
              part of the first vertical slice.
            </p>
            <p>
              Outside of delivery work, I mentor engineers on TypeScript
              ergonomics and contribute to internal design tokens where they
              touch production components.
            </p>
          </Reveal>

          <Reveal
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-sm leading-relaxed text-muted ring-1 ring-white/[0.04]"
            delay={0.12}
          >
            <p className="font-medium text-foreground">{site.name}</p>
            <p>{site.role}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.22em]">{site.location}</p>
          </Reveal>
        </div>

        <div className="space-y-10">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={0.08 + gi * 0.06}>
              <div className="space-y-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                  {group.title}
                </h2>
                <SkillTagGrid skills={group.items} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
