const CHARACTER_ID_REGEX = /\/character\/(\d+)$/;

export function extractCharacterIdsFromUrls(urls: string[] = []): string[] {
  const ids = urls
    .map((url) => {
      const match = CHARACTER_ID_REGEX.exec(url);
      if (!match) return undefined;

      const num = Number.parseInt(match[1], 10);
      return Number.isNaN(num) ? undefined : num;
    })
    .filter((id): id is number => typeof id === "number");

  return Array.from(new Set(ids.map((n) => n.toString())));
}
