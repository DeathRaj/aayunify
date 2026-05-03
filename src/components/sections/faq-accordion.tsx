"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Item = {
  question: string;
  answer: string;
};

export function FAQAccordion({
  heading,
  items,
}: {
  heading: string;
  items: Item[];
}) {
  const [active, setActive] = useState<string>(items[0]?.question ?? "");

  return (
    <section id="faq" className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.37em] text-botanical-500">
          Transparency
        </p>
        <h2 className="mt-2 font-display text-4xl text-botanical-900">{heading}</h2>
      </div>
      <div className="divide-y divide-botanical-100 rounded-3xl border border-botanical-100 bg-white px-6">
        {items.map((faq) => {
          const expanded = faq.question === active;
          return (
            <article key={faq.question} className="py-4">
              <button
                type="button"
                onClick={() => setActive(expanded ? "" : faq.question)}
                className="flex w-full items-start justify-between text-left gap-6"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <span className="text-gold-deep text-xl font-light">
                  {expanded ? "−" : "+"}
                </span>
              </button>
              {expanded && (
                <motion.p
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 text-botanical-600 leading-relaxed"
                >
                  {faq.answer}
                </motion.p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
