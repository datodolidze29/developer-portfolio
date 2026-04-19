export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  summary: string;
  metrics?: string;
  image: string;
  /** Short ambient clip shown on hover (desktop) */
  video?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "atlas-console",
    title: "Atlas console",
    client: "Fintech",
    year: "2025",
    summary: "Unified observability surface for risk and settlement teams.",
    metrics: "−34% time-to-triage",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    featured: true,
  },
  {
    slug: "northline-commerce",
    title: "Northline commerce",
    client: "Retail",
    year: "2024",
    summary: "Composable storefront with edge-cached personalization.",
    metrics: "+18% conversion on PLP",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    featured: true,
  },
  {
    slug: "signal-canvas",
    title: "Signal canvas",
    client: "Collaboration",
    year: "2024",
    summary: "Realtime whiteboard with conflict-free document sync.",
    metrics: "<120ms p95 sync",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    slug: "ledger-docs",
    title: "Ledger docs",
    client: "Infrastructure",
    year: "2023",
    summary: "Developer documentation platform with typed SDK previews.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
    featured: false,
  },
  {
    slug: "pulse-health",
    title: "Pulse health",
    client: "Wellness",
    year: "2023",
    summary: "Mobile care journeys with offline-first scheduling.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    featured: false,
  },
];

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
