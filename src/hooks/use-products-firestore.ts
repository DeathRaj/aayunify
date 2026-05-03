"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProductDoc } from "@/types";
import { subscribeProducts } from "@/lib/repository/products";
import { isFirebaseConfigured } from "@/lib/firebase";

export function useProductsFirestore(fallbackSeed: ProductDoc[]) {
  const memoSeed = useMemo(() => fallbackSeed, [fallbackSeed]);
  const [items, setItems] = useState<ProductDoc[]>(() => memoSeed);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ready = isFirebaseConfigured();
    if (!ready) {
      setLoading(false);
      setError(null);
      setItems(memoSeed);
      return;
    }

    let unsubscribed = false;
    const unsub = subscribeProducts((snap) => {
      if (unsubscribed) return;
      setLoading(false);
      setError(null);
      setItems(snap.length ? snap : memoSeed);
    });

    const unsubscribe = unsub;
    return () => {
      unsubscribed = true;
      unsubscribe();
    };
  }, [memoSeed]);

  return { items, loading, error };
}
