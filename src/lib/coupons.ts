/** Client-side promo codes — move validation server-side before production payouts. */

const COUPONS: Record<string, { label: string; percentOff: number }> = {
  AAYU10: { label: "Aayu10", percentOff: 10 },
  WELLNESS15: { label: "Welcome15", percentOff: 15 },
};

export function applyCoupon(
  code: string | undefined | null,
  subtotal: number,
): { discount: number; applied: string | null } {
  if (!code) return { discount: 0, applied: null };
  const trimmed = code.trim().toUpperCase();
  const found = COUPONS[trimmed];
  if (!found) return { discount: 0, applied: null };
  const discount = Math.round((subtotal * found.percentOff) / 100);
  return { discount: Math.min(discount, subtotal), applied: found.label };
}

export function couponHint(): string {
  return "Try AAYU10 or WELLNESS15.";
}
