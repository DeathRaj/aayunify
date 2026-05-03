"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const questions = [
  {
    id: "goal",
    question: "What is your primary wellness focus?",
    options: ["Weight Harmony", "Mindful Immunity", "Sustained Energy", "Gut Clarity"],
  },
  {
    id: "routine",
    question: "When do you prefer your ritual?",
    options: ["Morning Awakening", "Mid-day Reset", "Evening Wind-down"],
  },
];

export function WellnessQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleSelect = (option: string) => {
    const currentQuestion = questions[step];
    if (!currentQuestion) return;
    
    const newAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Finish quiz
      document.cookie = `wellness_goal=${encodeURIComponent(newAnswers.goal || "")}; path=/; max-age=31536000`;
      // Optional: send to edge or reload to see edge effect
      router.refresh(); 
      setStep(questions.length); // move to completion state
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto bg-white/60 backdrop-blur-xl border border-botanical-100 rounded-[2.5rem] shadow-premium p-10 overflow-hidden min-h-[300px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {step < questions.length ? (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-botanical-400">
                Diagnostic {step + 1} of {questions.length}
              </span>
              <h3 className="font-display text-3xl text-botanical-900 leading-tight">
                {questions[step]?.question}
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {questions[step]?.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className="w-full text-left px-6 py-4 rounded-2xl border border-botanical-100/60 bg-white/80 hover:bg-botanical-50 hover:border-botanical-200 transition-all shadow-sm group"
                >
                  <span className="text-sm font-semibold tracking-wide text-botanical-800 group-hover:text-botanical-900">
                    {opt}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 mx-auto bg-botanical-50 rounded-full flex items-center justify-center text-botanical-800 text-2xl">
              ✧
            </div>
            <h3 className="font-display text-3xl text-botanical-900">Ritual Prescribed</h3>
            <p className="text-sm text-botanical-600 leading-relaxed max-w-xs mx-auto">
              Your homepage has been aligned to focus on {answers.goal?.toLowerCase()}. 
              A personalized protocol is ready.
            </p>
            <button 
              onClick={() => router.push("/shop")}
              className="mt-4 rounded-full bg-botanical-800 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-cream hover:bg-botanical-900 transition-colors shadow-premium"
            >
              Enter the Apothecary
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
