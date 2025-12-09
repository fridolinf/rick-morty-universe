import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EpisodeCard from "@/features/episodes/components/episodes-card";
import { EpisodesDetail } from "@/features/episodes/types/episodes.types";

const EPISODE: EpisodesDetail = {
  id: 3,
  name: "Anatomy Park",
  air_date: "December 16, 2013",
  episode: "S01E03",
  characters: [
    "https://rickandmortyapi.com/api/character/1",
    "https://rickandmortyapi.com/api/character/356",
  ],
  url: "https://rickandmortyapi.com/api/episode/3",
  created: "2017-11-10T12:56:34.022Z",
};

describe("EpisodeCard", () => {
  it("renders skeleton when loading", () => {
    render(<EpisodeCard episode={EPISODE} isLoading isDetail />);

    const skeletonElements = screen.getAllByRole("status");
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it("renders episode info when not loading", () => {
    render(<EpisodeCard episode={EPISODE} isLoading={false} isDetail />);

    expect(screen.getByText("Anatomy Park")).toBeInTheDocument();
    expect(screen.getByText("S01E03")).toBeInTheDocument();
    expect(screen.getByText(/Season 1/i)).toBeInTheDocument();
    expect(screen.getByTestId("test-air-date-val")).toBeInTheDocument();
    expect(screen.getByText(/2 characters?/i)).toBeInTheDocument();
  });
});
