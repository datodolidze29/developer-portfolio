"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { site } from "@/lib/site";
import { TRANSITION_MICRO } from "@/components/motion/constants";
import { Magnetic } from "@/components/motion/magnetic";
import { useHydrationSafeReducedMotion } from "@/hooks/use-hydration-safe-reduced-motion";

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const reduce = useHydrationSafeReducedMotion();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const honey = String(data.get("website") ?? "").trim();

    if (honey) {
      setStatus("sent");
      form.reset();
      return;
    }

    if (!name || !message) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          subject,
          message,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Request failed");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send message";
      setErrorMessage(msg);
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 grid max-w-xl gap-6"
      noValidate
    >
      <input
        tabIndex={-1}
        autoComplete="off"
        name="website"
        className="hidden"
        aria-hidden
      />
      <div className="grid gap-2">
        <label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none ring-0 transition placeholder:text-zinc-600 focus:border-white/25"
          placeholder="Ada Lovelace"
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-2 sm:gap-6">
        <div className="grid gap-2">
          <label
            htmlFor="email"
            className="text-xs uppercase tracking-[0.2em] text-muted"
          >
            Email <span className="text-muted/70">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-zinc-600 focus:border-white/25"
            placeholder="you@company.com"
          />
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="company"
            className="text-xs uppercase tracking-[0.2em] text-muted"
          >
            Company <span className="text-muted/70">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-zinc-600 focus:border-white/25"
            placeholder="Acme Inc."
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="subject"
          className="text-xs uppercase tracking-[0.2em] text-muted"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          autoComplete="off"
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-zinc-600 focus:border-white/25"
          placeholder="Collaboration, contract role, …"
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="message"
          className="text-xs uppercase tracking-[0.2em] text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="resize-y rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-zinc-600 focus:border-white/25"
          placeholder="Tell me about timelines, stack, and what success looks like."
        />
      </div>

      {status === "error" ? (
        <p className="text-sm text-amber-200" role="alert">
          {errorMessage ? `${errorMessage} ` : "Something went wrong sending your message. "}
          You can email me directly at{" "}
          <a className="text-foreground underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      ) : null}

      {status === "sent" ? (
        <p className="text-sm text-muted">
          Sent. I’ll reply soon. If you need to follow up, email{" "}
          <a className="text-foreground underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      ) : null}

      <Magnetic className="inline-block w-full sm:w-auto" strength={0.36}>
        <motion.button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          data-cursor-hover
          whileHover={reduce ? undefined : { scale: 1.02, y: -0.5 }}
          whileTap={reduce ? undefined : { scale: 0.985 }}
          transition={TRANSITION_MICRO}
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </motion.button>
      </Magnetic>
    </form>
  );
}
