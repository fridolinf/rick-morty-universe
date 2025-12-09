import { CharactersPagination } from "@/features/characters/components/characters-home/characters-pagination";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("CharactersPagination", () => {
  it("does not render anything when totalPages is 1 or less", () => {
    const { container } = render(
      <CharactersPagination
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("calls onPageChange with the next page when Next is clicked", () => {
    const handlePageChange = vi.fn();

    render(
      <CharactersPagination
        currentPage={1}
        totalPages={3}
        onPageChange={handlePageChange}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next/i });

    fireEvent.click(nextButton);

    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it("does not call onPageChange when Previous is clicked on the first page", () => {
    const handlePageChange = vi.fn();

    render(
      <CharactersPagination
        currentPage={1}
        totalPages={3}
        onPageChange={handlePageChange}
      />
    );

    const prevButton = screen.getByRole("button", { name: /previous/i });

    fireEvent.click(prevButton);

    expect(handlePageChange).not.toHaveBeenCalled();
  });

  it("renders a button for each page", () => {
    render(
      <CharactersPagination
        currentPage={2}
        totalPages={4}
        onPageChange={() => {}}
      />
    );

    const pageButtons = screen
      .getAllByRole("button")
      .filter((btn) => /\d/.test(btn.textContent ?? ""));

    expect(pageButtons).toHaveLength(4);

    const labels = pageButtons.map((btn) => btn.textContent);
    expect(labels).toEqual(["1", "2", "3", "4"]);
  });
});
