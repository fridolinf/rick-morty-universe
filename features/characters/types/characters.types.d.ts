export type TFetchCharactersParams = {
  name?: string;
  status?: string;
  page?: number;
  species?: string;
  gender?: string;
};

export interface CharactersDetail {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharactersResponse {
  results: CharactersDetail[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export type CharactersFilterKey = "status" | "species" | "gender";

export type CharactersFilter = {
  status: string;
  species: string;
  gender: string;
};
