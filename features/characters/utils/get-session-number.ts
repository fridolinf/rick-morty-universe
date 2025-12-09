export function getSeasonNumber(
  episodeCode?: string | null
): number | undefined {
  if (episodeCode?.includes("S01")) return 1;
  if (episodeCode?.includes("S02")) return 2;
  if (episodeCode?.includes("S03")) return 3;
  if (episodeCode?.includes("S04")) return 4;
  if (episodeCode?.includes("S05")) return 5;
  return undefined;
}
