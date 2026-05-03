"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export function AdminGuard({
  fallback,
  children,
}: {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { loading, user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/account");
      return;
    }
    if (!isAdmin) {
      router.replace("/");
    }
  }, [loading, user, isAdmin, router]);

  if (loading) return fallback ?? <div className="p-24 text-center text-botanical-500 uppercase tracking-[0.25em]">Authorising ceremonial keys…</div>;

  if (!user || !isAdmin) return null;

  return (
    <>
      <div className="border border-botanical-100 bg-botanical-50 px-11 py-[0.93rem] text-xs uppercase tracking-[0.43em] text-botanical-800 flex justify-between rounded-full gap-14">
        <Link href="/" className="font-semibold text-gold-deep">
          ← Return to luminous storefront
        </Link>
        <span>FIRESTORE · ADMIN</span>
      </div>
      {children}
    </>
  );
}
