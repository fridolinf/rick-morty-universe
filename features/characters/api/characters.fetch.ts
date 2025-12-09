import { charactersQueryInput } from "@/features/characters/queries/characters.query";
import { http } from "@/shared/api/http";
import {
  CharactersDetail,
  CharactersResponse,
  TFetchCharactersParams,
} from "../types/characters.types";
import { ENDPOINT_CHARACTERS } from "./characters.endpoint";

export async function fetchCharacters(params?: TFetchCharactersParams) {
  const { queryParams } = charactersQueryInput(params);

  const res = await http.get<CharactersResponse>(ENDPOINT_CHARACTERS.base, {
    params: queryParams,
  });
  return res.data;
}

export async function fetchCharacterDetail(characterId: number) {
  const res = await http.get<CharactersDetail>(
    `${ENDPOINT_CHARACTERS.base}/${characterId}`
  );
  return res.data;
}

export async function fetchMultipleCharacter(characterId: string | string[]) {
  const res = await http.get<CharactersDetail[]>(
    `${ENDPOINT_CHARACTERS.base}/${characterId}`
  );
  return res.data;
}
