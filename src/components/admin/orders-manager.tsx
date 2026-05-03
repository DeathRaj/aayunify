"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { OrderDoc } from "@/types";
import { subscribeOrders, updateOrderStatus } from "@/lib/repository/orders";
import { isFirebaseConfigured } from "@/lib/firebase";

type HydratedOrder = Omit<OrderDoc, "createdAt"> & {
  createdAt: OrderDoc["createdAt"];
};

export function OrdersManager() {
  const [orders, setOrders] = useState<HydratedOrder[]>([]);

  useEffect(() => {
    if (!isFirebaseConfigured()) return undefined;
    try {
      const unsub = subscribeOrders((incoming) =>
        setOrders(incoming.map((doc) => doc as HydratedOrder)),
      );
      return () => unsub();
    } catch {
      return undefined;
    }
  }, []);

  async function handleStatus(orderId: string, status: OrderDoc["status"]) {
    try {
      await updateOrderStatus(orderId, status);
      toast.success("Order status refreshed");
    } catch (error) {
      console.error(error);
      toast.error("Firestore blocked this update · review rules.");
    }
  }

  function formatTs(ts: OrderDoc["createdAt"]) {
    if (!ts) return "—";
    try {
      return ts.toDate().toLocaleString("en-IN");
    } catch {
      return "pending";
    }
  }

  return (
    <div className="rounded-[38px] border border-botanical-100 bg-white/95 backdrop-blur p-10 shadow-soft">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.42em] text-botanical-500">Merchant desk</p>
        <h2 className="mt-3 font-display text-4xl">Orders & COD orchestration</h2>
      </header>

      {!orders.length ? (
        <p className="text-sm text-botanical-500">
          Completed checkouts populate here instantly when Firebase stores `orders`.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.25em] text-botanical-500">
                <th className="py-3 pr-4">When</th>
                <th className="py-3 pr-4">Customer</th>
                <th className="py-3 pr-4">Total</th>
                <th className="py-3 pr-4">Rails</th>
                <th className="py-3 pr-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-botanical-100 align-top">
                  <td className="py-4 pr-4 text-xs text-botanical-500">{formatTs(order.createdAt)}</td>
                  <td className="py-4 pr-4">
                    <p className="font-medium text-botanical-900">{order.customer.name}</p>
                    <p className="text-xs text-botanical-500">{order.customer.email}</p>
                    <p className="text-xs text-botanical-500">{order.customer.phone}</p>
                  </td>
                  <td className="py-4 pr-4 whitespace-nowrap">
                    ₹{order.total.toLocaleString("en-IN")}
                    <p className="text-xs text-botanical-500">
                      {order.items.reduce((sum, row) => sum + row.qty, 0)} units
                    </p>
                  </td>
                  <td className="py-4 pr-4 text-xs uppercase tracking-[0.2em] text-botanical-600">
                    {order.paymentMethod}
                  </td>
                  <td className="py-4 pl-6 text-right">
                    <select
                      className="rounded-full border border-botanical-200 px-4 py-2 text-xs uppercase tracking-[0.2em]"
                      aria-label={`Update status ${order.id}`}
                      defaultValue={order.status}
                      onChange={(evt) =>
                        void handleStatus(order.id, evt.target.value as OrderDoc["status"])
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="shipped">Shipped</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
