import type { Metadata } from "next";
import { ShopClientShell } from "@/components/catalog/shop-client";
import { seedDocsFromCatalog } from "@/lib/catalog-fallback";

export const metadata: Metadata = {
  title: "Shop Ayurvedic essentials",
  description:
    "Browse Moringa leaf powder & Apple Cider Vinegar effervescent tablets filterable by modality.",
};

export default function ShopPage() {
  return <ShopClientShell fallback={seedDocsFromCatalog()} />;
}
