"use client";

import { useState } from "react";
import { toast } from "sonner";
import { brand } from "@/lib/brand";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please share a lovingly valid inbox.");
      return;
    }
    toast.success(`${brand.name} newsletter reserved`, {
      description: "Firebase collection hook coming soon — meanwhile we’ll cherish your ritual intent ✨.",
    });
    setEmail("");
  }

  return (
    <section className="relative mx-auto mt-32 mb-28 max-w-6xl px-8 py-14 rounded-[40px] border border-botanical-100 bg-white/90 backdrop-blur-2xl shadow-soft overflow-hidden">
      <div className="absolute inset-x-[-30%] top-[-40%] h-96 bg-botanical-100 blur-[170px]" aria-hidden />
      <div className="relative text-center mx-auto space-y-5 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.34em] text-botanical-500">
          Newsletter · Ayurvedic playbook
        </p>
        <h2 className="font-display text-4xl">Receive curated Ayurvedic intelligence & micro-rituals</h2>
        <p className="text-botanical-600">
          Herbal masterclasses · launch drops · ceremonial recipes — thoughtfully infrequent so your inbox stays sacred.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="relative mx-auto mt-10 flex flex-col md:flex-row items-stretch rounded-full border border-botanical-200 bg-cream px-7 py-2 gap-5 md:gap-0">
        <input
          aria-label="Email address"
          className="flex-1 bg-transparent text-sm px-4 py-3 outline-none rounded-full md:rounded-none"
          placeholder={`you@${brand.contactEmail.split("@")[1]}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="inline-flex justify-center items-center shrink-0 rounded-full bg-botanical-800 px-14 py-[0.9rem] text-[11px] uppercase tracking-[0.24em] text-cream" type="submit">
          Invite me
        </button>
      </form>
      <p className="relative mx-auto mt-6 text-[11px] uppercase tracking-[0.24em] text-botanical-500 text-center">
        No spam · Unsubscribe calmly anytime
      </p>
    </section>
  );
}
