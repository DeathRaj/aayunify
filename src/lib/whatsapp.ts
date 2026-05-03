import { brand, getWhatsAppNumber } from "@/lib/brand";
import type { CartLine } from "@/types";

export function buildWhatsAppOrderUrl(
  lines: CartLine[],
  total: number,
  customer?: { name: string; phone: string },
  shipping?: { city: string; state: string; postalCode: string },
  paymentMethod?: string,
): string {
  const num = getWhatsAppNumber();
  const header = `Hi ${brand.name}! New order notification:\n\n`;

  const orderInfo = customer
    ? `👤 *Customer:* ${customer.name} (${customer.phone})\n📍 *Location:* ${shipping?.city}, ${shipping?.state} (${shipping?.postalCode})\n💳 *Payment:* ${paymentMethod?.toUpperCase()}\n\n`
    : "";

  const itemsHeader = `📦 *Items:*\n`;
  const body = lines
    .map(
      (l) =>
        `• ${l.name} × ${l.quantity} — ₹${(l.price * l.quantity).toLocaleString("en-IN")}`,
    )
    .join("\n");

  const footer = `\n\n💰 *Total: ₹${total.toLocaleString("en-IN")}*\nPlease confirm this order.`;
  const text = encodeURIComponent(header + orderInfo + itemsHeader + body + footer);
  return `https://wa.me/${num}?text=${text}`;
}

export function buildWhatsAppContactUrl(prefill?: string): string {
  const num = getWhatsAppNumber();
  const text = encodeURIComponent(prefill ?? `Hello ${brand.name}, I have a question about your Ayurvedic wellness range.`);
  return `https://wa.me/${num}?text=${text}`;
}

export function buildWhatsAppProductPrefill(product: {
  name: string;
  slug: string;
  price: number;
}): string {
  return encodeURIComponent(
    `Hi ${brand.name}! I’m interested in ${product.name}. Please share availability for ₹${product.price.toLocaleString("en-IN")} (${product.slug}).`,
  );
}
