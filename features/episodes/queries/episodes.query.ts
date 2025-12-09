import { cleanQueryParams } from "@/shared/api/query";
import { TFetchEpisodesParams } from "../types/episodes.types";

export function normalizeEpisodesParams(params?: TFetchEpisodesParams) {
  return {
    page: params?.page ?? 1,
    name: params?.name,
  };
}

export function episodesQueryInput(params?: TFetchEpisodesParams) {
  const normalizeParams = normalizeEpisodesParams(params);
  const queryParams = cleanQueryParams(normalizeParams);
  return { normalizeParams, queryParams };
}

export const episodesKeys = {
  list: (params: Record<string, string>) =>
    ["episodes", "list", params] as const,
  detail: (episodeId: number) => ["episodes", "detail", episodeId] as const,
  multiEpisodes: (ids: string[]) => ["multi", "episodes", "list", ids] as const,
};
