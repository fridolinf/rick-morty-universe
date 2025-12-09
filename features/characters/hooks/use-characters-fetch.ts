"use client";

import {
  characterKeys,
  charactersQueryInput,
} from "@/features/characters/queries/characters.query";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCharacterDetail,
  fetchCharacters,
  fetchMultipleCharacter,
} from "../api/characters.fetch";
import {
  CharactersDetail,
  TFetchCharactersParams,
} from "../types/characters.types";
import { extractCharacterIdsFromUrls } from "../utils/extract-character-ids";

export const useFetchCharacters = (params: TFetchCharactersParams = {}) => {
  const { normalizeParams, queryParams } = charactersQueryInput(params);

  return useQuery({
    queryKey: characterKeys.list(queryParams),
    queryFn: () => fetchCharacters(normalizeParams),
    placeholderData: (prev) => prev,
  });
};

export const useFetchCharacterById = (characterId: number) =>
  useQuery({
    enabled: Boolean(characterId),
    queryKey: characterKeys.detail(characterId),
    queryFn: () => fetchCharacterDetail(characterId),
  });

export function useFetchMultiCharacter(characterUrls: string[] | undefined) {
  const ids = extractCharacterIdsFromUrls(characterUrls ?? []);

  return useQuery<CharactersDetail[]>({
    queryKey: characterKeys.multiCharacters(ids),
    queryFn: () => fetchMultipleCharacter(ids),
    enabled: ids.length > 0,
  });
}
