"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, Variants, useReducedMotion } from "framer-motion";
import { brand } from "@/lib/brand";
import { TrustBadgeStrip } from "@/components/sections/trust-badges";
import { MagneticButton } from "@/components/ui/magnetic-button";

// ─── Lazy load the entire R3F + Three.js bundle ───────────────────────────────
// The 3D canvas is NOT part of the critical rendering path.
// `ssr: false` ensures Three.js never runs on the server.
// `loading: () => null` means zero layout shift during load — the canvas
// is absolutely positioned so it has no effect on document flow.
const HeroWebGL = dynamic(
  () =>
    import("@/components/sections/hero-webgl").then((mod) => ({
      default: mod.HeroWebGL,
    })),
  { ssr: false, loading: () => null },
);

// ─── Framer Motion Variants ───────────────────────────────────────────────────
// All variants animate ONLY opacity + transform (translateY via `y`).
// These are 100% GPU-composited — zero layout work, zero paint work.

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  // When prefers-reduced-motion is set, skip stagger and show content instantly
  const containerVariants = (prefersReducedMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : staggerContainer) as Variants;

  const itemVariants = (prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : fadeUp) as Variants;

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-botanical-100 bg-gradient-to-br from-botanical-50 via-cream to-parchment px-6 py-16 lg:px-20 lg:py-24 sm:py-20 shadow-premium">
      {/* WebGL Antigravity Layer — lazy loaded, suspended when off-screen */}
      <HeroWebGL />

      <div className="relative mx-auto grid max-w-[85rem] gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20 items-center">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={itemVariants} className="text-[11px] font-semibold uppercase tracking-[0.43em] text-botanical-500 mb-8">
            {brand.shortTagline}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.05] text-botanical-900 tracking-tight"
          >
            {brand.heroTitle}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-lg lg:text-xl leading-relaxed text-botanical-700/90"
          >
            {brand.heroSubtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col gap-5 sm:flex-row items-center"
          >
            {/*
             * will-change is applied via onHoverStart/onHoverEnd inside MagneticButton.
             * This means the compositor layer is promoted ONLY during the interaction,
             * not permanently — avoiding wasted VRAM on non-hovered state.
             */}
            <MagneticButton magneticPull={0.15}>
              <Link
                href="/shop"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center overflow-hidden rounded-full bg-botanical-800 px-12 py-[1.125rem] text-xs font-medium uppercase tracking-[0.2em] text-cream shadow-premium transition-all hover:scale-[1.02] hover:bg-botanical-900"
              >
                <span className="relative z-10">Shop the Collection</span>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
              </Link>
            </MagneticButton>

            <MagneticButton magneticPull={0.15}>
              <Link
                href="/shop?view=benefits"
                className="inline-flex w-full sm:w-auto justify-center rounded-full border border-botanical-300/50 bg-white/40 backdrop-blur-md px-10 py-[1.125rem] text-xs font-medium uppercase tracking-[0.2em] text-botanical-800 transition-all hover:bg-white/60"
              >
                Explore Benefits
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 hidden lg:block border-t border-botanical-200/50 pt-8">
            <TrustBadgeStrip />
          </motion.div>
        </motion.div>

        {/* Product Image Column */}
        <div className="relative lg:h-[650px] w-full flex items-center justify-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[4/5] lg:h-full lg:w-auto lg:aspect-[3/4] rounded-[2rem] overflow-hidden shadow-premium"
          >
            <Image
              src="/images/hero-bottle.png"
              alt="Premium Ayurvedic Wellness"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] pointer-events-none" />
          </motion.div>

          {/* Floating Trust Pill — animates opacity + translateX (GPU only) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -right-4 top-12 hidden xl:flex items-center gap-3 rounded-full bg-white/90 backdrop-blur-xl px-5 py-3 shadow-premium border border-white/50"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-parchment flex items-center justify-center overflow-hidden">
                  <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" width={32} height={32} />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-gold text-[10px]">★★★★★</div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-botanical-800">500+ Rituals</span>
            </div>
          </motion.div>

          {/* Floating Feature Pill — animates opacity + translateY (GPU only) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -left-8 bottom-24 hidden xl:flex flex-col rounded-2xl bg-botanical-900/95 backdrop-blur-xl px-6 py-4 shadow-premium border border-botanical-700 w-64"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-botanical-300 font-semibold mb-2">Lab Verified</span>
            <p className="text-sm text-cream leading-relaxed">
              Screened for heavy metals. Pure, potent, and rooted in authentic Ayurveda.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mt-12 lg:hidden border-t border-botanical-200/50 pt-8">
        <TrustBadgeStrip />
      </div>
    </section>
  );
}
