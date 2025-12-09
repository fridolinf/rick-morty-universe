import { cn } from "@/shared/lib/utils";
import { HeartIcon } from "lucide-react";
import { MouseEventHandler } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type ButtonFavoriteProps = {
  isFavorite: boolean;
  handleFavoriteClick: MouseEventHandler<HTMLButtonElement>;
};

export default function ButtonFavorite({
  handleFavoriteClick,
  isFavorite,
}: Readonly<ButtonFavoriteProps>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={handleFavoriteClick}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border text-slate-200",
            "bg-black/40 backdrop-blur-sm transition-transform duration-150",
            "hover:scale-105 hover:bg-emerald-500/20 hover:border-emerald-400/60",
            isFavorite &&
              "border-emerald-400/80 bg-emerald-500/20 text-emerald-100 scale-105"
          )}
        >
          <HeartIcon
            className={cn(
              "h-4 w-4 transition-transform duration-150",
              isFavorite
                ? "fill-emerald-400 text-emerald-300"
                : "text-slate-300"
            )}
          />
        </button>
      </TooltipTrigger>
      <TooltipContent side="left">
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </TooltipContent>
    </Tooltip>
  );
}
