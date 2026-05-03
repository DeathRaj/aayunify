"use client";

import type { User } from "firebase/auth";

/** Comma-separated list in NEXT_PUBLIC_ADMIN_EMAILS */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "";
  const list = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

export function isAdminUser(user: User | null): boolean {
  return isAdminEmail(user?.email ?? null);
}
