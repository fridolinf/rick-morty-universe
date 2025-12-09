"use client";
import { SEASON_COLORS } from "@/features/characters/constants/season-colors";
import { getSeasonNumber } from "@/features/characters/utils/get-session-number";
import ButtonFavorite from "@/shared/components/button-favorite";
import { Badge } from "@/shared/components/ui/badge";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/lib/utils";
import { CalendarDaysIcon, TvIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { memo, MouseEvent } from "react";
import { useShallow } from "zustand/react/shallow";
import { useEpisodesStore } from "../../stores/episodes.store";
import { EpisodesDetail } from "../../types/episodes.types";

type EpisodeCardProps = {
  episode: EpisodesDetail;
  isLoading: boolean;
  isDetail?: boolean;
};

function EpisodeCardComponent({
  episode,
  isLoading,
  isDetail,
}: Readonly<EpisodeCardProps>) {
  const { isEpisodeFavorite, toogleEpisodeFavorite } = useEpisodesStore(
    useShallow((state) => ({
      toogleEpisodeFavorite: state.toggleEpisodesFavorite,
      isEpisodeFavorite: state.episodesFavorite.includes(episode?.id),
    }))
  );

  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!episode?.id) return;
    event.preventDefault();
    event.stopPropagation();
    toogleEpisodeFavorite(episode.id);
  };

  if (isLoading || !episode) {
    return (
      <article className="h-full rounded-3xl border border-slate-800/70 bg-slate-950/80 p-3 shadow-md">
        <div className="flex h-full flex-col gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 flex-1 rounded-md" />
          </div>
          <Skeleton className="h-4 w-32 rounded-md" />
          <div className="mt-auto flex items-center justify-between">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
        </div>
      </article>
    );
  }

  const seasonNumber = getSeasonNumber(episode.episode);

  const charactersCount = Array.isArray(episode.characters)
    ? episode.characters.length
    : undefined;

  const baseCard = (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border p-px",
        "bg-slate-950",
        seasonNumber && SEASON_COLORS[seasonNumber]
          ? SEASON_COLORS[seasonNumber]
          : "border-slate-700/80 bg-linear-to-br from-emerald-500/10 via-slate-950 to-purple-900/30",
        "transition-shadow duration-200 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(16,185,129,0.45)]",
        isEpisodeFavorite &&
          "shadow-[0_0_15px_rgba(52,211,153,0.9)] border-emerald-400/70"
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b from-white/10 via-white/0 to-transparent opacity-40" />

      <div className="relative flex h-full flex-col rounded-[22px] bg-slate-950/90 p-3">
        {/* Episode code and season badge */}
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-1.5">
              <Badge className="flex items-center gap-1 border border-emerald-400/60 bg-black/50 text-[0.7rem] font-semibold uppercase tracking-wide text-emerald-100">
                <TvIcon className="h-3.5 w-3.5" />
                {episode.episode}
              </Badge>
              {seasonNumber && (
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-100">
                  Season {seasonNumber}
                </span>
              )}
            </div>
            <h2 className="text-sm font-semibold leading-snug text-emerald-50 line-clamp-2">
              {episode.name}
            </h2>

            <div className="absolute right-3 top-3 z-10">
              <ButtonFavorite
                isFavorite={isEpisodeFavorite}
                handleFavoriteClick={handleFavoriteClick}
              />
            </div>
          </div>
        </div>

        {/* meta */}
        <div className="mt-1 flex flex-wrap gap-2 text-[0.7rem] text-slate-300/90">
          {episode.air_date && (
            <div className="inline-flex items-center gap-1.5">
              <CalendarDaysIcon className="h-3.5 w-3.5 text-emerald-200/90" />
              <span className="text-[0.7rem]">{episode.air_date}</span>
            </div>
          )}

          {typeof charactersCount === "number" && charactersCount > 0 && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 px-2 py-0.5 text-[0.7rem] text-slate-100">
              <UsersIcon className="h-3.5 w-3.5 text-emerald-200/90" />
              <span>
                {charactersCount} character{charactersCount > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between text-[0.7rem] text-slate-300/80">
          <p
            className={cn(
              isDetail ? "max-w-full" : "max-w-[70%]",
              "truncate text-xs text-slate-400"
            )}
          >
            First aired on{" "}
            <span
              data-testid="test-air-date-val"
              className="font-medium text-emerald-100"
            >
              {episode.air_date || "Unknown date"}
            </span>
          </p>
          {!isDetail && (
            <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-emerald-200/90">
              View details →
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (isDetail) {
    return baseCard;
  }

  return (
    <Link
      href={`/episodes/${episode.id}`}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-3xl"
    >
      {baseCard}
    </Link>
  );
}

export const EpisodeCard = memo(EpisodeCardComponent);
export default EpisodeCard;
