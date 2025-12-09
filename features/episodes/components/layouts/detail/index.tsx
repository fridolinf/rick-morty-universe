"use client";
import CharacterList from "@/features/characters/components/characters-home/characters-list";
import { useFetchMultiCharacter } from "@/features/characters/hooks/use-characters-fetch";
import { useFetchEpisodeById } from "@/features/episodes/hooks/use-episodes-fetch";
import PageTransition from "@/shared/components/page-transitions";
import { Skeleton } from "@/shared/components/ui/skeleton";
import dynamic from "next/dynamic";
import Link from "next/link";
import EpisodeCard from "../../episodes-card";

type EpisodesDetailLayoutProps = { episodeId: string };

const DefaultEmpty = dynamic(
  () => import("@/shared/components/empty-media/default-empty"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col gap-4">
        <Skeleton className="max-w-52 w-full h-52 flex mx-auto" />
        <Skeleton className="max-w-32 w-full h-10 flex mx-auto" />
      </div>
    ),
  }
);

export default function EpisodesDetailLayout({
  episodeId,
}: Readonly<EpisodesDetailLayoutProps>) {
  const { data: episodeDetail, isLoading } = useFetchEpisodeById(
    Number.parseInt(episodeId, 10)
  );

  const { data: characters, isLoading: isLoadingMultiCharacter } =
    useFetchMultiCharacter(episodeDetail?.characters);

  if (isLoading) {
    return (
      <article className="h-full rounded-3xl border border-slate-800/70 bg-slate-950/80 p-3 shadow-md">
        <div className="flex h-full flex-col gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 flex-1 rounded-md" />
          </div>
          <Skeleton className="h-4 w-32 rounded-md" />
          <div className="mt-auto flex items-center justify-between">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
        </div>
      </article>
    );
  }

  if (!episodeDetail)
    return (
      <div className="m-5">
        <Link
          href="/episodes"
          className="rounded-full bg-gray-900 text-white dark:bg-emerald-100 dark:text-gray-950 px-3 py-1 text-sm w-fit"
        >
          ← Back to episodes
        </Link>
        <DefaultEmpty title="No episode found" />
      </div>
    );

  return (
    <PageTransition>
      <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-10 mt-5">
        <Link
          href="/episodes"
          className="rounded-full bg-gray-900 text-white dark:bg-emerald-100 dark:text-gray-950 px-3 py-1 text-sm w-fit"
        >
          ← Back to episodes
        </Link>
        <EpisodeCard episode={episodeDetail} isDetail isLoading={isLoading} />
        {/* characters grid */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold dark:text-emerald-500">
              Characters in this episode
            </h2>
            <p className="text-xs dark:text-emerald-300/80">
              {characters?.length ?? 0} character
              {(characters?.length ?? 0) > 1 ? "s" : ""} appear here.
            </p>
          </div>

          <CharacterList
            characters={characters}
            isLoading={isLoadingMultiCharacter}
          />
        </section>
      </div>
    </PageTransition>
  );
}
