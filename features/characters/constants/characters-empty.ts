import { CharactersDetail } from "../types/characters.types";

export const EMPTY_CHARACTER: CharactersDetail = {
  id: 0,
  name: "",
  status: "unknown",
  species: "",
  type: "",
  gender: "",
  origin: { name: "", url: "" },
  location: { name: "", url: "" },
  image: "",
  episode: [],
  url: "",
  created: "",
};
