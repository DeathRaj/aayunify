import { defaultProductsSeed } from "@/lib/default-products";
import { brand } from "@/lib/brand";

const map = Object.fromEntries(defaultProductsSeed.map((p) => [p.slug, p]));

export function getProductSEO(slug: string) {
  const product = map[slug];
  if (!product) {
    return {
      title: "Product unavailable",
      description: "Explore our Ayurvedic apothecary for fresh rituals.",
    };
  }

  const description = `${product.shortDescription.slice(0, 155)}`;

  return {
    title: product.name,
    description,
    openGraph: {
      title: `${product.name} · ${brand.name}`,
      description,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}
