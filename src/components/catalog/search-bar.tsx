"use client";

export function SearchBarCompact({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <label className="relative flex flex-1 min-w-[220px] max-w-xl items-center gap-6 rounded-[28px] border border-botanical-100 bg-white/90 px-7 py-[0.8rem] shadow-soft focus-within:ring-2 focus-within:ring-botanical-500/50">
      <span className="sr-only">Filter products inline</span>
      <span className="select-none font-display text-botanical-500 text-sm">⌕</span>
      <input
        className="flex-1 bg-transparent text-sm text-botanical-900 placeholder:text-botanical-500 outline-none py-3"
        placeholder="Search SKU, modality, botanical benefit..."
        aria-label="Filter products inline"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="hidden lg:inline-flex text-[10px] uppercase tracking-[0.4em] text-botanical-500">
        realtime
      </span>
    </label>
  );
}
