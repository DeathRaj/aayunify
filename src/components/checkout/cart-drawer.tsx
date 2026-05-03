"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function currency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function CartDrawer() {
  const { lines, subtotal, isOpen, setIsOpen, removeLine, setQty } = useCart();
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[60] bg-botanical-900/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-cream shadow-2xl flex flex-col"
          >
            <header className="px-8 py-6 border-b border-botanical-100 flex items-center justify-between bg-white">
              <h2 className="font-display text-2xl text-botanical-900">Your Ritual Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-botanical-50 rounded-full transition-colors"
              >
                ✕
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
              {lines.length === 0 ? (
                <div className="text-center py-20 space-y-6">
                  <p className="text-botanical-500 uppercase tracking-widest text-xs">Apothecary is empty</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-botanical-900 font-semibold underline underline-offset-4"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                lines.map((line) => (
                  <div key={line.productId} className="flex gap-6 group">
                    <div className="relative h-24 w-24 flex-shrink-0 rounded-2xl overflow-hidden bg-white border border-botanical-100 shadow-sm">
                      <Image
                        src={line.image || "/placeholder.jpg"}
                        alt={line.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between gap-4">
                        <h3 className="font-semibold text-botanical-900 leading-tight">{line.name}</h3>
                        <button
                          onClick={() => removeLine(line.productId)}
                          className="text-[10px] uppercase tracking-widest text-botanical-400 hover:text-red-500 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-botanical-100 rounded-full bg-white px-2">
                          <button
                            onClick={() => setQty(line.productId, line.quantity - 1)}
                            className="p-1 px-2 text-botanical-500 hover:text-botanical-900"
                          >
                            −
                          </button>
                          <span className="px-2 text-xs font-bold text-botanical-800">{line.quantity}</span>
                          <button
                            onClick={() => setQty(line.productId, line.quantity + 1)}
                            className="p-1 px-2 text-botanical-500 hover:text-botanical-900"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-semibold text-botanical-900">{currency(line.price * line.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {lines.length > 0 && (
              <footer className="px-8 py-8 border-t border-botanical-100 bg-white space-y-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-widest text-botanical-500">Subtotal</span>
                  <span className="font-display text-3xl text-botanical-900">{currency(subtotal)}</span>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/checkout");
                    }}
                    className="w-full rounded-full bg-botanical-800 py-4 text-xs font-bold uppercase tracking-[0.2em] text-cream hover:bg-botanical-900 transition-all shadow-premium"
                  >
                    Proceed to checkout →
                  </button>
                  <p className="text-[10px] text-center text-botanical-400 uppercase tracking-widest">
                    Complimentary shipping on rituals above ₹2,000
                  </p>
                </div>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
