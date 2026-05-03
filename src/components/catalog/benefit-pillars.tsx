"use client";

import { motion } from "framer-motion";
import { benefitPillars } from "@/data/content";

export function BenefitPillars() {
  return (
    <section className="mx-auto mt-32 max-w-7xl px-6">
      <div className="mx-auto mb-16 text-center md:text-left max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-botanical-500 mb-4">
          Daily wellness scaffolding
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-botanical-900 tracking-tight leading-tight">
          Plant intelligence for modern metabolisms & mindful immunity
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {benefitPillars.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="group relative overflow-hidden rounded-[2rem] bg-white/60 px-8 py-10 border border-botanical-100/60 shadow-premium backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(17,40,30,0.1)] hover:bg-white"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity duration-500 group-hover:opacity-10 text-8xl text-botanical-900 font-display">
              0{index + 1}
            </div>
            
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-botanical-50 text-botanical-800 mb-8 border border-botanical-100/50">
              <span className="text-[10px] font-bold uppercase tracking-widest">
                0{index + 1}
              </span>
            </div>
            
            <p className="font-display text-2xl text-botanical-900 mb-4 relative z-10">{pillar.title}</p>
            <p className="text-sm leading-relaxed text-botanical-600/90 relative z-10">{pillar.copy}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
