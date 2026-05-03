"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { brand } from "@/lib/brand";

export function AccountPageClient() {
  const { loading, user, signInEmail, signUpEmail, logout, isAdmin } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const helper = useMemo(
    () =>
      `${mode === "login" ? "Welcome back ceremonialist" : "Architect your luminous profile"} · ${
        brand.name
      }`,
    [mode],
  );

  async function submit(evt: React.FormEvent) {
    evt.preventDefault();
    setBusy(true);
    try {
      if (mode === "login") {
        await signInEmail(email, password);
      } else {
        await signUpEmail(email, password);
      }
      setEmail("");
      setPassword("");
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto mb-52 mt-32 max-w-3xl px-6">
      <div className="mb-14 space-y-5 text-center lg:text-left">
        <p className="text-xs uppercase tracking-[0.45em] text-botanical-500">Customer ceremonial desk</p>
        <h1 className="font-display text-[3.58rem] sm:text-[3.85rem]">Sign in gently · luminous accounts</h1>
        <p className="text-botanical-600">{helper}</p>
      </div>

      {!loading && user ? (
        <section className="rounded-[42px] border border-botanical-100 bg-white/95 backdrop-blur px-10 py-16 shadow-soft space-y-14">
          <div>
            <p className="text-xs uppercase tracking-[0.38em] text-botanical-500">Signed luminously as</p>
            <p className="font-display text-4xl">{user.email ?? "Sacred voyager"}</p>
          </div>
          {isAdmin ? (
            <Link className="text-gold-deep text-sm uppercase tracking-[0.43em]" href="/admin">
              Enter merchant console ·
            </Link>
          ) : null}

          <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
            <Link href="/shop" className="rounded-full bg-botanical-800 px-12 py-3 text-xs uppercase tracking-[0.33em] text-cream hover:bg-botanical-700 transition">
              Return to rituals
            </Link>
            <button
              type="button"
              className="rounded-full border border-botanical-200 px-12 py-3 text-xs uppercase tracking-[0.33em]"
              onClick={() => void logout()}
            >
              Gentle logout
            </button>
          </div>

          <p className="text-sm text-botanical-500">
            Checkout auto-links UID when Firebase creds wired — unlocking order dossiers forthcoming.
          </p>
        </section>
      ) : (
        <form className="rounded-[42px] border border-botanical-100 bg-white/95 backdrop-blur px-10 py-16 shadow-soft space-y-10" onSubmit={submit}>
          <div className="flex rounded-full bg-parchment p-3 text-[11px] uppercase tracking-[0.35em]">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-full px-11 py-[0.71rem] ${mode === "login" ? "bg-white shadow-sm" : "text-botanical-500"}`}
            >
              Ritual Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-full px-11 py-[0.71rem] ${mode === "signup" ? "bg-white shadow-sm" : "text-botanical-500"}`}
            >
              Create identity
            </button>
          </div>
          <label className="block space-y-3">
            <span className="text-xs uppercase tracking-[0.38em] text-botanical-500">Email*</span>
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-botanical-200 px-11 py-[0.85rem] outline-none focus:ring-2 focus:ring-botanical-600/50"
              placeholder={`you@${brand.contactEmail.split("@")[1]}`}
            />
          </label>

          <label className="block space-y-3">
            <span className="text-xs uppercase tracking-[0.38em] text-botanical-500">Password*</span>
            <input
              required
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              className="w-full rounded-full border border-botanical-200 px-11 py-[0.85rem] outline-none focus:ring-2 focus:ring-botanical-600/50"
            />
          </label>

          <button disabled={busy} type="submit" className="w-full rounded-full bg-botanical-800 px-13 py-[0.93rem] text-xs uppercase tracking-[0.38em] text-cream hover:bg-botanical-700 transition disabled:opacity-40">
            {busy ? "Sealing ceremonial keys..." : mode === "login" ? "Sign in calmly" : "Issue luminous keys"}
          </button>

          <p className="text-xs uppercase tracking-[0.26em] text-botanical-500 text-center lg:text-left">
            Admins elevate via Merchant login · whitelist email in NEXT_PUBLIC_ADMIN_EMAILS
          </p>
        </form>
      )}
    </div>
  );
}
