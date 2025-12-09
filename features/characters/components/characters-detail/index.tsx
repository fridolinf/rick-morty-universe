"use client";

import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import { HeartIcon, MapPinIcon, TvIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  STATUS_BADGE_CLASSES,
  STATUS_GRADIENT_CLASSES,
} from "../../constants/status-colors";
import { useCharactersStore } from "../../stores/characters.store";
import { CharactersDetail } from "../../types/characters.types";

type CharacterDetailHeroProps = {
  character: CharactersDetail;
};

export default function CharacterDetailHero({
  character,
}: Readonly<CharacterDetailHeroProps>) {
  const { isFavorite, toggleCharactersFavorite } = useCharactersStore(
    useShallow((state) => ({
      toggleCharactersFavorite: state.toggleCharactersFavorite,
      isFavorite: state.charactersFavorite.includes(character.id),
    }))
  );

  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleCharactersFavorite(character.id);
  };

  const statusKey =
    character.status in STATUS_GRADIENT_CLASSES
      ? character.status
      : character.status?.toLowerCase();

  const gradientClass =
    (statusKey && STATUS_GRADIENT_CLASSES[statusKey]) ??
    "from-emerald-500/20 via-slate-950/95 to-purple-700/40 border-emerald-400/50";

  const badgeClass =
    (statusKey && STATUS_BADGE_CLASSES[statusKey]) ??
    "border-slate-500/60 bg-slate-700/60 text-slate-100";

  const episodesCount = character.episode?.length ?? 0;

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-9",
        "bg-linear-to-br",
        gradientClass,
        "shadow-[0_20px_60px_rgba(15,23,42,0.7)]"
      )}
    >
      {/* subtle blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/35 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-44 w-44 rounded-full bg-purple-500/40 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
        {/* Image side */}
        <div className="mx-auto w-full max-w-xs shrink-0 lg:mx-0 lg:max-w-sm">
          <div className="relative rounded-2xl border border-emerald-400/40 bg-slate-950/70 p-2 shadow-[0_0_35px_rgba(52,211,153,0.7)]">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={character.image}
                alt={character.name}
                width={480}
                height={640}
                priority
                className="aspect-3/4 w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* floating small badge bottom-left */}
            <div className="absolute bottom-3 left-4 flex items-center gap-2">
              <Badge
                className={cn(
                  "border text-xs font-semibold uppercase tracking-wide",
                  badgeClass
                )}
              >
                {character.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Info side */}
        <div className="flex flex-1 flex-col gap-4 text-emerald-50">
          <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-100/80">
            <Link
              href="/"
              className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-emerald-100 hover:bg-emerald-500/20 transition-colors"
            >
              ← Back to characters
            </Link>
          </div>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-balance text-3xl font-extrabold tracking-tight text-emerald-50 sm:text-4xl lg:text-5xl">
                {character.name}
              </h1>
              <div className="flex flex-wrap gap-2">
                {character.species && (
                  <Badge className="border border-emerald-300/40 bg-black/40 text-xs font-medium text-emerald-100">
                    <UserIcon className="mr-1.5 h-3.5 w-3.5" />
                    {character.species}
                    {character.gender ? ` • ${character.gender}` : ""}
                  </Badge>
                )}
                {episodesCount > 0 && (
                  <Badge className="border border-purple-300/50 bg-purple-500/20 text-xs font-medium text-purple-50">
                    <TvIcon className="mr-1.5 h-3.5 w-3.5" />
                    Appears in {episodesCount} episode
                    {episodesCount > 1 ? "s" : ""}
                  </Badge>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleFavoriteClick}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold",
                "bg-black/40 text-emerald-50 backdrop-blur-sm transition-transform duration-150",
                "hover:scale-105 hover:bg-emerald-500/20 hover:border-emerald-300/70",
                isFavorite &&
                  "border-emerald-400/80 bg-emerald-500/20 text-emerald-50 scale-105 shadow-[0_0_25px_rgba(52,211,153,0.7)]"
              )}
            >
              <HeartIcon
                className={cn(
                  "h-4 w-4",
                  isFavorite
                    ? "fill-emerald-400 text-emerald-200"
                    : "text-emerald-100"
                )}
              />
              <span>{isFavorite ? "Favorited" : "Add to favorites"}</span>
            </button>
          </div>

          {/* origin / location */}
          <div className="grid gap-3 text-sm text-emerald-50/90 sm:grid-cols-2">
            {character.origin?.name && (
              <div className="rounded-2xl bg-black/35 px-3 py-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-200/80">
                  <MapPinIcon className="h-3.5 w-3.5" />
                  <span>Origin</span>
                </div>
                <p className="mt-1.5 text-xs text-emerald-50">
                  {character.origin.name}
                </p>
              </div>
            )}
            {character.location?.name && (
              <div className="rounded-2xl bg-black/35 px-3 py-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-200/80">
                  <MapPinIcon className="h-3.5 w-3.5" />
                  <span>Last known location</span>
                </div>
                <p className="mt-1.5 text-xs text-emerald-50">
                  {character.location.name}
                </p>
              </div>
            )}
          </div>

          <p className="text-xs text-emerald-100/75">
            Episodes they appear in are listed below. Use this page as a quick
            profile of this character across the Rick &amp; Morty multiverse.
          </p>
        </div>
      </div>
    </section>
  );
}
