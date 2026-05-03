"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryFilter } from "@/components/catalog/category-filter";
import { SearchBarCompact } from "@/components/catalog/search-bar";
import { ProductCard } from "@/components/catalog/product-card";
import { useProductsFirestore } from "@/hooks/use-products-firestore";
import type { ProductCategory } from "@/types";
import { useDebouncedValue } from "@/hooks/use-debounce";

function InnerShopShell({ fallback }: { fallback: Parameters<typeof useProductsFirestore>[0] }) {
  const { items, loading, error } = useProductsFirestore(fallback);
  const searchParams = useSearchParams();

  const [category, setCategory] = useState<ProductCategory>(() => {
    const initial = searchParams?.get("category") as ProductCategory | null;
    return initial ?? "All";
  });

  const [queryInput, setQueryInput] = useState(() => searchParams?.get("q") ?? "");

  const query = useDebouncedValue(queryInput, 260);

  const filtered = useMemo(() => {
    return items.filter((product) => {
      const passesCategory = category === "All" ? true : product.category === category;

      const q = query.toLowerCase().trim();

      const passesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.benefits.some((benefit) => benefit.toLowerCase().includes(q)) ||
        product.category.toLowerCase().includes(q);

      return passesCategory && passesSearch;
    });
  }, [items, category, query]);

  return (
    <div className="mx-auto mt-14 max-w-7xl px-6 pb-32">
      <div className="max-w-3xl mx-auto lg:mx-0">
        <p className="text-xs uppercase tracking-[0.43em] text-botanical-500">Apothecary</p>
        <h1 className="font-display text-5xl sm:text-[3.6rem] text-botanical-900 mt-8">
          Curated Ayurvedic essentials for luminous daily stacking
        </h1>
        <p className="mt-7 text-botanical-600 leading-relaxed max-w-xl">
          Every SKU is thoughtfully merchandised — transparent pricing, ceremonial tasting notes & ritual suggestions.
          Filter by modality to match your physiology season.
        </p>
      </div>

      {error ? (
        <p className="mt-14 rounded-3xl bg-gold/20 px-10 py-6 text-botanical-800 border border-botanical-200">
          ℹ️ {error}
        </p>
      ) : null}

      <div className="mt-12 flex flex-col gap-11 lg:flex-row lg:justify-between lg:gap-28">
        <SearchBarCompact value={queryInput} onChange={setQueryInput} />
        <CategoryFilter current={category} onChange={(next) => setCategory(next)} />
      </div>

      {loading ? (
        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="h-[480px] rounded-[30px] border border-botanical-100 bg-white animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          {!filtered.length && (
            <p className="mt-24 text-botanical-500 text-lg">No SKU matches this filter constellation — widen your modality.</p>
          )}
          <div className="mt-14 grid gap-14 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ShopClientShell(props: { fallback: Parameters<typeof useProductsFirestore>[0] }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-botanical-500">
          Harmonising storefront…
        </div>
      }
    >
      <InnerShopShell {...props} />
    </Suspense>
  );
}
