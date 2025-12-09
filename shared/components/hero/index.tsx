import { cn } from "@/shared/lib/utils";
import { AtomIcon, HeartIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import { HeroStat } from "./hero-stat";

export default function HomeHero() {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border",
        "bg-linear-to-br from-emerald-100/40 via-white to-purple-100/40 dark:from-emerald-500/20 dark:via-slate-950 dark:to-purple-700/30",
        "border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.25)]",
        "px-4 py-6",
        "lg:my-10 my-7",
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      )}
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/30 blur-3xl" />
        <div className="absolute -right-10 -bottom-10 h-52 w-52 rounded-full bg-purple-500/40 blur-3xl" />
      </div>

      <div className="relative max-w-xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border dark:border-emerald-300/40 dark:bg-black/40 px-3 py-1 text-xs font-medium dark:text-emerald-200 border-emerald-200 bg-slate-900 text-emerald-300">
          <SparklesIcon className="h-3 w-3" />
          <span>Rick &amp; Morty Multiverse Explorer</span>
        </div>

        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-slate-950 dark:text-emerald-100 sm:text-4xl lg:text-5xl">
          Dive into the{" "}
          <span className="relative inline-block">
            <span className="relative z-10 dark:text-emerald-300 text-slate-900 text-shadow-2xs text-shadow-white drop-shadow-[0_0_5px_rgba(52,211,153,0.9)]">
              multiverse
            </span>
            <span className="absolute -inset-1 rounded-full bg-emerald-400/20 blur-sm" />
          </span>{" "}
          of characters.
        </h1>

        <div className="dark:text-emerald-50/80 text-slate-900 sm:text-base">
          Built on the public:{" "}
          <Link
            href="https://rickandmortyapi.com/documentation"
            target="_blank"
            className="font-semibold text-slate-950 text-shadow-sm text-shadow-emerald-100 dark:text-shadow-none dark:text-emerald-200"
          >
            Rick and Morty API.
          </Link>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="relative mt-4 flex w-full flex-col gap-3 sm:mt-0 sm:w-auto">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-1 sm:gap-3">
          <HeroStat
            icon={AtomIcon}
            label="Characters"
            value="800+"
            hint="From all known dimensions"
          />
          <HeroStat
            icon={SparklesIcon}
            label="Episodes"
            value="50+"
            hint="Explore your favorite episodes"
          />
          <HeroStat
            icon={HeartIcon}
            label="Add to your favorites"
            hint="Toggle hearts on any card"
          />
        </div>

        <p className="text-xs text-slate-900 dark:text-emerald-100/80 sm:text-xs">
          Tip: use{" "}
          <span className="rounded-full bg-slate-950 dark:bg-black/40 px-2 py-0.5 font-semibold text-emerald-200">
            Search
          </span>{" "}
          and{" "}
          <span className="rounded-full bg-slate-950 dark:bg-black/40 px-2 py-0.5 font-semibold text-emerald-200">
            Filters
          </span>{" "}
          above the grid to quickly find who you&apos;re looking for.
        </p>
      </div>
    </section>
  );
}
