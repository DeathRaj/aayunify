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
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-botanical-100 bg-white/60 backdrop-blur-md shadow-premium transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(17,40,30,0.12)] hover:bg-white"
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/products/${product.slug}`} className="relative overflow-hidden rounded-t-[2rem]" aria-label={`View ${product.name}`}>
        <div className="absolute left-5 top-5 z-20 flex flex-col gap-2">
          {product.badges.includes("bestseller") && (
            <span className="inline-flex rounded-full bg-botanical-800 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-cream shadow-sm">
              Bestseller
            </span>
          )}
          {product.badges.includes("sale") && product.compareAtPrice && (
            <span className="inline-flex rounded-full bg-gold px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-botanical-900 shadow-sm">
              Save {currencyINR(product.compareAtPrice - product.price)}
            </span>
          )}
        </div>
        <div className="relative aspect-[4/5] bg-botanical-50 overflow-hidden">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-110 motion-reduce:transition-none"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-botanical-500 text-[10px] uppercase tracking-[0.3em]">
              Image pending
            </div>
          )}
          {/* Subtle vignette for premium feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </Link>
      
      <div className="flex flex-1 flex-col px-6 py-8">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-botanical-500 mb-2">
            {product.category}
          </p>
          <Link href={`/products/${product.slug}`} className="group-hover:text-botanical-600 transition-colors">
            <h3 className="font-display text-2xl text-botanical-900 leading-tight">
              {product.name}
            </h3>
          </Link>
          <ul className="mt-4 space-y-1.5 text-xs text-botanical-600/90">
            {product.benefits.slice(0, 2).map((benefit) => (
              <li key={benefit} className="flex items-start gap-2">
                <span className="text-botanical-300 mt-0.5">✧</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto pt-8 flex items-end justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.25em] text-botanical-400 mb-1">
              Investment
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-display text-botanical-900">
                {currencyINR(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-[11px] text-botanical-400 line-through">
                  {currencyINR(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            className="group/btn relative overflow-hidden inline-flex items-center justify-center rounded-full bg-botanical-800 h-11 px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:bg-botanical-900 hover:shadow-md"
            onClick={handleAdd}
          >
            <span className="relative z-10 flex items-center gap-2">
              Add to ritual <span className="text-gold-deep transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
