type HeroStatProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value?: string;
  hint?: string;
};

export function HeroStat({
  icon: Icon,
  label,
  value,
  hint,
}: Readonly<HeroStatProps>) {
  return (
    <div className="flex sm:flex-row flex-col items-center gap-2 rounded-2xl border dark:border-emerald-300/30 dark:bg-black/40 px-3 py-2 backdrop-blur bg-slate-900 border-emerald-100">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 dark:bg-emerald-500/20">
        <Icon className="h-4 w-4 text-emerald-100 dark:text-emerald-200" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium uppercase tracking-wide text-emerald-300 dark:text-emerald-100/80">
          {label}
        </span>
        {value && (
          <span className="text-sm font-semibold text-emerald-200 dark:text-emerald-50">
            {value}
          </span>
        )}
        {hint ? (
          <span className="text-xs leading-tight text-emerald-100/75 dark:text-emerald-100/60">
            {hint}
          </span>
        ) : null}
      </div>
    </div>
  );
}
