"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchEpisodes,
  fetchEpisodesDetail,
  fetchMultipleEpisode,
} from "../api/episodes.fetch";
import { episodesKeys, episodesQueryInput } from "../queries/episodes.query";
import { EpisodesDetail, TFetchEpisodesParams } from "../types/episodes.types";
import { extractEpisodeIdsFromUrls } from "../utils/extract-episode-ids";

export const useFetchEpisodes = (params: TFetchEpisodesParams = {}) => {
  const { normalizeParams, queryParams } = episodesQueryInput(params);

  return useQuery({
    queryKey: episodesKeys.list(queryParams),
    queryFn: () => fetchEpisodes(normalizeParams),
    placeholderData: (prev) => prev,
  });
};

export const useFetchEpisodeById = (episodeId: number) =>
  useQuery({
    enabled: Boolean(episodeId),
    queryKey: episodesKeys.detail(episodeId),
    queryFn: () => fetchEpisodesDetail(episodeId),
  });

export function useFetchMultiEpisode(episodeUrls: string[] | undefined) {
  const ids = extractEpisodeIdsFromUrls(episodeUrls ?? []);

  return useQuery<EpisodesDetail[]>({
    queryKey: episodesKeys.multiEpisodes(ids),
    queryFn: () => fetchMultipleEpisode(ids),
    enabled: ids.length > 0,
  });
}
