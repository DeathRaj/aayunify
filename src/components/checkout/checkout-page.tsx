"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCart } from "@/context/cart-context";
import { applyCoupon } from "@/lib/coupons";
import type { PaymentMethod } from "@/types";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { createOrder } from "@/lib/repository/orders";
import { isFirebaseConfigured } from "@/lib/firebase";
import { useAuth } from "@/context/auth-context";

function currency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function CheckoutPageClient() {
  const router = useRouter();
  const { lines, subtotal, clearCart, hydrated } = useCart();
  const { user } = useAuth();
  const [coupon, setCoupon] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("India");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");

  const { discount } = applyCoupon(coupon, subtotal);
  const payable = Math.max(subtotal - discount, 0);

  const waUrl = useMemo(
    () =>
      buildWhatsAppOrderUrl(
        lines,
        payable,
        { name, phone },
        { city, state: stateRegion, postalCode: postal },
        paymentMethod,
      ),
    [lines, payable, name, phone, city, stateRegion, postal, paymentMethod],
  );

  async function submitOrder(evt: React.FormEvent) {
    evt.preventDefault();
    if (!lines.length) {
      toast.error("Your ceremonial basket listens empty.");
      router.push("/shop");
      return;
    }
    if (!name.trim() || !phone.trim() || !line1.trim() || !city.trim() || !stateRegion.trim() || !postal.trim()) {
      toast.error("Please complete all ritual fields responsibly.");
      return;
    }

    const normalizedEmail =
      email.trim() ||
      `guest+${crypto.randomUUID?.() ?? Date.now()}@${process.env.NEXT_PUBLIC_GUEST_MAIL_DOMAIN ?? "aayunify.local"}`;

    try {
      if (!isFirebaseConfigured()) {
        toast.warning("Firestore offline demo — hand off via WhatsApp", {
          description: "Paste Firebase secrets to persist orders elegantly.",
          duration: 4800,
        });
        router.push(waUrl);
        return;
      }

      await createOrder({
        customer: { name: name.trim(), email: normalizedEmail, phone },
        shipping: {
          line1,
          line2,
          city,
          state: stateRegion,
          postalCode: postal,
          country,
        },
        items: lines.map((line) => ({
          productId: line.productId,
          name: line.name,
          qty: line.quantity,
          unitPrice: line.price,
        })),
        subtotal,
        discount,
        total: payable,
        coupon,
        paymentMethod,
        userId: user?.uid ?? null,
      });

      clearCart();
      toast.success(`Order ceremonialised (${paymentMethod.toUpperCase()})`);

      // Always redirect to WhatsApp so Raj gets notified via the customer's message
      router.push(waUrl);
    } catch (error) {
      console.error(error);
      toast.error("Could not write order — escalate via WhatsApp while we troubleshoot.");
      router.push(waUrl);
    }
  }

  if (!hydrated) {
    return (
      <div className="mx-auto mt-32 max-w-4xl px-6 animate-pulse text-botanical-500">
        Harmonising ceremonial checkout altar…
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="mx-auto mt-32 max-w-3xl rounded-[38px] border border-botanical-100 bg-white px-10 py-16 text-center space-y-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-botanical-500">Checkout paused</p>
        <p className="font-display text-4xl">Your basket wandered — invite botanicals?</p>
        <button
          type="button"
          className="rounded-full bg-botanical-800 px-12 py-3 text-xs uppercase tracking-[0.33em] text-cream shadow-soft"
          onClick={() => router.push("/shop")}
        >
          Return to sacred apothecary
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-40 mt-24 max-w-6xl px-6">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-botanical-500">Ceremonial checkout</p>
        <h1 className="font-display text-5xl sm:text-[3.5rem]">Finalise luminous delivery</h1>
        <p className="leading-relaxed text-botanical-600">
          COD and UPI are supported today. Razorpay card rails are scaffolded (`src/lib/razorpay.ts`) — plug your server-side verifier before marking orders as paid.
        </p>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.05fr_minmax(0,0.92fr)]">
        <form className="space-y-10" onSubmit={submitOrder}>
          <fieldset className="rounded-[2.5rem] border border-botanical-100 bg-white shadow-premium p-8 lg:p-10 transition-all duration-300 focus-within:border-botanical-300">
            <legend className="sr-only">Customer dossier</legend>
            <div className="flex items-center gap-4 mb-8">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-botanical-50 text-[10px] font-bold text-botanical-800">1</span>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-botanical-800">Custodian Details</h2>
            </div>
            <div className="space-y-6">
              <label className="block space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-botanical-500">Full Name *</span>
                <input
                  required
                  className="w-full rounded-2xl border border-botanical-100 px-6 py-4 bg-botanical-50/30 outline-none focus:border-botanical-400 focus:bg-white focus:ring-4 focus:ring-botanical-100 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ritika Sharma"
                />
              </label>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-botanical-500">Email Address</span>
                  <input
                    type="email"
                    className="w-full rounded-2xl border border-botanical-100 px-6 py-4 bg-botanical-50/30 outline-none focus:border-botanical-400 focus:bg-white focus:ring-4 focus:ring-botanical-100 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="For order tracking"
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-botanical-500">WhatsApp / Phone *</span>
                  <input
                    required
                    inputMode="tel"
                    className="w-full rounded-2xl border border-botanical-100 px-6 py-4 bg-botanical-50/30 outline-none focus:border-botanical-400 focus:bg-white focus:ring-4 focus:ring-botanical-100 transition-all"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91..."
                  />
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-[2.5rem] border border-botanical-100 bg-white shadow-premium p-8 lg:p-10 transition-all duration-300 focus-within:border-botanical-300">
            <legend className="sr-only">Delivery coordinates</legend>
            <div className="flex items-center gap-4 mb-8">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-botanical-50 text-[10px] font-bold text-botanical-800">2</span>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-botanical-800">Delivery Address</h2>
            </div>
            <div className="space-y-6">
              <label className="block space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-botanical-500">Street Address *</span>
                <input
                  required
                  className="w-full rounded-2xl border border-botanical-100 px-6 py-4 bg-botanical-50/30 outline-none focus:border-botanical-400 focus:bg-white focus:ring-4 focus:ring-botanical-100 transition-all"
                  value={line1}
                  onChange={(e) => setLine1(e.target.value)}
                  placeholder="House number, Street name"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-botanical-500">Apartment / Suite</span>
                <input
                  className="w-full rounded-2xl border border-botanical-100 px-6 py-4 bg-botanical-50/30 outline-none focus:border-botanical-400 focus:bg-white focus:ring-4 focus:ring-botanical-100 transition-all"
                  value={line2}
                  onChange={(e) => setLine2(e.target.value)}
                  placeholder="Optional"
                />
              </label>
              <div className="grid gap-6 md:grid-cols-3">
                <label className="space-y-2 md:col-span-1 block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-botanical-500">City *</span>
                  <input
                    required
                    className="w-full rounded-2xl border border-botanical-100 px-6 py-4 bg-botanical-50/30 outline-none focus:border-botanical-400 focus:bg-white focus:ring-4 focus:ring-botanical-100 transition-all"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </label>
                <label className="space-y-2 block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-botanical-500">State *</span>
                  <input
                    required
                    className="w-full rounded-2xl border border-botanical-100 px-6 py-4 bg-botanical-50/30 outline-none focus:border-botanical-400 focus:bg-white focus:ring-4 focus:ring-botanical-100 transition-all"
                    value={stateRegion}
                    onChange={(e) => setStateRegion(e.target.value)}
                  />
                </label>
                <label className="space-y-2 block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-botanical-500">PIN Code *</span>
                  <input
                    required
                    className="w-full rounded-2xl border border-botanical-100 px-6 py-4 bg-botanical-50/30 outline-none focus:border-botanical-400 focus:bg-white focus:ring-4 focus:ring-botanical-100 transition-all"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                  />
                </label>
                <label className="md:col-span-3 space-y-2 block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-botanical-500">Country *</span>
                  <select
                    className="w-full rounded-2xl border border-botanical-100 px-6 py-4 bg-botanical-50/30 outline-none focus:border-botanical-400 focus:bg-white focus:ring-4 focus:ring-botanical-100 transition-all appearance-none"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option>India</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                  </select>
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-[2.5rem] border border-botanical-100 bg-white shadow-premium p-8 lg:p-10 transition-all duration-300 focus-within:border-botanical-300">
            <legend className="sr-only">Payment orbit</legend>
            <div className="flex items-center gap-4 mb-8">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-botanical-50 text-[10px] font-bold text-botanical-800">3</span>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-botanical-800">Settlement Orbit</h2>
            </div>
            <div className="space-y-4">
              <label className="flex gap-5 rounded-3xl border border-botanical-100 p-6 transition-all hover:bg-botanical-50/50 cursor-pointer has-[:checked]:border-botanical-500 has-[:checked]:bg-botanical-50/50 has-[:checked]:ring-1 has-[:checked]:ring-botanical-500">
                <input type="radio" name="payment" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} className="mt-1 text-botanical-600 focus:ring-botanical-500" />
                <div className="space-y-2">
                  <strong className="block text-[15px] font-semibold tracking-tight text-botanical-900">UPI (QR / Razorpay)</strong>
                  <p className="text-sm leading-relaxed text-botanical-600/90">
                    Instant and secure via any UPI app.
                  </p>
                </div>
              </label>

              <label className="flex gap-5 rounded-3xl border border-botanical-100 p-6 transition-all hover:bg-botanical-50/50 cursor-pointer has-[:checked]:border-botanical-500 has-[:checked]:bg-botanical-50/50 has-[:checked]:ring-1 has-[:checked]:ring-botanical-500">
                <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="mt-1 text-botanical-600 focus:ring-botanical-500" />
                <div className="space-y-2">
                  <strong className="block text-[15px] font-semibold tracking-tight text-botanical-900">Cash on delivery</strong>
                  <p className="text-sm text-botanical-500 leading-relaxed">
                  We&apos;ll notify you via WhatsApp with tracking details as soon as your ritual is dispatched.
                </p>
                </div>
              </label>

              <label className="flex gap-5 rounded-3xl border border-botanical-100 p-6 transition-all hover:bg-botanical-50/50 cursor-pointer has-[:checked]:border-botanical-500 has-[:checked]:bg-botanical-50/50 has-[:checked]:ring-1 has-[:checked]:ring-botanical-500">
                <input type="radio" name="payment" checked={paymentMethod === "whatsapp"} onChange={() => setPaymentMethod("whatsapp")} className="mt-1 text-botanical-600 focus:ring-botanical-500" />
                <div className="w-full space-y-4">
                  <strong className="block text-[15px] font-semibold tracking-tight text-botanical-900">WhatsApp Concierge</strong>
                  <p className="text-sm leading-relaxed text-botanical-600/90">
                    Need a custom bundle or gifting help? Let&apos;s talk.
                  </p>
                  {paymentMethod === "whatsapp" && <WhatsAppButton variant="outline" className="w-full mt-2" />}
                </div>
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="group relative overflow-hidden flex w-full items-center justify-center rounded-full bg-botanical-800 px-12 py-[1.125rem] text-xs font-bold uppercase tracking-[0.2em] text-cream shadow-premium transition-all hover:scale-[1.01] hover:bg-botanical-900"
          >
            <span className="relative z-10 flex items-center gap-3">
              Confirm Order · {currency(payable)} <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
          </button>
          
          <div className="flex justify-center gap-6 opacity-60">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-botanical-700">🔒 Secure Checkout</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-botanical-700">✓ Lab Verified</span>
          </div>
        </form>

        <aside className="h-fit lg:sticky lg:top-32 space-y-8 rounded-[2.5rem] border border-botanical-100 bg-white/60 backdrop-blur-xl px-8 py-10 shadow-premium">
          <header>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-botanical-800 border-b border-botanical-100 pb-4">Order Summary</p>
          </header>
          
          <ul className="space-y-4 text-[13px] font-medium text-botanical-800/90 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">
            {lines.map((line) => (
              <li key={line.productId} className="flex justify-between gap-6 leading-relaxed items-center">
                <span className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-botanical-50 text-[10px] font-bold text-botanical-700">{line.quantity}</span>
                  {line.name}
                </span>
                <span className="font-semibold">{currency(line.price * line.quantity)}</span>
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-botanical-100">
            <label className="space-y-3 block">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-botanical-500">Gift Card or Discount Code</span>
              <div className="flex gap-2">
                <input
                  className="w-full rounded-full border border-botanical-200 px-5 py-3 text-sm outline-none focus:border-botanical-400 focus:ring-2 focus:ring-botanical-100 transition-all bg-white"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  placeholder="e.g. AAYU10"
                />
                <button type="button" className="px-6 py-3 rounded-full bg-botanical-50 text-botanical-800 text-[10px] font-bold uppercase tracking-widest hover:bg-botanical-100 transition-colors">Apply</button>
              </div>
            </label>
          </div>

          <dl className="space-y-4 pt-6 text-[13px] font-medium text-botanical-800/80">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{currency(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-botanical-600">
                <dt>Discount</dt>
                <dd>- {currency(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd className="text-[11px] uppercase tracking-wider text-botanical-500">Calculated at next step</dd>
            </div>
            <div className="pt-6 border-t border-botanical-100 flex items-baseline justify-between gap-10">
              <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-botanical-500">Total</dt>
              <dd className="font-display text-4xl text-botanical-900 tracking-tight">{currency(payable)}</dd>
            </div>
          </dl>

          <div className="pt-6 border-t border-botanical-100 space-y-4">
            <WhatsAppButton variant="outline" className="w-full justify-center" label="Need help? WhatsApp Us" />
            <p className="text-[10px] text-center leading-relaxed text-botanical-500 max-w-xs mx-auto">
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
