"use client";
import { useFetchCharacterById } from "@/features/characters/hooks/use-characters-fetch";
import EpisodesList from "@/features/episodes/components/episodes-home/episodes-list";
import { useFetchMultiEpisode } from "@/features/episodes/hooks/use-episodes-fetch";
import PageTransition from "@/shared/components/page-transitions";
import { Skeleton } from "@/shared/components/ui/skeleton";
import dynamic from "next/dynamic";
import Link from "next/link";
import CharacterDetailHero from "../../characters-detail";

type CharactersDetailLayoutProps = { characterId: string };

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

export default function CharactersDetailLayout({
  characterId,
}: Readonly<CharactersDetailLayoutProps>) {
  const {
    data: characterDetail,
    isLoading,
    isError,
  } = useFetchCharacterById(Number.parseInt(characterId, 10));

  const { data: episodes, isLoading: isLoadingMultiEpisode } =
    useFetchMultiEpisode(characterDetail?.episode);

  if (isLoading)
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full h-[300px] rounded-2xl" />
        <Skeleton className="w-1/2 h-6 mx-auto" />
      </div>
    );

  if (!characterDetail || isError)
    return (
      <div className="m-5">
        <Link
          href="/characters"
          className="rounded-full bg-gray-900 text-white dark:bg-emerald-100 dark:text-gray-950 px-3 py-1 text-sm w-fit"
        >
          ← Back to episodes
        </Link>
        <DefaultEmpty title="No characters found" />
      </div>
    );

  return (
    <PageTransition>
      <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-10 mt-5">
        <Link
          href="/"
          className="rounded-full bg-gray-900 text-white dark:bg-emerald-100 dark:text-gray-950 px-3 py-1 text-sm w-fit"
        >
          ← Back to characters
        </Link>

        <CharacterDetailHero character={characterDetail} />

        <section>
          <EpisodesList episodes={episodes} isLoading={isLoadingMultiEpisode} />
        </section>
      </div>
    </PageTransition>
  );
}
