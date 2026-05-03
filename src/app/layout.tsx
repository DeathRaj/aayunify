import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
// Triggering production build with fixed linting
import { brand } from "@/lib/brand";
import { AppProviders } from "@/components/providers/app-providers";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteRoot =
  process.env.NEXT_PUBLIC_SITE_URL?.startsWith("http")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_URL?.startsWith("http")
      ? process.env.VERCEL_URL
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteRoot),
  title: {
    default: `${brand.name} | Ayurvedic Wellness & Herbal Essentials`,
    template: `%s · ${brand.name}`,
  },
  description: brand.heroSubtitle.slice(0, 155),
  openGraph: {
    title: brand.name,
    description: brand.shortTagline,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.shortTagline,
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} min-h-dvh`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
