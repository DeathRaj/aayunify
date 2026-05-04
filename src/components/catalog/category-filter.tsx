"use client";

import type { ProductCategory } from "@/types";

const labels: Record<ProductCategory, string> = {
  All: "All modalities",
  Powders: "Powders · leaf intelligence",
  Effervescents: "Effervescents · modern ritual",
};

export function CategoryFilter({
  current,
  onChange,
}: {
  current: ProductCategory;
  onChange: (next: ProductCategory) => void;
}) {
  const values: ProductCategory[] = ["All", "Powders", "Effervescents"];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
      <p className="shrink-0 text-xs uppercase tracking-[0.4em] text-botanical-500">Filter modality</p>
      <div className="flex flex-wrap gap-3">
        {values.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={`rounded-full px-7 py-[0.6rem] text-xs uppercase tracking-[0.33em] border transition shadow-sm shadow-botanical-900/5 ${current === value ? "bg-botanical-800 border-botanical-800 text-cream" : "border-botanical-100 bg-white/90 hover:border-botanical-300"}`}
          >
            {labels[value]}
          </button>
        ))}
      </div>
    </div>
  );
}
