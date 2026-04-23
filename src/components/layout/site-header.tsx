"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useState } from "react";
import { site } from "@/lib/site";
import { HoverLift } from "@/components/motion/hover-lift";
import { EASE_PREMIUM } from "@/components/motion/constants";
import { useHydrationSafeReducedMotion } from "@/hooks/use-hydration-safe-reduced-motion";

const SCROLL_SOLID_AT = 12;

type NavItem = {
  id: string;
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

function useDocumentHash() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  const read = useCallback(() => {
    setHash(window.location.hash.slice(1).toLowerCase());
  }, []);

  useEffect(() => {
    queueMicrotask(read);
    window.addEventListener("hashchange", read);
    window.addEventListener("popstate", read);
    return () => {
      window.removeEventListener("hashchange", read);
      window.removeEventListener("popstate", read);
    };
  }, [read]);

  useEffect(() => {
    queueMicrotask(read);
  }, [pathname, read]);

  return hash;
}

function isActive(item: NavItem, pathname: string, hash: string) {
  if (item.id === "home") {
    return pathname === "/" && (!hash || hash === "");
  }
  if (item.id === "projects") return pathname.startsWith("/projects");
  if (item.id === "about") return pathname.startsWith("/about");
  if (item.id === "contact") return pathname.startsWith("/contact");
  return false;
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex w-[18px] flex-col gap-[5px]" aria-hidden>
      <motion.span
        className="block h-px w-full rounded-full bg-current"
        animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.22, ease: EASE_PREMIUM }}
        style={{ transformOrigin: "center" }}
      />
      <motion.span
        className="block h-px w-full rounded-full bg-current"
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.6 : 1 }}
        transition={{ duration: 0.16, ease: EASE_PREMIUM }}
      />
      <motion.span
        className="block h-px w-full rounded-full bg-current"
        animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.22, ease: EASE_PREMIUM }}
        style={{ transformOrigin: "center" }}
      />
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const hash = useDocumentHash();
  const reduce = useHydrationSafeReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_SOLID_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    queueMicrotask(() => setMobileOpen(false));
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const shell = scrolled
    ? "border-white/[0.08] bg-background/90 shadow-[0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl"
    : "border-transparent bg-transparent";

  return (
    <>
      <header
        className={`sticky top-0 z-[60] border-b transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-out ${shell}`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[3.75rem] sm:px-6 lg:px-8">
          <HoverLift className="inline-block min-w-0 shrink">
            <Link
              href="/"
              className="group inline-flex min-w-0 items-baseline gap-2 text-sm font-medium tracking-tight text-foreground"
              data-cursor-hover
            >
              <span className="truncate font-heading text-base font-semibold sm:text-lg">
                {site.name.split(" ")[0]}
              </span>
              <span className="hidden shrink-0 text-muted sm:inline">· {site.role}</span>
            </Link>
          </HoverLift>

          <nav
            className="hidden items-center gap-0.5 md:flex md:gap-1"
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const active = isActive(item, pathname, hash);
              return (
                <HoverLift key={item.id} className="inline-block">
                  <Link
                    href={item.href}
                    className={`relative block rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] transition-colors sm:text-[0.7rem] ${
                      active ? "text-foreground" : "text-muted hover:text-foreground"
                    }`}
                    data-cursor-hover
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.08] ring-1 ring-white/[0.1]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                </HoverLift>
              );
            })}
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-foreground md:hidden"
            aria-expanded={mobileOpen}
            aria-controls={panelId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
            data-cursor-hover
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              key="nav-backdrop"
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-[2px] md:hidden"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE_PREMIUM }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="nav-panel"
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="fixed inset-x-0 bottom-0 top-14 z-[56] flex max-h-[min(100dvh,100svh)] flex-col overflow-y-auto border-t border-white/[0.08] bg-background/95 px-6 py-6 backdrop-blur-xl md:hidden"
              initial={reduce ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: EASE_PREMIUM }}
            >
              <nav className="flex flex-col gap-1" aria-label="Mobile primary">
                {navItems.map((item, index) => {
                  const active = isActive(item, pathname, hash);
                  return (
                    <motion.div
                      key={item.id}
                      initial={reduce ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: reduce ? 0 : 0.04 + index * 0.05,
                        duration: 0.3,
                        ease: EASE_PREMIUM,
                      }}
                    >
                      <Link
                        href={item.href}
                        className={`block rounded-xl px-4 py-3.5 text-sm font-medium tracking-wide transition-colors ${
                          active
                            ? "bg-white/[0.08] text-foreground ring-1 ring-white/[0.1]"
                            : "text-muted hover:bg-white/[0.04] hover:text-foreground"
                        }`}
                        onClick={() => setMobileOpen(false)}
                        data-cursor-hover
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
