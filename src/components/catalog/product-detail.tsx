"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { toast } from "sonner";
import type { ProductDoc } from "@/types";
import { ProductGallery } from "@/components/catalog/product-gallery";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";
import { useCart } from "@/context/cart-context";
import { mockReviewsBySlug } from "@/data/content";
import { brand, getWhatsAppNumber } from "@/lib/brand";

function currency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProductDetailView({
  product,
  catalogue,
}: {
  product: ProductDoc;
  catalogue: ProductDoc[];
}) {
  const { addToCart } = useCart();
  const reviews = mockReviewsBySlug[product.slug] ?? [];
  const related = useMemo(
    () =>
      catalogue
        .filter((item) => item.slug !== product.slug)
        .slice(0, 2),
    [catalogue, product.slug],
  );

  function buyNowFlow() {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? "",
    });
    window.location.href = "/checkout";
  }

  function addToBasket() {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? "",
      quantity: 1,
    });
  }

  return (
    <div className="mx-auto mt-12 max-w-7xl px-6 pb-32">
      <div className="mb-14 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-botanical-500">
        <Link href="/shop" className="hover:text-gold-deep transition">
          Apothecary
        </Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-botanical-900">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-botanical-900 font-semibold tracking-[0.2em]">
          Ritual SKU
        </span>
      </div>

      <section className="grid gap-16 lg:grid-cols-[1.06fr_minmax(0,0.9fr)]">
        <ProductGallery product={product} />

        <div className="space-y-11">
          <div className="flex flex-wrap gap-4 items-center">
            {product.badges.includes("bestseller") ? (
              <span className="rounded-full bg-botanical-800 px-6 py-[0.54rem] text-[11px] uppercase tracking-[0.42em] text-cream shadow-md">
                Bestseller constellation
              </span>
            ) : null}

            <span className="rounded-full border border-botanical-200 px-8 py-[0.65rem] text-[11px] uppercase tracking-[0.43em] text-botanical-500">
              🌞 Small batch fidelity
            </span>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.44em] text-botanical-500">{product.category}</p>
            <h1 className="mt-5 font-display text-[3.05rem] sm:text-[3.7rem] text-botanical-900 leading-[1]">
              {product.name}
            </h1>
            <p className="mt-11 text-botanical-600 text-lg leading-relaxed">
              {product.shortDescription}
            </p>

            <div className="mt-12 rounded-[32px] border border-botanical-100 bg-white px-11 py-9 shadow-soft">
              <span className="text-xs uppercase tracking-[0.38em] text-botanical-500 font-semibold">Sacred exchange</span>
              <div className="mt-7 flex gap-14 items-start">
                <div>
                  <p className="font-display text-5xl text-botanical-900">{currency(product.price)}</p>
                  {product.compareAtPrice ? (
                    <p className="mt-6 text-botanical-500 line-through">{currency(product.compareAtPrice)}</p>
                  ) : null}
                </div>
                <dl className="text-sm text-botanical-600 grid gap-3">
                  <dt className="font-semibold text-botanical-900 text-xs uppercase tracking-[0.3em]">Inventory halo</dt>
                  <dd>{Math.max(product.inventory, 0)} units ready · dispatch in 48h</dd>
                  {product.sku ? (
                    <>
                      <dt className="font-semibold text-botanical-900 text-xs uppercase tracking-[0.3em]">SKU lineage</dt>
                      <dd>{product.sku}</dd>
                    </>
                  ) : null}
                </dl>
              </div>
              <div className="mt-12 flex flex-col gap-7">
                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={buyNowFlow}
                    className="inline-flex flex-1 min-w-[200px] justify-center rounded-full bg-botanical-800 px-10 py-[0.95rem] text-[11px] uppercase tracking-[0.28em] text-cream hover:bg-botanical-700 transition"
                  >
                    Buy Now
                  </button>
                  <button
                    type="button"
                    onClick={addToBasket}
                    className="inline-flex flex-1 min-w-[200px] justify-center rounded-full border border-botanical-200 px-10 py-[0.95rem] text-[11px] uppercase tracking-[0.28em]"
                  >
                    Add to cart
                  </button>
                  <WhatsAppButton
                    className="flex-1 min-w-[230px]"
                    label="WhatsApp specialist"
                    prefill={`Hi ${brand.name}! I’d like guidance on ${product.name} (${product.slug}). SKU ${product.sku ?? "n/a"}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] mt-28">
        <div className="space-y-10">
          <div className="glass-panel px-10 py-11">
            <h2 className="font-display text-3xl">Product intelligence</h2>
            <p className="mt-8 leading-relaxed text-botanical-600">{product.description}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="glass-panel px-9 py-9">
              <h3 className="text-xs uppercase tracking-[0.4em] text-botanical-500 mb-10">Evidence-led benefits</h3>
              <ul className="space-y-4 text-botanical-600">
                {product.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="glass-panel px-9 py-9 flex flex-col gap-8">
              <div>
                <h3 className="text-xs uppercase tracking-[0.4em] text-botanical-500 mb-10">Ingredient transparency</h3>
                <p className="text-botanical-600">{product.ingredients}</p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.4em] text-botanical-500 mb-10">Clinical-adjacent usage</h3>
                <p className="text-botanical-600">{product.usage}</p>
              </div>
              <button
                type="button"
                className="self-start underline text-botanical-900 text-[11px] uppercase tracking-[0.25em]"
                onClick={() => toast.message("Dosage calculators coming soon 🔬")}
              >
                Need dosing guidance?
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-[34px] border border-botanical-100 bg-botanical-800 text-cream px-11 py-10 space-y-5">
            <h3 className="text-xs uppercase tracking-[0.4em] text-gold-deep">Ayurvedic trust signals</h3>
            <p className="text-sm leading-relaxed text-white/80">
              {brand.name} formulates ritual-grade SKU with ethically sourced botanicals, lab transparency, recyclable primary packaging,
              carbon-conscious courier partners across India metro cities.
            </p>
          </div>
          <button
            type="button"
            onClick={() => toast.message(`${brand.contactEmail} concierge · response under 90 minutes weekdays.`)}
            className="w-full rounded-3xl border border-botanical-200 bg-white/90 px-9 py-[0.94rem] text-xs uppercase tracking-[0.42em]"
          >
            Request lab dossier pdf
          </button>
          <small className="block text-botanical-500 text-xs uppercase tracking-[0.24em] text-center mt-14">
            WhatsApp line · {getWhatsAppNumber()}
          </small>
        </div>
      </section>

      <section className="mt-32 space-y-9">
        <div className="flex flex-wrap items-end justify-between gap-7">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-botanical-500">Social proof ledger</p>
            <h2 className="font-display text-4xl">Customer reviews</h2>
          </div>
          <p className="text-sm uppercase tracking-[0.24em] text-botanical-500">Verified purchasers · moderated</p>
        </div>

        {!reviews.length ? (
          <p className="text-botanical-500">Fresh launch — testimonials arriving post first harvest cycle 🌙</p>
        ) : (
          <div className="grid gap-9 md:grid-cols-2">
            {reviews.map((review) => (
              <article key={`${review.name}-${review.title}`} className="rounded-[32px] border border-botanical-100 bg-white px-10 py-9 shadow-soft">
                <header className="flex justify-between gap-6 text-xs uppercase tracking-[0.28em] text-botanical-500 mb-11">
                  <span>★★★★★ {review.rating}/5 celestial</span>
                  <span>{review.city}</span>
                </header>
                <h3 className="font-semibold">{review.title}</h3>
                <p className="mt-6 text-botanical-600 leading-relaxed">{review.comment}</p>
                <p className="mt-14 text-[11px] uppercase tracking-[0.45em] text-gold-deep">— {review.name}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mt-32">
        <div className="mb-14 flex justify-between gap-10 items-end flex-wrap">
          <h2 className="font-display text-4xl">Related rituals</h2>
          <Link href="/shop" className="text-xs uppercase tracking-[0.43em] text-gold-deep">
            Shop more →
          </Link>
        </div>

        {!related.length ? (
          <p className="text-botanical-500">More SKU launching soon ✨.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {related.map((item) => (
              <Link key={item.id} href={`/products/${item.slug}`} className="rounded-[38px] border border-botanical-100 bg-white/90 backdrop-blur flex flex-wrap gap-11 p-8 shadow-soft">
                <div className="relative w-52 h-full min-h-[220px] flex-1 bg-parchment rounded-3xl overflow-hidden">
                  {item.images[0] ? (
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="220px"
                  />
                  ) : null}
                </div>
                <div className="flex-1 py-10">
                  <p className="text-xs uppercase tracking-[0.35em] text-botanical-500">{item.category}</p>
                  <p className="mt-10 font-display text-3xl text-botanical-900">{item.name}</p>
                  <p className="mt-7 text-botanical-600 text-sm">{item.shortDescription}</p>
                  <span className="mt-14 inline-flex text-[11px] uppercase tracking-[0.35em] text-gold-deep">View dossier ·</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
