import type { Project } from "@/lib/projects";

/** Slim shape for the reusable projects showcase grid */
export type ShowcaseProject = {
  id: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  /** In-app link; omit for non-linked cards */
  href?: string;
};

export function projectToShowcase(p: Project): ShowcaseProject {
  return {
    id: p.slug,
    title: p.title,
    description: p.summary,
    image: p.image,
    video: p.video,
    href: `/projects#${p.slug}`,
  };
}

/** Standalone mock data for demos or placeholders */
export const showcaseProjectsMock: ShowcaseProject[] = [
  {
    id: "mock-lumen",
    title: "Lumen analytics",
    description: "Self-serve dashboards with cohort funnels and anomaly surfacing.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    href: "/projects",
  },
  {
    id: "mock-river",
    title: "River checkout",
    description: "Headless commerce flow with optimistic cart and Apple Pay.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    href: "/projects",
  },
  {
    id: "mock-orbit",
    title: "Orbit design system",
    description: "Tokens, documentation, and React primitives for product teams.",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1600&q=80",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    href: "/projects",
  },
  {
    id: "mock-field",
    title: "Field notes",
    description: "Offline-first capture app for researchers in low-connectivity areas.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
    href: "/projects",
  },
  {
    id: "mock-beacon",
    title: "Beacon care",
    description: "Guided care plans with reminders and HIPAA-aware messaging.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    href: "/projects",
  },
  {
    id: "mock-ledger",
    title: "Ledger API portal",
    description: "Interactive reference with live request builder and SDK snippets.",
    image:
      "https://images.unsplash.com/photo-1504639725590-04d09742a139?auto=format&fit=crop&w=1600&q=80",
    href: "/projects",
  },
];
