import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { projectToShowcase } from "@/lib/showcase-projects";
import { ProjectsShowcase } from "@/components/projects/projects-showcase";
import { HoverLift } from "@/components/motion/hover-lift";

export function FeaturedWork() {
  const items = getFeaturedProjects().map(projectToShowcase);

  return (
    <ProjectsShowcase
      sectionId="projects"
      sectionAriaLabel="Featured projects"
      className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      eyebrow="Selected work"
      title="Recent launches"
      revealHeader
      headerAside={
        <HoverLift className="inline-block">
          <Link
            href="/projects"
            className="text-sm font-medium text-muted transition hover:text-foreground"
            data-cursor-hover
          >
            View all projects →
          </Link>
        </HoverLift>
      }
      items={items}
    />
  );
}
