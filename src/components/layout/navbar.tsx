"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { brand } from "@/lib/brand";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Ayurvedic Journal" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount, setIsOpen: setDrawerOpen } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const isAdminShell = pathname?.startsWith("/admin");

  const activeHref = useMemo(() => pathname ?? "/", [pathname]);

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    const q = query.trim();
    const url = q ? `/shop?q=${encodeURIComponent(q)}` : "/shop";
    router.push(url);
    setOpen(false);
  }

  if (isAdminShell) return null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-cream/90 backdrop-blur-xl border-b border-botanical-900/10 shadow-sm" 
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className={`mx-auto flex max-w-7xl items-center gap-6 px-4 transition-all duration-500 sm:px-6 lg:gap-10 lg:px-8 ${scrolled ? "py-4" : "py-6"}`}>
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight text-botanical-800"
          aria-label={`${brand.name} home`}
        >
          {brand.name}
        </Link>

        <form
          className={`hidden flex-1 items-center lg:flex rounded-full bg-white/80 backdrop-blur px-5 py-2 ring-1 focus-within:ring-2 focus-within:ring-botanical-500/40 transition-all duration-300 ${
            scrolled ? "shadow-sm ring-botanical-900/10" : "shadow-premium ring-transparent border border-botanical-200/50"
          }`}
          onSubmit={submitSearch}
        >
          <span className="mr-3 text-botanical-500">⌕</span>
          <input
            className="flex-1 bg-transparent text-sm text-botanical-900 placeholder:text-botanical-500 outline-none"
            placeholder="Search moringa, ACV..."
            aria-label="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="text-xs uppercase tracking-[0.2em] text-gold-deep px-4 py-2 rounded-full bg-parchment hover:bg-botanical-100 transition"
          >
            Search
          </button>
        </form>

        <div className="hidden lg:flex lg:items-center lg:gap-7 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative transition hover:text-botanical-600 ${activeHref === l.href ? "text-botanical-900" : "text-botanical-700"}`}
            >
              <span>{l.label}</span>
              {activeHref.startsWith(l.href) && (
                <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-gold-deep to-botanical-500" />
              )}
            </Link>
          ))}
          {user && (
            <span className="text-botanical-500 text-xs truncate max-w-[10rem]" title={user.email ?? undefined}>
              {user.email?.split("@")[0]}
            </span>
          )}
          {isAdmin && (
            <Link
              href="/admin"
              className="text-gold-deep font-semibold underline-offset-8 hover:text-botanical-800"
            >
              Admin
            </Link>
          )}
          {!user ? (
            <Link
              href="/account"
              className="rounded-full border border-botanical-200 px-5 py-2 text-xs uppercase tracking-[0.15em]"
            >
              Sign in
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => void logout()}
              className="text-xs uppercase tracking-[0.2em]"
            >
              Logout
            </button>
          )}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded-full bg-botanical-800 px-6 py-2 text-xs uppercase tracking-[0.2em] text-cream hover:bg-botanical-700 transition relative"
          >
            Cart
            <span className="ml-3 inline-flex h-6 min-w-[1.75rem] items-center justify-center rounded-full bg-gold-deep text-[11px] text-cream px-2">
              {itemCount}
            </span>
          </button>
        </div>

        <div className="ml-auto flex items-center gap-3 lg:hidden">
          <button
            type="button"
            className="inline-flex rounded-full bg-botanical-800 px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-cream"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open cart"
          >
            Cart · {itemCount}
          </button>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-12 items-center justify-center rounded-xl border border-botanical-200 text-lg"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "×" : "≡"}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="border-t border-botanical-900/10 bg-cream lg:hidden px-6 pb-6"
          >
            <form className="mt-4 flex rounded-2xl bg-white p-4 shadow-soft" onSubmit={submitSearch}>
              <input
                className="flex-1 text-sm outline-none placeholder:text-botanical-500 bg-transparent pr-4"
                placeholder="Search Ayurvedic staples..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="text-xs uppercase tracking-[0.25em]" type="submit">
                Go
              </button>
            </form>

            <div className="mt-6 grid gap-3 text-botanical-800 font-medium">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl border border-botanical-100 px-5 py-3"
                >
                  {l.label}
                  <span>→</span>
                </Link>
              ))}
              <Link href="/account" className="text-sm text-botanical-600" onClick={() => setOpen(false)}>
                Customer sign in · Create account
              </Link>
              {isAdmin && (
                <Link href="/admin" className="text-sm text-gold-deep" onClick={() => setOpen(false)}>
                  Admin console
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
