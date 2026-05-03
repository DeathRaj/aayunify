"use client";

import Link from "next/link";
import { ProductDetailView } from "@/components/catalog/product-detail";
import { useProductsFirestore } from "@/hooks/use-products-firestore";

export function ProductPageShell({
  slug,
  fallback,
}: {
  slug: string;
  fallback: Parameters<typeof useProductsFirestore>[0];
}) {
  const { items, loading } = useProductsFirestore(fallback);
  const product = items.find((item) => item.slug === slug);

  if (product) {
    return <ProductDetailView product={product} catalogue={items} />;
  }

  if (loading) {
    return (
      <div className="mx-auto mt-44 max-w-5xl px-6 animate-pulse">
        <div className="aspect-[21/13] rounded-[40px] border border-botanical-100 bg-parchment mb-28" />
        <div className="h-[220px] rounded-[30px] border border-botanical-100 bg-white" />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-36 max-w-3xl px-6 text-center space-y-11">
      <p className="text-xs uppercase tracking-[0.4em] text-botanical-500">404 · Lost in the grove</p>
      <h1 className="font-display text-[3.55rem]">This ritual SKU is migrating</h1>
      <p className="text-botanical-600">
        The formulation you’re seeking moved or is reserved for ambassadors. Wander back to our apothecary for luminous alternatives.
      </p>
      <Link href="/shop" className="inline-flex justify-center rounded-full bg-botanical-800 px-12 py-[0.9rem] text-xs uppercase tracking-[0.22em] text-cream shadow-soft">
        Return to shop →
      </Link>
    </div>
  );
}
