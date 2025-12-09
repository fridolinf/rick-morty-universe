"use client";

import ButtonFavorite from "@/shared/components/button-favorite";
import { Badge } from "@/shared/components/ui/badge";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { memo, MouseEvent } from "react";
import { useShallow } from "zustand/react/shallow";
import { BADGE_STATUS_COLOR_CLASSES } from "../../constants/status-colors";
import { useCharactersStore } from "../../stores/characters.store";
import { CharactersDetail } from "../../types/characters.types";

type CharacterCardProps = {
  character: CharactersDetail;
  isLoading: boolean;
  isDetail?: boolean;
  priorityImage?: boolean;
};

function CharacterCardComponent({
  character,
  isLoading,
  isDetail,
  priorityImage,
}: Readonly<CharacterCardProps>) {
  const { isCharacterFavorite, toggleCharactersFavorite } = useCharactersStore(
    useShallow((state) => ({
      toggleCharactersFavorite: state.toggleCharactersFavorite,
      isCharacterFavorite: state.charactersFavorite.includes(character.id),
    }))
  );

  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleCharactersFavorite(character.id);
  };

  const characterDeadOrUnkown =
    character.status === "Dead" ? "💀 Dead or worse" : "❓ Unknown";

  const renderedCharacterStatus =
    character.status === "Alive" ? "🧬 Still alive" : characterDeadOrUnkown;

  if (isLoading) {
    return (
      <article className="h-full rounded-3xl border border-slate-800/70 bg-slate-950/80 p-3 shadow-lg">
        <div className="flex flex-col gap-3">
          <Skeleton className="aspect-3/4 w-full rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </article>
    );
  }

  const cardInner = (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border p-px",
        "bg-linear-to-b from-emerald-500/20 via-slate-950 to-slate-950",
        "transition-transform duration-200 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(16,185,129,0.35)]",
        isCharacterFavorite &&
          "shadow-[0_0_15px_rgba(52,211,153,0.9)] border-emerald-400/70"
      )}
    >
      {/* inner wrapper */}
      <div className="relative flex flex-1 flex-col rounded-3xl bg-slate-950/90 p-2.5">
        {/* favorite toggle */}
        <div className="absolute right-3 top-3 z-10">
          <ButtonFavorite
            isFavorite={isCharacterFavorite}
            handleFavoriteClick={handleFavoriteClick}
          />
        </div>

        {/* image */}
        <div className="relative mb-3 overflow-hidden rounded-2xl">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <Image
            src={character.image}
            alt={character.name}
            width={300}
            height={400}
            priority={priorityImage}
            className={cn(
              "aspect-3/4 w-full object-cover",
              "transition-transform duration-200 group-hover:scale-105"
            )}
          />
        </div>

        {/* text & meta */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-sm font-semibold leading-snug text-emerald-50 line-clamp-2">
              {character.name}
            </h2>

            <Badge
              className={cn(
                "ml-auto whitespace-nowrap border text-xs font-semibold uppercase tracking-wide",
                BADGE_STATUS_COLOR_CLASSES[character.status] ??
                  BADGE_STATUS_COLOR_CLASSES[character.status?.toLowerCase()] ??
                  "border-slate-500/50 bg-slate-700/60 text-slate-100"
              )}
            >
              {character.status}
            </Badge>
          </div>

          <p className="text-xs text-slate-300/80">
            {character.species}
            {character.gender ? (
              <span className="text-slate-500"> • {character.gender}</span>
            ) : null}
          </p>

          {character.origin?.name && (
            <p className="text-xs text-slate-400 line-clamp-1">
              <span className="text-slate-500">Origin:</span>{" "}
              <span>{character.origin.name}</span>
            </p>
          )}

          <div className="mt-auto pt-1">
            <div className="flex flex-wrap gap-1.5">
              {character.status && (
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-200">
                  {renderedCharacterStatus}
                </span>
              )}
              {character.location?.name && (
                <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-200 line-clamp-1">
                  📍 {character.location.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );

  if (isDetail) {
    return cardInner;
  }

  return (
    <Link
      href={`/characters/${character.id}`}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-3xl"
    >
      {cardInner}
    </Link>
  );
}

export const CharacterCard = memo(CharacterCardComponent);
export default CharacterCard;
