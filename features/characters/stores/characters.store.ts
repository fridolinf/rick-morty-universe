"use client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CharactersState {
  charactersFavorite: number[];
  toggleCharactersFavorite: (id: number) => void;
}

export const useCharactersStore = create<CharactersState>()(
  devtools(
    persist(
      (set, get) => ({
        charactersFavorite: [],

        toggleCharactersFavorite: (id) => {
          const favorites = get().charactersFavorite;
          const exists = favorites.includes(id);

          if (exists) {
            set({
              charactersFavorite: favorites.filter((favId) => favId !== id),
            });
          } else {
            set({
              charactersFavorite: [...favorites, id],
            });
          }
        },
      }),
      { name: "characters-store" }
    )
  )
);
