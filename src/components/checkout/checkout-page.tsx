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
          <fieldset className="rounded-[40px] border border-botanical-100 bg-white/95 backdrop-blur space-y-6 px-8 py-10 shadow-soft">
            <legend className="sr-only">Customer dossier</legend>
            <h2 className="text-xs uppercase tracking-[0.44em] text-botanical-500">Custodian dossier</h2>
            <label className="block space-y-2">
              <span className="text-xs uppercase tracking-[0.36em] text-botanical-500">Full ceremonial name*</span>
              <input
                required
                className="w-full rounded-3xl border border-botanical-200 px-6 py-3 bg-transparent outline-none focus:ring-2 focus:ring-botanical-600/40"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-xs uppercase tracking-[0.36em] text-botanical-500">Email</span>
                <input
                  type="email"
                  className="w-full rounded-3xl border border-botanical-200 px-6 py-3 bg-transparent outline-none focus:ring-2 focus:ring-botanical-600/40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="block space-y-2">
                <span className="text-xs uppercase tracking-[0.36em] text-botanical-500">Phone / WhatsApp*</span>
                <input
                  required
                  inputMode="tel"
                  className="w-full rounded-3xl border border-botanical-200 px-6 py-3 bg-transparent outline-none focus:ring-2 focus:ring-botanical-600/40"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="rounded-[40px] border border-botanical-100 bg-white/95 backdrop-blur space-y-6 px-8 py-10 shadow-soft">
            <legend className="sr-only">Delivery coordinates</legend>
            <h2 className="text-xs uppercase tracking-[0.44em] text-botanical-500">Delivery choreography</h2>
            <label className="block space-y-2">
              <span className="text-xs uppercase tracking-[0.36em] text-botanical-500">Line 1*</span>
              <input
                required
                className="w-full rounded-3xl border border-botanical-200 px-6 py-3 outline-none focus:ring-2 focus:ring-botanical-600/40"
                value={line1}
                onChange={(e) => setLine1(e.target.value)}
                placeholder="Street, gated community clues"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-xs uppercase tracking-[0.36em] text-botanical-500">Line 2</span>
              <input
                className="w-full rounded-3xl border border-botanical-200 px-6 py-3 outline-none focus:ring-2 focus:ring-botanical-600/40"
                value={line2}
                onChange={(e) => setLine2(e.target.value)}
                placeholder="Floor, concierge notes"
              />
            </label>
            <div className="grid gap-6 md:grid-cols-3">
              <label className="space-y-2 md:col-span-1 block">
                <span className="text-xs uppercase tracking-[0.36em] text-botanical-500">City*</span>
                <input
                  required
                  className="w-full rounded-3xl border border-botanical-200 px-6 py-3 outline-none focus:ring-2 focus:ring-botanical-600/40"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>
              <label className="space-y-2 block">
                <span className="text-xs uppercase tracking-[0.36em] text-botanical-500">State*</span>
                <input
                  required
                  className="w-full rounded-3xl border border-botanical-200 px-6 py-3 outline-none focus:ring-2 focus:ring-botanical-600/40"
                  value={stateRegion}
                  onChange={(e) => setStateRegion(e.target.value)}
                />
              </label>
              <label className="space-y-2 block">
                <span className="text-xs uppercase tracking-[0.36em] text-botanical-500">PIN*</span>
                <input
                  required
                  className="w-full rounded-3xl border border-botanical-200 px-6 py-3 outline-none focus:ring-2 focus:ring-botanical-600/40"
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                />
              </label>
              <label className="md:col-span-3 space-y-2 block">
                <span className="text-xs uppercase tracking-[0.36em] text-botanical-500">Nation*</span>
                <select
                  className="w-full rounded-3xl border border-botanical-200 px-6 py-3 outline-none focus:ring-2 focus:ring-botanical-600/40 bg-transparent"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option>India</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                </select>
              </label>
            </div>
          </fieldset>

          <fieldset className="rounded-[40px] border border-botanical-100 bg-white/95 backdrop-blur space-y-6 px-8 py-10 shadow-soft">
            <legend className="sr-only">Payment orbit</legend>
            <h2 className="text-xs uppercase tracking-[0.44em] text-botanical-500 mb-6">Settlement orbit · India-first rails</h2>
            <div className="space-y-5">
              <label className="flex gap-4 rounded-[28px] border border-botanical-100 px-6 py-4">
                <input type="radio" name="payment" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} />
                <div className="space-y-3">
                  <strong className="block text-lg leading-tight text-botanical-900">UPI (QR / Razorpay handoff)</strong>
                  <p className="text-sm leading-relaxed text-botanical-600">
                    We’ll confirm via WhatsApp with a Razorpay or bank-linked QR instantly after checkout.
                  </p>
                </div>
              </label>

              <label className="flex gap-4 rounded-[28px] border border-botanical-100 px-6 py-4">
                <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                <div className="space-y-3">
                  <strong className="block text-lg leading-tight text-botanical-900">Cash on delivery</strong>
                  <p className="text-sm leading-relaxed text-botanical-600">
                    Concierge verifies availability + ₹COD handling nuances over WhatsApp.
                  </p>
                </div>
              </label>

              <label className="flex gap-4 rounded-[28px] border border-botanical-100 px-6 py-4">
                <input type="radio" name="payment" checked={paymentMethod === "whatsapp"} onChange={() => setPaymentMethod("whatsapp")} />
                <div className="w-full space-y-4">
                  <strong className="block text-lg leading-tight text-botanical-900">WhatsApp-guided order desk</strong>
                  <p className="text-sm leading-relaxed text-botanical-600">
                    Prefer human orchestration · bundles · gifting choreography.
                  </p>
                  <WhatsAppButton variant="outline" />
                </div>
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="rounded-full bg-botanical-800 px-12 py-[0.95rem] text-xs uppercase tracking-[0.38em] text-cream hover:bg-botanical-700 transition shadow-soft"
          >
            Confirm sacred order · {paymentMethod.toUpperCase()} · {currency(payable)}
          </button>
        </form>

        <aside className="h-fit lg:sticky lg:top-32 space-y-6 rounded-[40px] border border-botanical-100 bg-botanical-800 px-8 py-10 text-white shadow-soft">
          <header>
            <p className="text-xs uppercase tracking-[0.48em] text-gold-deep">Order tableau</p>
          </header>
          <ul className="space-y-3 text-[13px] uppercase tracking-[0.18em] text-white/85">
            {lines.map((line) => (
              <li key={line.productId} className="flex justify-between gap-6 leading-relaxed">
                <span>
                  {line.name} × {line.quantity}
                </span>
                <span>{currency(line.price * line.quantity)}</span>
              </li>
            ))}
          </ul>

          <label className="space-y-2 text-[11px] uppercase tracking-[0.38em] text-white/65">
            Coupon reliquary
            <input
              className="mt-4 w-full rounded-full border border-white/30 bg-white px-6 py-3 text-botanical-800 outline-none"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.toUpperCase())}
              placeholder="Try AAYU10"
            />
          </label>

          <dl className="space-y-3 pt-6 text-[11px] uppercase tracking-[0.25em] text-white/85">
            <div className="flex justify-between text-white/70">
              <dt>Merchandise</dt>
              <dd>{currency(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-emerald-200">
              <dt>Offering</dt>
              <dd>- {currency(discount)}</dd>
            </div>
            <hr className="border-white/30" />
            <div className="flex items-baseline justify-between gap-10 pt-6">
              <dt className="text-xs uppercase tracking-[0.32em] text-white/65">Ceremonial Total</dt>
              <dd className="font-display text-4xl">{currency(payable)}</dd>
            </div>
          </dl>

          <WhatsAppButton variant="outline" className="w-full border-white/65 text-white" label="Concierge WhatsApp" />
          <a className="block text-[11px] uppercase tracking-[0.33em] text-center text-white/70" href={waUrl}>
            Compose WhatsApp with cart tableau
          </a>
          <p className="text-[11px] leading-snug text-white/70">
            Before enabling card payments publicly, finalize Razorpay order creation via a secured route handler · verify signatures Cloud-side (`see README`).
          </p>
        </aside>
      </div>
    </div>
  );
}
