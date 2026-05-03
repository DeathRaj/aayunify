import type { Metadata } from "next";
import { ProductPageShell } from "@/components/catalog/product-page-shell";
import { seedDocsFromCatalog } from "@/lib/catalog-fallback";
import { getProductSEO } from "@/lib/seo-products";

type PageProps = {
  params: { slug: string };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const seo = getProductSEO(params.slug);
  return {
    title: seo.title,
    description: seo.description,
    openGraph: seo.openGraph,
  };
}

export default function ProductPage({ params }: PageProps) {
  return <ProductPageShell slug={params.slug} fallback={seedDocsFromCatalog()} />;
}
