export const BADGE_STATUS_COLOR_CLASSES: Record<string, string> = {
  Alive:
    "border-emerald-400/50 bg-emerald-500/15 text-emerald-200 shadow-[0_0_10px_rgba(16,185,129,0.4)]",
  Dead: "border-rose-400/50 bg-rose-500/15 text-rose-200 shadow-[0_0_10px_rgba(244,63,94,0.4)]",
  unknown:
    "border-slate-400/50 bg-slate-500/15 text-slate-100 shadow-[0_0_10px_rgba(148,163,184,0.4)]",
};

export const STATUS_GRADIENT_CLASSES: Record<string, string> = {
  Alive:
    "from-emerald-500/25 via-slate-950/95 to-emerald-900/40 border-emerald-400/60",
  Dead: "from-rose-500/25 via-slate-950/95 to-rose-900/40 border-rose-400/60",
  unknown:
    "from-slate-500/25 via-slate-950/95 to-slate-900/40 border-slate-400/60",
};

export const STATUS_BADGE_CLASSES: Record<string, string> = {
  Alive:
    "border-emerald-400/60 bg-emerald-500/15 text-emerald-100 shadow-[0_0_10px_rgba(16,185,129,0.5)]",
  Dead: "border-rose-400/60 bg-rose-500/15 text-rose-100 shadow-[0_0_10px_rgba(244,63,94,0.5)]",
  unknown:
    "border-slate-400/60 bg-slate-700/60 text-slate-100 shadow-[0_0_10px_rgba(148,163,184,0.5)]",
};
