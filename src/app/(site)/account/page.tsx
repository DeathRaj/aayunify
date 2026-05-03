import type { Metadata } from "next";
import { AccountPageClient } from "@/components/account/account-page";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Account · ${brand.name}`,
  description: `Sign in gently · escalate to admin consoles when authorised · ${brand.name}.`,
};

export default function AccountPage() {
  return <AccountPageClient />;
}
