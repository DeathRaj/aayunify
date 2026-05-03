"use client";

import Link from "next/link";
import { ProductCard } from "@/components/catalog/product-card";
import { useProductsFirestore } from "@/hooks/use-products-firestore";

export function FeaturedProducts({ fallback }: { fallback: Parameters<typeof useProductsFirestore>[0] }) {
  const { items, loading } = useProductsFirestore(fallback);

  const featured = items.slice(0, 2);

  return (
    <section className="mx-auto mt-24 max-w-7xl px-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-botanical-500">
            Spotlight rituals
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-[2.95rem] text-botanical-900">
            Botanical essentials for luminous daily living
          </h2>
        </div>
        <Link href="/shop" className="text-sm uppercase tracking-[0.38em] text-gold-deep">
          View full apothecary →
        </Link>
      </div>
      {loading ? (
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {[0, 1].map((slot) => (
            <div
              key={`skeleton-${slot}`}
              className="rounded-[34px] border border-botanical-100 bg-white/65 p-6 animate-pulse h-[520px]"
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 grid gap-10 md:grid-cols-2 items-stretch">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
