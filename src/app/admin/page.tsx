import Link from "next/link";
import { AdminGuard } from "@/components/admin/admin-guard";

export default function AdminHomePage() {
  return (
    <AdminGuard>
      <section className="space-y-8">
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-botanical-500">
            Sovereign constellation
          </p>
          <h1 className="mt-4 font-display text-5xl">Merchant ceremonial desk</h1>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Link
            href="/admin/products"
            className="rounded-[36px] border border-botanical-100 bg-white/95 p-10 shadow-soft backdrop-blur transition hover:border-botanical-200"
          >
            <span className="block text-xs uppercase tracking-[0.35em] text-botanical-500">
              SKU orchestration · inventory
            </span>
            <h2 className="mt-4 font-display text-3xl">Manage products</h2>
            <p className="mt-6 text-sm text-botanical-600">
              Upsert dossiers · seed starter catalog · Firestore fidelity.
            </p>
          </Link>

          <Link
            href="/admin/orders"
            className="rounded-[36px] border border-botanical-100 bg-white/95 p-10 shadow-soft backdrop-blur transition hover:border-botanical-200"
          >
            <span className="block text-xs uppercase tracking-[0.35em] text-botanical-500">
              Fulfillment · COD desk
            </span>
            <h2 className="mt-4 font-display text-3xl">Orders ledger</h2>
            <p className="mt-6 text-sm text-botanical-600">
              Update payment status · ship states · escalate via WhatsApp.
            </p>
          </Link>
        </div>
      </section>
    </AdminGuard>
  );
}
