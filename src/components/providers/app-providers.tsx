"use client";

import { AuthProvider } from "@/context/auth-context";
import { CartProvider } from "@/context/cart-context";
import { ToasterProvider } from "@/components/ui/toaster-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <ToasterProvider />
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
