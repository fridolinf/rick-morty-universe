import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EpisodesFilterComponent } from "@/features/episodes/components/episodes-home/episodes-filter";

describe("EpisodesFilterComponent", () => {
  it("calls onSearchNameChange when user types in the search input", () => {
    const handleSearchNameChange = vi.fn();

    render(
      <EpisodesFilterComponent
        isLoading={false}
        searchName=""
        totalCount={0}
        onSearchNameChange={handleSearchNameChange}
      />
    );

    const input = screen.getByPlaceholderText("Search episode name...");

    fireEvent.change(input, { target: { value: "Pilot" } });

    expect(handleSearchNameChange).toHaveBeenCalledWith("Pilot");
  });

  it("shows total results when searchName is not empty", () => {
    render(
      <EpisodesFilterComponent
        isLoading={false}
        searchName="Pilot"
        totalCount={3}
        onSearchNameChange={() => {}}
      />
    );

    expect(screen.getByText("3 results")).toBeInTheDocument();
  });
});
