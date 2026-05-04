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

// ─── Types ────────────────────────────────────────────────────────────────────

type CartDataCtx = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addToCart: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  setQty: (productId: string, qty: number) => void;
  removeLine: (productId: string) => void;
  clearCart: () => void;
  hydrated: boolean;
};

type CartUICtx = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

// ─── Contexts ─────────────────────────────────────────────────────────────────

const CartDataContext = createContext<CartDataCtx | null>(null);
const CartUIContext   = createContext<CartUICtx | null>(null);

// ─── localStorage helper ──────────────────────────────────────────────────────

function readStored(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// ─── CartUIProvider ───────────────────────────────────────────────────────────
/**
 * Isolated drawer open/close state.
 * Wraps ONLY the CartDrawer so that toggling the drawer does NOT
 * re-render any component subscribed to cart data (product pages, navbar, etc).
 */
export function CartUIProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpenState] = useState(false);

  const setIsOpen = useCallback((open: boolean) => {
    setIsOpenState(open);
  }, []);

  const value = useMemo<CartUICtx>(
    () => ({ isOpen, setIsOpen }),
    [isOpen, setIsOpen],
  );

  return (
    <CartUIContext.Provider value={value}>{children}</CartUIContext.Provider>
  );
}

// ─── CartDataProvider ─────────────────────────────────────────────────────────
/**
 * Owns all cart line data, computed derivations, and mutation actions.
 * Does NOT own drawer open state — that lives in CartUIProvider.
 * Changing cart lines does NOT trigger CartUIContext subscribers.
 */
export function CartDataProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLinesState] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Grab setIsOpen from UI context to open drawer on addToCart
  const cartUI = useContext(CartUIContext);

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
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
        return copy;
      });

      // Open drawer via UI context — does not cause CartDataContext re-render
      cartUI?.setIsOpen(true);

      toast.success("Added to your ritual cart", {
        description: `${input.name} · ${qty} item(s)`,
      });
    },
    [setLinesSafe, cartUI],
  );

  const setQty = useCallback(
    (productId: string, qty: number) => {
      if (qty < 1) {
        setLinesSafe((prev) => prev.filter((l) => l.productId !== productId));
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

  const value = useMemo<CartDataCtx>(() => {
    const itemCount = lines.reduce((acc, l) => acc + l.quantity, 0);
    const subtotal  = lines.reduce((acc, l) => acc + l.price * l.quantity, 0);
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

  return (
    <CartDataContext.Provider value={value}>{children}</CartDataContext.Provider>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useCartData(): CartDataCtx {
  const ctx = useContext(CartDataContext);
  if (!ctx) throw new Error("useCartData must be used within CartDataProvider");
  return ctx;
}

export function useCartUI(): CartUICtx {
  const ctx = useContext(CartUIContext);
  if (!ctx) throw new Error("useCartUI must be used within CartUIProvider");
  return ctx;
}

/**
 * Backward-compatible hook — merges both contexts.
 * Existing components (Navbar, ProductCard, etc.) continue to work unchanged.
 *
 * NOTE: Using this in a component means it will re-render on BOTH data AND
 * UI state changes. Prefer `useCartData` or `useCartUI` when you only need one.
 */
export function useCart(): CartDataCtx & CartUICtx {
  const data = useCartData();
  const ui   = useCartUI();
  return useMemo(() => ({ ...data, ...ui }), [data, ui]);
}

// Legacy alias — some files import CartProvider directly
export { CartDataProvider as CartProvider };
