"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductDoc } from "@/types";

export function ProductGallery({ product }: { product: ProductDoc }) {
  const images = product.images.length ? product.images : [];

  const [activeImage, setActiveImage] = useState(images[0]);

  const active = images.find((img) => img === activeImage) ?? images[0];

  return (
    <div className="space-y-10">
      <div className="relative aspect-square overflow-hidden rounded-[36px] border border-botanical-100 bg-white shadow-soft">
        {active ? (
          <Image
            key={active}
            src={active}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 92vw, 55vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.42em] text-botanical-500">
            Imagery onboarding
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-5">
          {images.map((img, index) => {
            const chosen = img === active;
            return (
              <button
                type="button"
                key={`${img}-${index}`}
                aria-label={`View alternate photo ${index + 1}`}
                onClick={() => setActiveImage(img)}
                className={`relative aspect-square overflow-hidden rounded-2xl border ${chosen ? "border-gold-deep ring-2 ring-gold" : "border-transparent hover:border-botanical-200"} cursor-pointer`}
              >
                <Image src={img} alt={`${product.name} detail ${index + 1}`} fill className="object-cover" loading="lazy" sizes="120px" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
