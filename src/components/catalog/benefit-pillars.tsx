"use client";

import { motion } from "framer-motion";
import { benefitPillars } from "@/data/content";

export function BenefitPillars() {
  return (
    <section className="mx-auto mt-28 max-w-7xl px-6">
      <div className="mx-auto mb-14 text-center md:text-left max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-botanical-500">
          Daily wellness scaffolding
        </p>
        <h2 className="mt-3 font-display text-4xl text-botanical-900">
          Plant intelligence for modern metabolisms & mindful immunity
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {benefitPillars.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
            className="glass-panel px-9 py-9 space-y-4"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-gold-deep">
              0{index + 1}
            </span>
            <p className="font-display text-2xl">{pillar.title}</p>
            <p className="text-sm leading-relaxed text-botanical-600">{pillar.copy}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
