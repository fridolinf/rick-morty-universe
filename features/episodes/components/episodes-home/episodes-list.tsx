"use client";
import { Skeleton } from "@/shared/components/ui/skeleton";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import { EMPTY_EPISODE } from "../../constants/episodes-empty";
import { EpisodesDetail } from "../../types/episodes.types";
import EpisodeCard from "../episodes-card";
import { EpisodesPagination } from "./episodes-pagination";

type EpisodesListProps = {
  episodes?: EpisodesDetail[];
  isLoading: boolean;
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

export default function EpisodesList({
  episodes,
  isLoading,
  page,
  setPage,
  totalPages,
}: Readonly<EpisodesListProps>) {
  const skeletonCount = 8;
  const showList = isLoading || (episodes && episodes?.length > 0);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > (totalPages || 0)) return;
    if (nextPage === page) return;
    setPage?.(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section>
      {showList ? (
        <>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: skeletonCount }).map((_, idx) => (
                  <li key={idx + skeletonCount} className="h-full">
                    <EpisodeCard episode={EMPTY_EPISODE} isLoading />
                  </li>
                ))
              : episodes?.map((ep) => (
                  <li key={ep.id} className="h-full">
                    <EpisodeCard episode={ep} isLoading={false} />
                  </li>
                ))}
          </ol>

          {!isLoading && (
            <EpisodesPagination
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
    </section>
  );
}
