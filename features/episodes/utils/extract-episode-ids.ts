const EPSODE_ID_REGEX = /\/episode\/(\d+)$/;

export function extractEpisodeIdsFromUrls(urls: string[] = []): string[] {
  const ids = urls
    .map((url) => {
      const match = EPSODE_ID_REGEX.exec(url);
      if (!match) return undefined;

      const num = Number.parseInt(match[1], 10);
      return Number.isNaN(num) ? undefined : num;
    })
    .filter((id): id is number => typeof id === "number");

  return Array.from(new Set(ids.map((n) => n.toString())));
}
