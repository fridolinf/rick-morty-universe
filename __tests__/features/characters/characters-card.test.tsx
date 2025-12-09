import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CharacterCard from "@/features/characters/components/characters-card";
import { CharactersDetail } from "@/features/characters/types/characters.types";
import { useCharactersStore } from "@/features/characters/stores/characters.store";

const CHARACTER: CharactersDetail = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth (C-137)", url: "" },
  location: { name: "Earth (Replacement Dimension)", url: "" },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [],
  url: "",
  created: "",
};

describe("CharacterCard", () => {
  beforeEach(() => {
    act(() => {
      useCharactersStore.setState({ charactersFavorite: [] });
      useCharactersStore.persist?.clearStorage?.();
    });
  });

  it("renders character info when not loading", () => {
    render(
      <CharacterCard
        character={CHARACTER}
        isLoading={false}
        isDetail={false}
        priorityImage
      />
    );

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Alive")).toBeInTheDocument();

    expect(screen.getByText(/Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();

    expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
    expect(
      screen.getByText("📍 Earth (Replacement Dimension)")
    ).toBeInTheDocument();
  });

  it("adds character to favorites when heart is clicked", () => {
    render(
      <CharacterCard character={CHARACTER} isLoading={false} isDetail={false} />
    );

    const button = screen.getByRole("button", { name: /add to favorites/i });

    act(() => {
      fireEvent.click(button);
    });

    const favorites = useCharactersStore.getState().charactersFavorite;
    expect(favorites).toContain(CHARACTER.id);
  });
});
