import { defaultProductsSeed } from "@/lib/default-products";
import type { ProductDoc } from "@/types";

export function seedDocsFromCatalog(): ProductDoc[] {
  return defaultProductsSeed.map((seed) => ({
    ...seed,
    id: `local:${seed.slug}`,
  }));
}
