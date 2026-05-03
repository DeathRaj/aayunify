import type { Metadata } from "next";
import { ContactPageClient } from "@/components/marketing/contact-page";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact · WhatsApp concierge",
  description: `Reach ${brand.name} instantly on WhatsApp or email · partnerships & care desk.`,
};

export default function ContactPage() {
  return <ContactPageClient />;
}
