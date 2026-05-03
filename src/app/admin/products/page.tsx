import type { Metadata } from "next";
import { ProductsManager } from "@/components/admin/products-manager";
import { AdminGuard } from "@/components/admin/admin-guard";
import { seedDocsFromCatalog } from "@/lib/catalog-fallback";

export const metadata: Metadata = {
  title: "Admin · Products",
};

export default function AdminProductsPage() {
  return (
    <AdminGuard>
      <div className="space-y-10">
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-botanical-500">Merchant desk</p>
          <h1 className="mt-4 font-display text-5xl">Manage products</h1>
        </header>
        <ProductsManager seedDocs={seedDocsFromCatalog()} />
      </div>
    </AdminGuard>
  );
}
