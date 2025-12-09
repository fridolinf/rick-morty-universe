"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { SearchIcon } from "lucide-react";
import { ChangeEvent } from "react";

type EpisodesFilterProps = {
  isLoading: boolean;
  searchName: string;
  totalCount?: number;
  onSearchNameChange: (value: string) => void;
};

export function EpisodesFilterComponent({
  isLoading,
  searchName,
  totalCount,
  onSearchNameChange,
}: Readonly<EpisodesFilterProps>) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchNameChange(e.target.value);
  };

  return (
    <div className="my-10 z-10 w-full">
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
              placeholder="Search episode name..."
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
        </div>
      )}
    </div>
  );
}
