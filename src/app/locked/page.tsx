"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LockedPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // In Next.js App Router, we handle this via a simple route handler or just check env var client-side 
    // for simple site-wide locks (since it's a public env var for this purpose).
    const SITE_PASSWORD = process.env.NEXT_PUBLIC_SITE_PASSWORD || "raj";

    if (password === SITE_PASSWORD) {
      // Set cookie for 30 days
      document.cookie = `site-access=true; path=/; max-age=${60 * 60 * 24 * 30}`;
      toast.success("Welcome to AayuUnify");
      router.push("/");
      router.refresh(); // Refresh to clear middleware cache
    } else {
      toast.error("The password does not resonate.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-botanical-50 px-6 py-12">
      <div className="w-full max-w-md space-y-10 text-center">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-botanical-500">
            Sanctuary in preparation
          </p>
          <h1 className="font-display text-5xl text-botanical-900">AayuUnify</h1>
          <p className="text-sm leading-relaxed text-botanical-600">
            Our digital apothecary is currently refining its rituals. <br />
            Enter the secret key to preview the experience.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type="password"
              placeholder="Secret ritual key"
              required
              className="w-full rounded-full border border-botanical-200 bg-white px-8 py-4 text-center text-lg outline-none transition-all focus:ring-4 focus:ring-botanical-600/10 focus:border-botanical-400 group-hover:border-botanical-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-botanical-800 px-10 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-cream shadow-soft transition-all hover:bg-botanical-700 active:scale-95"
          >
            Enter Sanctuary
          </button>
        </form>

        <footer className="pt-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-botanical-400">
            AayuUnify © 2024 · Ceremonial Wellness
          </p>
        </footer>
      </div>
    </div>
  );
}
