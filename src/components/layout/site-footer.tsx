import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © <span suppressHydrationWarning>{year}</span> {site.name}. Crafted with Next.js.
        </p>
        <p className="text-xs uppercase tracking-[0.2em]">{site.location}</p>
      </div>
    </footer>
  );
}
