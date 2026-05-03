"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ProductDoc } from "@/types";
import { useCart } from "@/context/cart-context";

function currencyINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProductCard({ product }: { product: ProductDoc }) {
  const { addToCart } = useCart();
  const mainImage = product.images[0];

  function handleAdd(evt: React.MouseEvent) {
    evt.preventDefault();
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: mainImage ?? "/placeholder.jpg",
      quantity: 1,
    });
  }

  return (
    <motion.article
      layoutId={product.slug}
      className="group relative flex flex-col overflow-hidden rounded-[30px] border border-botanical-100 bg-white/90 backdrop-blur-sm shadow-soft"
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/products/${product.slug}`} className="relative overflow-hidden rounded-t-[26px]" aria-label={`View ${product.name}`}>
        <div className="absolute left-6 top-6 z-10 flex gap-3">
          {product.badges.includes("bestseller") && (
            <span className="rounded-full bg-botanical-800 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cream shadow-md">
              Bestseller
            </span>
          )}
          {product.badges.includes("sale") && product.compareAtPrice && (
            <span className="rounded-full bg-gold text-[11px] px-4 py-1 font-semibold text-botanical-900 shadow uppercase tracking-[0.16em]">
              Save {currencyINR(product.compareAtPrice - product.price)}
            </span>
          )}
        </div>
        <div className="relative aspect-[10/13] bg-parchment overflow-hidden rounded-t-[30px]">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-[1200ms] group-hover:scale-105 motion-reduce:transition-none"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-botanical-500 text-sm uppercase tracking-[0.3em]">
              Imagery onboarding
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-4 px-8 py-10">
        <div>
          <p className="text-xs uppercase tracking-[0.37em] text-botanical-500">
            {product.category}
          </p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="mt-4 font-display text-2xl text-botanical-900">
              {product.name}
            </h3>
          </Link>
          <ul className="mt-6 space-y-2 text-sm text-botanical-600">
            {product.benefits.slice(0, 3).map((benefit) => (
              <li key={benefit}>• {benefit}</li>
            ))}
          </ul>
        </div>
        <div className="mt-auto flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.37em] text-botanical-500">
              Ritual-friendly investment
            </p>
            <div className="mt-4 flex flex-col">
              <span className="text-3xl font-display text-botanical-900">
                {currencyINR(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-botanical-500 line-through">
                  {currencyINR(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center rounded-full bg-botanical-800 px-9 py-[0.82rem] text-[11px] uppercase tracking-[0.24em] text-cream hover:bg-botanical-700 transition"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}
