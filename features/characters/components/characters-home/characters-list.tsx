"use client";
import { Skeleton } from "@/shared/components/ui/skeleton";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import { EMPTY_CHARACTER } from "../../constants/characters-empty";
import { CharactersDetail } from "../../types/characters.types";
import CharacterCard from "../characters-card";
import { CharactersPagination } from "./characters-pagination";

type CharacterListProps = {
  isLoading: boolean;
  characters?: CharactersDetail[];
  totalPages?: number;
  page?: number;
  setPage?: Dispatch<SetStateAction<number>>;
};

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

export default function CharacterList({
  isLoading,
  characters,
  page,
  setPage,
  totalPages,
}: Readonly<CharacterListProps>) {
  const showList = isLoading || (characters && characters?.length > 0);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > (totalPages || 0)) return;
    if (nextPage === page) return;
    setPage?.(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showList ? (
        <>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-10">
            {isLoading
              ? Array.from({ length: 20 }).map((_, idx) => (
                  <li key={`character-skeleton-${idx + 20}`} className="h-full">
                    <CharacterCard
                      character={EMPTY_CHARACTER}
                      isLoading
                      priorityImage={false}
                    />
                  </li>
                ))
              : characters?.map((character, idx) => (
                  <li
                    key={character.id}
                    className="rounded-2xl relative h-full"
                  >
                    <CharacterCard
                      character={character}
                      isLoading={false}
                      priorityImage={page === 1 && idx < 7}
                    />
                  </li>
                ))}
          </ol>

          {!isLoading && (
            <CharactersPagination
              currentPage={page ?? 0}
              totalPages={totalPages ?? 0}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div>
          <DefaultEmpty />
        </div>
      )}
    </>
  );
}
