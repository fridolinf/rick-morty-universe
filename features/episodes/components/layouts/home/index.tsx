"use client";

import { useFetchEpisodes } from "@/features/episodes/hooks/use-episodes-fetch";
import HomeHero from "@/shared/components/hero";
import NavigationTabs from "@/shared/components/navigation-tabs";
import PageTransition from "@/shared/components/page-transitions";
import useDebounce from "@/shared/hooks/use-debounce";
import { useState } from "react";
import { EpisodesFilterComponent } from "../../episodes-home/episodes-filter";
import EpisodesList from "../../episodes-home/episodes-list";

export default function EpisodesLayout() {
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);

  const searchNameDebounce = useDebounce(searchName);

  const { data, isLoading } = useFetchEpisodes({
    name: searchNameDebounce,
    page,
  });

  const episodes = data?.results ?? [];
  const totalPages = data?.info.pages ?? 1;
  const totalCount = data?.info.count ?? 0;

  const handleSearchNameChange = (value: string) => {
    setSearchName(value);
    setPage(1);
  };

  return (
    <PageTransition>
      <div className="px-4 sm:px-6 lg:px-10 h-full">
        <HomeHero />
        <NavigationTabs />
        <EpisodesFilterComponent
          isLoading={isLoading}
          searchName={searchName}
          totalCount={totalCount}
          onSearchNameChange={handleSearchNameChange}
        />
        <EpisodesList
          isLoading={isLoading}
          episodes={episodes}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </PageTransition>
  );
}
