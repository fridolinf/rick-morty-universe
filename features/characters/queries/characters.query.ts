import { cleanQueryParams } from "@/shared/api/query";
import { TFetchCharactersParams } from "../types/characters.types";

export function normalizeCharactersParams(params?: TFetchCharactersParams) {
  return {
    page: params?.page ?? 1,
    name: params?.name,
    status: params?.status,
    species: params?.species,
    gender: params?.gender,
  };
}

export function charactersQueryInput(params?: TFetchCharactersParams) {
  const normalizeParams = normalizeCharactersParams(params);
  const queryParams = cleanQueryParams(normalizeParams);
  return { normalizeParams, queryParams };
}

export const characterKeys = {
  list: (params: Record<string, string>) =>
    ["characters", "list", params] as const,
  detail: (characterId: number) =>
    ["characters", "detail", characterId] as const,
  multiCharacters: (ids: string[]) =>
    ["multi", "characters", "list", ids] as const,
};
