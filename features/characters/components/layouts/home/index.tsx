"use client";

import { useFetchCharacters } from "@/features/characters/hooks/use-characters-fetch";
import {
  CharactersFilter,
  CharactersFilterKey,
} from "@/features/characters/types/characters.types";
import NavigationTabs from "@/shared/components/navigation-tabs";
import PageTransition from "@/shared/components/page-transitions";
import useDebounce from "@/shared/hooks/use-debounce";
import { useState } from "react";
import HomeHero from "../../../../../shared/components/hero";
import { CharactersFilters } from "../../characters-home/characters-filter";
import CharacterList from "../../characters-home/characters-list";

const INITIAL_FILTERS: CharactersFilter = {
  status: "",
  species: "",
  gender: "",
};

export default function HomeLayout() {
  const [searchName, setSearchName] = useState("");
  const [filtersDraft, setFiltersDraft] =
    useState<CharactersFilter>(INITIAL_FILTERS);
  const [filtersApplied, setFiltersApplied] =
    useState<CharactersFilter>(INITIAL_FILTERS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  const searchNameDebounce = useDebounce(searchName);

  const { data, isLoading } = useFetchCharacters({
    name: searchNameDebounce,
    status: filtersApplied.status,
    gender: filtersApplied.gender,
    species: filtersApplied.species,
    page,
  });

  const characters = data?.results ?? [];
  const totalPages = data?.info.pages ?? 1;
  const totalCount = data?.info.count ?? 0;

  const handleSearchNameChange = (value: string) => {
    setSearchName(value);
    setPage(1);
  };

  const handleFilterChange = (key: CharactersFilterKey, value: string) => {
    setFiltersDraft((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
  };

  const handleApplyFilters = () => {
    setFiltersApplied(filtersDraft);
    setPage(1);
    setIsFilterOpen(false);
  };

  const handleResetDraft = () => {
    setFiltersDraft(filtersApplied);
  };

  const handleResetAllFilter = () => {
    setFiltersDraft(INITIAL_FILTERS);
  };

  return (
    <PageTransition>
      <div className="px-4 sm:px-6 lg:px-10 h-full">
        <HomeHero />
        <NavigationTabs />

        <CharactersFilters
          isLoading={isLoading}
          searchName={searchName}
          totalCount={totalCount}
          filtersDraft={filtersDraft}
          filtersApplied={filtersApplied}
          isFilterOpen={isFilterOpen}
          onFilterOpenChange={setIsFilterOpen}
          onSearchNameChange={handleSearchNameChange}
          onFilterChange={handleFilterChange}
          onApplyFilters={handleApplyFilters}
          onResetDraft={handleResetDraft}
          onResetAllFilter={handleResetAllFilter}
        />
        <CharacterList
          isLoading={isLoading}
          characters={characters}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </PageTransition>
  );
}
