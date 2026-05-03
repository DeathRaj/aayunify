"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data/content";

export function TestimonialsCarousel() {
  const shell = useRef<HTMLDivElement | null>(null);

  const scrollEdge = (dir: number) =>
    shell.current?.scrollBy({ behavior: "smooth", left: dir * 460 });

  return (
    <section className="mx-auto mt-32 max-w-7xl px-6 space-y-9">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-botanical-500">Customer voice</p>
          <h2 className="font-display text-[2.95rem] text-botanical-900">
            Ritual-grade experiences from India’s discerning wellness devotees
          </h2>
        </div>

        <div className="hidden gap-3 md:flex">
          <button type="button" className="h-14 w-14 rounded-full border border-botanical-200" onClick={() => scrollEdge(-1)} aria-label="Previous testimonials">
            ←
          </button>
          <button type="button" className="h-14 w-14 rounded-full border border-botanical-200" onClick={() => scrollEdge(1)} aria-label="Next testimonials">
            →
          </button>
        </div>
      </div>

      <div
        ref={shell}
        className="relative no-scrollbar snap-x snap-mandatory flex gap-10 overflow-x-auto pb-10"
      >
        {testimonials.map((item) => (
          <motion.figure
            key={item.id}
            className="min-w-[min(90vw,360px)] max-w-xl snap-center rounded-[32px] border border-botanical-100 bg-white/90 px-11 py-10 shadow-soft backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <figcaption className="text-xs uppercase tracking-[0.35em] text-botanical-500">{item.city}</figcaption>
            <blockquote className="mt-10 text-xl font-display">{`“${item.quote}”`}</blockquote>
            <p className="mt-11 text-xs uppercase tracking-[0.42em] text-gold-deep">— {item.name}</p>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
