import type { Metadata } from "next";
import { CheckoutPageClient } from "@/components/checkout/checkout-page";

export const metadata: Metadata = {
  title: "Checkout",
  description: "India shipping · UPI · COD · WhatsApp orchestration scaffolding.",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
