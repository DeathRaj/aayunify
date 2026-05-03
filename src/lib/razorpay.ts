/**
 * Razorpay-ready scaffolding (payment sheet lives client-side typically).
 *
 * Steps when you integrate:
 * 1. Create Razorpay key_id in Dashboard → paste into NEXT_PUBLIC_RAZORPAY_KEY_ID
 * 2. NEVER expose secret on client — verify payments on Cloud Function / Route Handler
 * 3. On successful payment, flip order.status to "paid" in Firestore
 */

export type RazorpayGlobals = Window & {
  Razorpay?: new (opts: RazorpayOptions) => {
    open: () => void;
    on: (event: string, handler: (...args: unknown[]) => void) => void;
  };
};

export type RazorpayOptions = {
  key?: string;
  amount: number; // paise
  currency: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss: () => void };
  notes?: Record<string, string>;
  theme?: { color: string };
};

export type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export function razorpayKey(): string | undefined {
  return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
}
