"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useCart } from "@/context/cart-context";
import { applyCoupon, couponHint } from "@/lib/coupons";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";

function fmt(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function CartPageClient() {
  const { lines, subtotal, setQty, removeLine, hydrated } = useCart();
  const [coupon, setCoupon] = useState("");

  const { discount } = applyCoupon(coupon, subtotal);
  const total = Math.max(subtotal - discount, 0);

  const waUrl = useMemo(() => buildWhatsAppOrderUrl(lines, total), [lines, total]);

  return (
    <div className="mx-auto mb-44 mt-20 max-w-6xl px-6 space-y-16">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-botanical-500">Your ritual tray</p>
          <h1 className="font-display text-5xl text-botanical-900">Basket · curated thoughtfully</h1>
          {!hydrated && (
            <p className="text-botanical-500 text-sm italic">Hydrating luminous cart rituals…</p>
          )}
        </div>
        <Link href="/shop" className="text-xs uppercase tracking-[0.43em] text-gold-deep">
          Continue shopping →
        </Link>
      </div>

      {!hydrated ? null : lines.length === 0 ? (
        <div className="rounded-[40px] border border-botanical-100 bg-white px-10 py-16 text-center space-y-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-botanical-500">Your basket listens</p>
          <p className="font-display text-4xl leading-tight">
            Whisper new botanicals · your basket hums softly empty
          </p>
          <Link
            href="/shop"
            className="inline-flex justify-center rounded-full bg-botanical-800 px-10 py-3 text-xs uppercase tracking-[0.34em] text-cream shadow-soft"
          >
            Enter apothecary
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-8">
            {lines.map((line) => (
              <div
                key={line.productId}
                className="flex flex-wrap gap-8 rounded-[32px] border border-botanical-100 bg-white px-8 py-8 shadow-soft"
              >
                <div className="relative h-44 w-44 flex-shrink-0 overflow-hidden rounded-[28px] bg-parchment">
                  {line.image ? (
                    <Image
                      src={line.image}
                      alt=""
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="180px"
                    />
                  ) : null}
                </div>
                <div className="flex min-w-[220px] flex-1 flex-col gap-8">
                  <div className="flex flex-wrap items-start justify-between gap-8">
                    <div className="min-w-[200px]">
                      <p className="text-xs uppercase tracking-[0.43em] text-botanical-500">
                        Botanical dossier
                      </p>
                      <Link
                        href={`/products/${line.slug}`}
                        className="mt-4 block font-display text-3xl hover:text-botanical-600"
                      >
                        {line.name}
                      </Link>
                    </div>
                    <div className="text-right">
                      <div className="text-xs uppercase tracking-[0.43em] text-botanical-500">Line total</div>
                      <div className="mt-6 font-display text-3xl text-botanical-900">
                        {fmt(line.price * line.quantity)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-8">
                    <label className="flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.2em]">
                      Quantity
                      <select
                        className="rounded-2xl border border-botanical-200 bg-transparent px-4 py-2"
                        aria-label={`Quantity ${line.name}`}
                        value={line.quantity}
                        onChange={(e) => setQty(line.productId, Number(e.target.value))}
                      >
                        {Array.from({ length: 10 }).map((_, index) => {
                          const qty = index + 1;
                          return (
                            <option key={qty} value={qty}>
                              {qty}
                            </option>
                          );
                        })}
                      </select>
                    </label>
                    <button
                      type="button"
                      className="text-xs uppercase tracking-[0.43em] text-gold-deep"
                      onClick={() => removeLine(line.productId)}
                    >
                      Gentle remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.08fr_minmax(0,0.92fr)]">
            <section className="rounded-[38px] border border-botanical-100 bg-botanical-800 px-10 py-10 text-white shadow-soft space-y-6">
              <h2 className="text-xs uppercase tracking-[0.48em] text-gold-deep">Totals · GST inclusive imagery</h2>
              <dl className="space-y-3 text-white/90">
                <div className="flex justify-between text-sm uppercase tracking-[0.22em] text-white/70">
                  <dt>Merchandise ritual</dt>
                  <dd>{fmt(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-sm uppercase tracking-[0.22em] text-white/70">
                  <dt>Promotion field</dt>
                  <dd className={discount > 0 ? "text-emerald-200" : undefined}>- {fmt(discount)}</dd>
                </div>
                <hr className="border-white/30" />
                <div className="flex justify-between font-display text-4xl pt-4">
                  <dt>Investment</dt>
                  <dd>{fmt(total)}</dd>
                </div>
              </dl>
              <WhatsAppButton variant="outline" className="w-full border-white/60 text-white hover:bg-white hover:text-botanical-800" label="WhatsApp concierge" />
              <a
                className="block rounded-full bg-white px-10 py-3 text-center text-xs uppercase tracking-[0.35em] text-botanical-800 shadow-soft"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Compose WhatsApp text with cart
              </a>
              <footer className="text-[11px] uppercase tracking-[0.43em] text-white/65">
                UPI receipts · COD · Razorpay handoff via checkout wizard
              </footer>
            </section>

            <section className="rounded-[38px] border border-botanical-100 bg-white/95 px-10 py-10 shadow-soft space-y-6">
              <header>
                <h2 className="text-xs uppercase tracking-[0.48em] text-botanical-500">
                  Coupon constellation
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-botanical-600">
                  Honour codes unlock gratitude pricing. Try <span className="font-semibold">AAYU10</span> or{" "}
                  <span className="font-semibold">WELLNESS15</span>. {couponHint()}
                </p>
              </header>
              <div className="flex flex-wrap gap-4">
                <input
                  className="flex-1 min-w-[220px] rounded-full border border-botanical-200 px-6 py-3"
                  placeholder="Coupon"
                  aria-label="Coupon code input"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                />
                <button
                  type="button"
                  className="rounded-full border border-botanical-200 px-8 py-3 text-xs uppercase tracking-[0.33em]"
                  onClick={() => setCoupon("")}
                >
                  Clear
                </button>
              </div>
              <Link
                href="/checkout"
                className="block rounded-full bg-botanical-800 px-10 py-3 text-center text-xs uppercase tracking-[0.43em] text-cream shadow-soft hover:bg-botanical-700 transition"
              >
                Continue to ceremonial checkout · {fmt(total)}
              </Link>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
