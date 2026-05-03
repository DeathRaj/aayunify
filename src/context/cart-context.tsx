"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { toast } from "sonner";
import type { CartLine } from "@/types";

const STORAGE_KEY = "aayunify-cart-v1";

type CartCtx = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addToCart: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  setQty: (productId: string, qty: number) => void;
  removeLine: (productId: string) => void;
  clearCart: () => void;
  /** For optimistic UI */
  hydrated: boolean;
};

const CartContext = createContext<CartCtx | null>(null);

function readStored(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLinesState] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLinesState(readStored());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const setLinesSafe: Dispatch<SetStateAction<CartLine[]>> = useCallback(
    (fn) =>
      setLinesState((prev) => {
        const next = typeof fn === "function" ? fn(prev) : fn;
        return next.map((line) => ({
          ...line,
          quantity: Math.max(1, Math.round(line.quantity)),
        }));
      }),
    [],
  );

  const addToCart = useCallback(
    (input: Omit<CartLine, "quantity"> & { quantity?: number }) => {
      const qty = Math.max(1, input.quantity ?? 1);
      setLinesSafe((prev) => {
        const idx = prev.findIndex((p) => p.productId === input.productId);
        if (idx === -1) {
          return [
            ...prev,
            {
              productId: input.productId,
              slug: input.slug,
              name: input.name,
              price: input.price,
              image: input.image,
              quantity: qty,
            },
          ];
        }
        const copy = [...prev];
        copy[idx] = {
          ...copy[idx],
          quantity: copy[idx].quantity + qty,
        };
        return copy;
      });
      toast.success("Added to your ritual cart", {
        description: `${input.name} · ${qty} item(s)`,
      });
    },
    [setLinesSafe],
  );

  const setQty = useCallback(
    (productId: string, qty: number) => {
      if (qty < 1) {
        setLinesSafe((prev) =>
          prev.filter((l) => l.productId !== productId),
        );
        return;
      }
      setLinesSafe((prev) =>
        prev.map((line) =>
          line.productId === productId ? { ...line, quantity: qty } : line,
        ),
      );
    },
    [setLinesSafe],
  );

  const removeLine = useCallback(
    (productId: string) => {
      setLinesSafe((prev) => prev.filter((l) => l.productId !== productId));
    },
    [setLinesSafe],
  );

  const clearCart = useCallback(() => setLinesSafe([]), [setLinesSafe]);

  const value = useMemo<CartCtx>(() => {
    const itemCount = lines.reduce((acc, line) => acc + line.quantity, 0);
    const subtotal = lines.reduce(
      (acc, line) => acc + line.price * line.quantity,
      0,
    );
    return {
      lines,
      itemCount,
      subtotal,
      addToCart,
      setQty,
      removeLine,
      clearCart,
      hydrated,
    };
  }, [lines, addToCart, setQty, removeLine, clearCart, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
