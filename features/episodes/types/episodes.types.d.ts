export type TFetchEpisodesParams = {
  name?: string;
  page?: number;
};

export interface EpisodesDetail {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface EpisodesResponse {
  results: EpisodesDetail[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}
