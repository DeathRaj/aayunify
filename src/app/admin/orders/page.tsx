import type { Metadata } from "next";
import { AdminGuard } from "@/components/admin/admin-guard";
import { OrdersManager } from "@/components/admin/orders-manager";

export const metadata: Metadata = {
  title: "Admin · Orders",
};

export default function AdminOrdersPage() {
  return (
    <AdminGuard>
      <div className="space-y-10 mt-10">
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-botanical-500">Merchant desk</p>
          <h1 className="mt-4 font-display text-5xl">Orders ledger</h1>
        </header>
        <OrdersManager />
      </div>
    </AdminGuard>
  );
}
