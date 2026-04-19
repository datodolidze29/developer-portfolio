import dynamic from "next/dynamic";
import { Hero } from "@/components/home/hero";

const FeaturedWork = dynamic(
  () =>
    import("@/components/home/featured-work").then((mod) => ({
      default: mod.FeaturedWork,
    })),
  {
    loading: () => (
      <section
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        aria-hidden
      >
        <div className="h-6 w-40 animate-pulse rounded-full bg-white/[0.06]" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="aspect-[16/11] animate-pulse rounded-2xl bg-white/[0.04]" />
          <div className="aspect-[16/11] animate-pulse rounded-2xl bg-white/[0.04]" />
        </div>
      </section>
    ),
  },
);

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
    </>
  );
}
