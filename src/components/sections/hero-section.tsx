"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { brand } from "@/lib/brand";
import { TrustBadgeStrip } from "@/components/sections/trust-badges";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-botanical-100 bg-gradient-to-br from-botanical-50 via-cream to-parchment px-6 py-16 lg:p-24 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-6 h-64 w-64 rounded-full bg-gold/35 blur-[120px] animate-floaty" />
        <div className="absolute right-[-20%] top-[-20%] h-[420px] w-[420px] rounded-full bg-botanical-200/65 blur-[150px]" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.08fr_minmax(0,0.9fr)] lg:gap-24">
        <div>
          <p className="text-xs uppercase tracking-[0.43em] text-botanical-500 mb-8">
            {brand.shortTagline}
          </p>
          <motion.h1
            className="font-display text-5xl sm:text-[3.95rem] leading-[1.02] text-botanical-900"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {brand.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.12 }}
            className="mt-8 text-lg leading-relaxed text-botanical-700 max-w-2xl"
          >
            {brand.heroSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/shop"
              className="inline-flex justify-center rounded-full bg-botanical-800 px-11 py-3 text-sm uppercase tracking-[0.18em] text-cream hover:bg-botanical-700 shadow-soft transition"
            >
              Shop now
            </Link>
            <Link
              href="/shop?view=benefits"
              className="inline-flex justify-center rounded-full border border-botanical-200 px-10 py-3 text-sm uppercase tracking-[0.18em]"
            >
              Explore products
            </Link>
          </motion.div>
          <motion.div className="mt-12 hidden lg:block" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }}>
            <TrustBadgeStrip />
          </motion.div>
        </div>

        <div className="relative">
          <motion.div className="relative aspect-[5/7] rounded-[40px] border border-botanical-100 bg-white shadow-soft overflow-hidden" initial={{ rotate: -2 }} animate={{ rotate: 0 }}>
            <motion.div aria-hidden className="absolute inset-0 bg-gradient-to-br from-botanical-200/40 via-cream to-parchment" animate={{ rotate: [-1.4, 0.8] }} transition={{ repeat: Infinity, duration: 20, repeatType: "mirror" }}>
              <motion.div aria-hidden initial={{ rotate: -5 }} animate={{ rotate: [-4, -6] }} transition={{ repeat: Infinity, repeatType: "mirror", duration: 8 }} className="absolute inset-14 rounded-[32px] border border-botanical-200/60 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] bg-white/65" />

              {/* Illustrative layering — using CSS shapes for speed & zero external assets */}
              <div className="absolute inset-[18%] flex flex-col justify-between px-10 py-14 text-botanical-800">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-botanical-500 mb-8">
                    Ritual kit
                  </p>
                  <p className="font-display text-4xl mb-10 text-botanical-900">
                    Ritual layering for luminous wellness
                  </p>
                  <p className="text-sm leading-relaxed text-botanical-600">
                    Moringa for greens. ACV-moringa fizz for clarity. Rooted in Ayurveda, translated for cosmopolitan routines.
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.44em] text-botanical-500">
                  <span>Small batch · Big intention</span>
                  <span>India 🇮🇳</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating capsules */}
          <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -left-6 top-28 hidden xl:block px-8 py-4 rounded-full bg-botanical-800 text-[11px] uppercase tracking-[0.22em] text-cream shadow-lg">
            lab tested · heavy metal screened
          </motion.div>

          <motion.div aria-hidden className="absolute -right-3 bottom-[12%] hidden xl:flex flex-col rounded-3xl bg-white px-10 py-6 shadow-soft border border-botanical-100 text-sm gap-5 w-72" initial={{ y: -10 }} animate={{ y: 0 }} transition={{ repeat: Infinity, repeatType: "mirror", duration: 7 }}>
            <span className="uppercase tracking-[0.22em] text-xs text-botanical-500 font-semibold">Customer pulse</span>
            <blockquote className="text-botanical-700 leading-snug italic">
              “Feels ceremonial — not like another supplement stacking dust in my cupboard.”
            </blockquote>
            <cite className="not-italic text-xs text-botanical-500 uppercase tracking-[0.16em]">— Ritika · Jaipur</cite>
          </motion.div>
        </div>
      </div>

      <div className="mt-12 lg:hidden">
        <TrustBadgeStrip />
      </div>
    </section>
  );
}
