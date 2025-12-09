"use client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface EpisodesState {
  episodesFavorite: number[];
  toggleEpisodesFavorite: (id: number) => void;
}

export const useEpisodesStore = create<EpisodesState>()(
  devtools(
    persist(
      (set, get) => ({
        episodesFavorite: [],

        toggleEpisodesFavorite: (id) => {
          const favorites = get().episodesFavorite;
          const exists = favorites.includes(id);

          if (exists) {
            set({
              episodesFavorite: favorites.filter((favId) => favId !== id),
            });
          } else {
            set({
              episodesFavorite: [...favorites, id],
            });
          }
        },
      }),
      { name: "episodes-store" }
    )
  )
);
