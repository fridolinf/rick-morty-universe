"use client";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Filter, SearchIcon } from "lucide-react";
import { ChangeEvent } from "react";
import {
  CharactersFilter,
  CharactersFilterKey,
} from "../../types/characters.types";

const CHARACTERS_STATUS = ["Alive", "Dead", "unknown"] as const;
const CHARACTERS_SPECIES = ["Alien", "Human"] as const;
const CHARACTERS_GENDER = ["Male", "Female", "unknown"] as const;

type CharactersFiltersProps = {
  isLoading: boolean;
  searchName: string;
  totalCount?: number;
  filtersDraft: CharactersFilter;
  filtersApplied: CharactersFilter;
  isFilterOpen: boolean;
  onFilterOpenChange: (open: boolean) => void;
  onSearchNameChange: (value: string) => void;
  onFilterChange: (key: CharactersFilterKey, value: string) => void;
  onApplyFilters: () => void;
  onResetDraft: () => void;
  onResetAllFilter: () => void;
};

export function CharactersFilters({
  isLoading,
  searchName,
  totalCount,
  filtersDraft,
  filtersApplied,
  isFilterOpen,
  onFilterOpenChange,
  onSearchNameChange,
  onFilterChange,
  onApplyFilters,
  onResetDraft,
  onResetAllFilter,
}: Readonly<CharactersFiltersProps>) {
  const hasFilterChanges =
    filtersDraft.status !== filtersApplied.status ||
    filtersDraft.species !== filtersApplied.species ||
    filtersDraft.gender !== filtersApplied.gender;

  const isAnyFilter =
    filtersApplied.status || filtersApplied.species || filtersApplied.gender;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchNameChange(e.target.value);
  };

  const handleFilter = (key: CharactersFilterKey) => (value: string) => {
    onFilterChange(key, value);
  };

  return (
    <div className="my-6 z-10 w-full">
      {isLoading ? (
        <div className="flex md:flex-row flex-col items-center md:items-start mx-auto lg:max-w-1/2 gap-2 md:gap-4">
          <Skeleton className="h-11 w-full rounded-md" />
          <Skeleton className="h-11 w-28 rounded-md" />
        </div>
      ) : (
        <div className="flex md:flex-row flex-col items-center md:items-start mx-auto lg:max-w-1/2 gap-2 md:gap-4">
          <InputGroup className="bg-white">
            <InputGroupInput
              onChange={handleSearchChange}
              value={searchName}
              placeholder="Search characters..."
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>

            {searchName && (
              <InputGroupAddon align="inline-end">
                {totalCount ?? 0} results
              </InputGroupAddon>
            )}
          </InputGroup>

          <DropdownMenu open={isFilterOpen} onOpenChange={onFilterOpenChange}>
            <DropdownMenuTrigger asChild>
              <div className="flex gap-2 items-center">
                <Button variant="outline">
                  <Filter className="mr-2" />
                  Filters
                  {isAnyFilter && (
                    <Badge className="ml-2 text-xs" variant="secondary">
                      Active
                    </Badge>
                  )}
                </Button>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="flex flex-col gap-2 px-2">
              {isAnyFilter && (
                <Button
                  onClick={onResetAllFilter}
                  variant="destructive"
                  size="sm"
                >
                  <p>Remove all filter</p>
                </Button>
              )}

              <div className="flex gap-2 md:gap-6">
                {/* Status */}
                <div>
                  <DropdownMenuLabel className="text-center text-xs">
                    Status
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={filtersDraft.status}
                    onValueChange={handleFilter("status")}
                  >
                    {CHARACTERS_STATUS.map((status) => (
                      <DropdownMenuRadioItem
                        key={status}
                        value={status}
                        onSelect={(e) => e.preventDefault()}
                        className="capitalize text-xs"
                      >
                        {status}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </div>

                {/* Species */}
                <div>
                  <DropdownMenuLabel className="text-center text-xs">
                    Species
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={filtersDraft.species}
                    onValueChange={handleFilter("species")}
                  >
                    {CHARACTERS_SPECIES.map((species) => (
                      <DropdownMenuRadioItem
                        key={species}
                        value={species}
                        onSelect={(e) => e.preventDefault()}
                        className="text-xs"
                      >
                        {species}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </div>

                {/* Gender */}
                <div>
                  <DropdownMenuLabel className="text-center text-xs">
                    Gender
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={filtersDraft.gender}
                    onValueChange={handleFilter("gender")}
                  >
                    {CHARACTERS_GENDER.map((gender) => (
                      <DropdownMenuRadioItem
                        key={gender}
                        value={gender}
                        onSelect={(e) => e.preventDefault()}
                        className="capitalize text-xs"
                      >
                        {gender}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </div>
              </div>

              {hasFilterChanges && (
                <>
                  <DropdownMenuSeparator />
                  <div className="flex justify-between gap-2 px-1 pb-1">
                    <Button variant="ghost" size="sm" onClick={onResetDraft}>
                      Reset
                    </Button>
                    <Button size="sm" onClick={onApplyFilters}>
                      Apply filters
                    </Button>
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
