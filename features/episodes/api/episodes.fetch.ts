import { http } from "@/shared/api/http";
import { episodesQueryInput } from "../queries/episodes.query";
import {
  EpisodesDetail,
  EpisodesResponse,
  TFetchEpisodesParams,
} from "../types/episodes.types";
import { ENDPOINT_EPISODES } from "./episodes.endpoint";

export async function fetchEpisodes(params?: TFetchEpisodesParams) {
  const { queryParams } = episodesQueryInput(params);

  const res = await http.get<EpisodesResponse>(ENDPOINT_EPISODES.base, {
    params: queryParams,
  });
  return res.data;
}

export async function fetchEpisodesDetail(episodeId: number) {
  const res = await http.get<EpisodesDetail>(
    `${ENDPOINT_EPISODES.base}/${episodeId}`
  );
  return res.data;
}

export async function fetchMultipleEpisode(episodeId: string | string[]) {
  const res = await http.get<EpisodesDetail[]>(
    `${ENDPOINT_EPISODES.base}/${episodeId}`
  );
  return res.data;
}
