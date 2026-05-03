import type { ProductDoc } from "@/types";

export type SeedProductInput = Omit<ProductDoc, "id">;

/**
 * Canonical catalog used to seed Firestore — extend as you add SKU.
 */
export const defaultProductsSeed: SeedProductInput[] = [
  {
    slug: "moringa-leaf-powder",
    name: "Moringa Leaf Powder",
    price: 599,
    compareAtPrice: 749,
    category: "Powders",
    shortDescription:
      "Nutrient-dense Ayurvedic greens for daily vitality, immunity, and natural energy.",
    description:
      "Our Moringa Leaf Powder captures the potency of thoughtfully sourced moringa — sun-dried, gently milled, and lab-tested for purity. Fold it into smoothies, warm plant milks, or traditional recipes as an everyday ritual rooted in Ayurveda.",
    benefits: [
      "Plant-based nourishment for vitality & daily wellness rituals",
      "Supports immunity with naturally occurring vitamins & minerals",
      "Helps sustained energy without harsh stimulants",
      "Gentle support for digestion & inflammatory balance when paired with a healthy lifestyle",
    ],
    ingredients:
      "100% pure Moringa oleifera leaf powder. No preservatives, fillers, or added sugar.",
    usage:
      "Stir ½–1 tsp into lukewarm water, smoothie, honey, or your favourite ritual drink once or twice daily, or as directed by your healthcare practitioner.",
    images: [
      "https://images.unsplash.com/photo-1576045057995-435f21dfdae4?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1400&auto=format&fit=crop",
    ],
    badges: ["bestseller", "sale"],
    inventory: 120,
    sku: "AYU-MOR-100",
  },
  {
    slug: "apple-cider-vinegar-moringa-effervescent",
    name: "Apple Cider Vinegar with Moringa",
    price: 449,
    compareAtPrice: 549,
    category: "Effervescents",
    shortDescription:
      "Effervescent daily support for metabolism flavour, acidity balance, and clean convenience.",
    description:
      "A modern Ayurvedic-forward format: apple cider vinegar’s functional appeal meets moringa’s plant intelligence — dissolved in sparkling water for a ritual you’ll actually crave. Precision effervescence preserves delicate actives and delivers a smooth sipping experience.",
    benefits: [
      "Daily weight-management support alongside diet & exercise",
      "Refreshing routine for metabolism-friendly hydration",
      "Immune & oxidative stress support patterns from tonic botanicals",
      "Heart-conscious lifestyle stacking when paired with movement & fibre-rich meals",
    ],
    ingredients:
      "Apple Cider Vinegar powder, Moringa leaf extract, natural flavours, acidity regulators (citric acid, sodium bicarbonate), sweeteners from natural sources.",
    usage:
      "Drop one tablet into 200ml water, wait until fully dissolved, sip slowly. Preferably after a light breakfast or guided by your healthcare practitioner.",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505751172876-fa192ed6cdf4?q=80&w=1400&auto=format&fit=crop",
    ],
    badges: ["sale"],
    inventory: 180,
    sku: "AYU-ACV-15",
  },
];
