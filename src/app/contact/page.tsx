import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { HoverLift } from "@/components/motion/hover-lift";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out for collaborations or full-time opportunities.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal className="space-y-6">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-muted">
            Contact
          </p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Let&apos;s build something considered
          </h1>
          <p className="max-w-prose text-lg leading-relaxed text-muted">
            Share a few lines about the problem space, timeline, and how you
            measure success. I typically reply within two business days.
          </p>

          <div className="flex flex-col gap-4 border-t border-white/[0.06] pt-8 text-sm">
            <HoverLift className="inline-block w-fit">
              <a
                className="inline-flex w-fit items-center gap-2 text-foreground transition hover:text-muted"
                href={`mailto:${site.email}`}
                data-cursor-hover
              >
                <span className="border-b border-white/30 pb-0.5">{site.email}</span>
              </a>
            </HoverLift>
            <div className="flex flex-wrap gap-4 text-muted">
              <HoverLift className="inline-block">
                <Link
                  href={site.social.github}
                  className="transition hover:text-foreground"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                >
                  GitHub
                </Link>
              </HoverLift>
              <HoverLift className="inline-block">
                <Link
                  href={site.social.linkedin}
                  className="transition hover:text-foreground"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                >
                  LinkedIn
                </Link>
              </HoverLift>
              <HoverLift className="inline-block">
                <Link
                  href={site.social.instagram}
                  className="transition hover:text-foreground"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                >
                  Instagram
                </Link>
              </HoverLift>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
