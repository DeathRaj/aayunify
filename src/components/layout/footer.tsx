"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand } from "@/lib/brand";
import { buildWhatsAppContactUrl } from "@/lib/whatsapp";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Shop all", href: "/shop" },
      { label: "Moringa story", href: "/products/moringa-leaf-powder" },
      { label: "ACV effervescent", href: "/products/apple-cider-vinegar-moringa-effervescent" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "About & mission", href: "/about" },
      { label: "Ayurvedic journal", href: "/blog" },
      { label: "Contact care desk", href: "/contact" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="mt-28 border-t border-botanical-900/10 bg-sand px-6 py-14">
      <div className="mx-auto grid gap-14 max-w-7xl lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))]">
        <div>
          <p className="font-display text-3xl">{brand.name}</p>
          <p className="mt-5 max-w-xl text-botanical-600 leading-relaxed">
            {brand.shortTagline} · {brand.heroSubtitle.slice(0, 190)}...
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
            <a
              href={buildWhatsAppContactUrl()}
              className="inline-flex rounded-full bg-botanical-800 px-5 py-2 text-white"
              target="_blank"
              rel="noreferrer noopener"
            >
              WhatsApp concierge
            </a>
            <a
              className="inline-flex rounded-full border border-botanical-200 px-5 py-2"
              href={`mailto:${brand.contactEmail}`}
            >
              {brand.contactEmail}
            </a>
          </div>
        </div>
        {columns.map((column) => (
          <div key={column.title} className="space-y-4">
            <p className="text-xs uppercase tracking-[0.34em] text-botanical-500">
              {column.title}
            </p>
            <ul className="space-y-3 text-botanical-800">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-gold-deep transition" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.34em] text-botanical-500">Social presence</p>
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            <a href={brand.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-botanical-600">
              Instagram
            </a>
            <a href={brand.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-botanical-600">
              Youtube
            </a>
            <a href={brand.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-botanical-600">
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex flex-col gap-4 border-t border-botanical-100 pt-10 max-w-7xl text-[13px] text-botanical-500 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {brand.name}. Formulated thoughtfully in India.</span>
        <div className="flex gap-4">
          <Link href="/shop" className="hover:text-botanical-800">
            Shop
          </Link>
          <Link href="/account" className="hover:text-botanical-800">
            Merchant login
          </Link>
        </div>
      </div>
    </footer>
  );
}
