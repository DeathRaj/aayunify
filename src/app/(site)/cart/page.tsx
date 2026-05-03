import type { Metadata } from "next";
import { CartPageClient } from "@/components/checkout/cart-page";

export const metadata: Metadata = {
  title: "Your cart",
  description: "Review ritual SKUs · apply ceremonial coupons · escalate via WhatsApp.",
};

export default function CartPage() {
  return <CartPageClient />;
}
