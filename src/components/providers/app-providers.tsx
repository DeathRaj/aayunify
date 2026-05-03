"use client";

import { AuthProvider } from "@/context/auth-context";
import { CartProvider } from "@/context/cart-context";
import { ToasterProvider } from "@/components/ui/toaster-provider";
import { CartDrawer } from "@/components/checkout/cart-drawer";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CartDrawer />
        <ToasterProvider />
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
