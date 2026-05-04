"use client";

import dynamic from "next/dynamic";
import { AuthProvider } from "@/context/auth-context";
import { CartDataProvider, CartUIProvider } from "@/context/cart-context";
import { ToasterProvider } from "@/components/ui/toaster-provider";

// Lazy-load CartDrawer — it is invisible until isOpen=true,
// so it must never block the initial page render.
// The drawer is ~7KB of JSX + Framer Motion variants; keeping it off
// the critical path improves TBT meaningfully.
const CartDrawer = dynamic(
  () =>
    import("@/components/checkout/cart-drawer").then((mod) => ({
      default: mod.CartDrawer,
    })),
  {
    ssr: false,
    loading: () => null, // No placeholder — drawer is off-screen by default
  },
);

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {/*
       * CartUIProvider wraps CartDataProvider so the UI context is
       * available to CartDataProvider (needed for setIsOpen on addToCart).
       *
       * Provider order matters:
       *   CartUIProvider  → owns isOpen state
       *   CartDataProvider → reads CartUIContext to call setIsOpen on addToCart
       *   CartDrawer      → consumes BOTH (via useCartData + useCartUI)
       */}
      <CartUIProvider>
        <CartDataProvider>
          <CartDrawer />
          <ToasterProvider />
          {children}
        </CartDataProvider>
      </CartUIProvider>
    </AuthProvider>
  );
}
