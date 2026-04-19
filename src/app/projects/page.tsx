import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { projectToShowcase } from "@/lib/showcase-projects";
import { ProjectsShowcase } from "@/components/projects/projects-showcase";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies and product engineering work.",
};

export default function ProjectsPage() {
  const items = projects.map(projectToShowcase);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <Reveal className="mb-14 max-w-2xl space-y-4 sm:mb-16">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-muted">
          Archive
        </p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Projects
        </h1>
        <p className="text-lg leading-relaxed text-muted">
          Interfaces, platforms, and systems shipped with small teams. Hover a
          card where available to preview motion studies in context.
        </p>
      </Reveal>

      <ProjectsShowcase items={items} animateCards />
    </div>
  );
}
