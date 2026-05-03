"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/catalog/product-card";
import { useProductsFirestore } from "@/hooks/use-products-firestore";

export function FeaturedProducts({ fallback }: { fallback: Parameters<typeof useProductsFirestore>[0] }) {
  const { items, loading } = useProductsFirestore(fallback);
  const featured = items.slice(0, 2);

  return (
    <section className="mx-auto mt-32 max-w-7xl px-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-botanical-200/50 pb-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-botanical-500 mb-4">
            Curated Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-botanical-900 tracking-tight">
            Botanical essentials for <br className="hidden md:block"/> luminous daily living
          </h2>
        </div>
        <Link 
          href="/shop" 
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-botanical-800 transition-colors hover:text-gold-deep"
        >
          View full apothecary
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
      
      {loading ? (
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {[0, 1].map((slot) => (
            <div
              key={`skeleton-${slot}`}
              className="rounded-[34px] border border-botanical-100 bg-white/65 p-6 animate-pulse h-[520px]"
            />
          ))}
        </div>
      ) : (
        <motion.div 
          className="mt-16 grid gap-10 md:grid-cols-2 items-stretch"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {featured.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
