"use client";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  doc,
  type Firestore,
  type Timestamp,
} from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase";
import type { OrderDoc, PaymentMethod } from "@/types";

const COL = "orders";

export type CheckoutPayload = {
  customer: OrderDoc["customer"];
  shipping: OrderDoc["shipping"];
  items: OrderDoc["items"];
  subtotal: number;
  discount: number;
  total: number;
  coupon?: string | null;
  paymentMethod: PaymentMethod;
  userId?: string | null;
};

function mapDoc(
  id: string,
  data: Record<string, unknown>,
): Omit<OrderDoc, "createdAt"> & { createdAt: Timestamp | null } {
  return {
    id,
    createdAt:
      data.createdAt && typeof data.createdAt === "object"
        ? (data.createdAt as Timestamp)
        : null,
    customer: data.customer as OrderDoc["customer"],
    shipping: data.shipping as OrderDoc["shipping"],
    items: data.items as OrderDoc["items"],
    subtotal: Number(data.subtotal ?? 0),
    discount: Number(data.discount ?? 0),
    total: Number(data.total ?? 0),
    coupon: data.coupon ? String(data.coupon) : null,
    paymentMethod: data.paymentMethod as PaymentMethod,
    status: data.status as OrderDoc["status"],
    userId: data.userId ? String(data.userId) : null,
  };
}

export async function createOrder(
  payload: CheckoutPayload,
  db?: Firestore,
): Promise<string> {
  const d = db ?? getFirestoreDb();
  /** Every checkout record starts unpaid/unfulfilled until:
   * - UPI: Razorpay (or your verifier) confirms payment → flip to `"paid"` server-side only.
   * - COD / WhatsApp: concierge marks paid/shipped once cash clears or WhatsApp intake closes.
   * Use `paymentMethod` + admin updates for routing; avoid marking `"paid"` on create without proof. */
  const docRef = await addDoc(collection(d, COL), {
    ...payload,
    createdAt: serverTimestamp(),
    status: "pending" satisfies OrderDoc["status"],
  });
  return docRef.id;
}

export function subscribeOrders(
  cb: (items: ReturnType<typeof mapDoc>[]) => void,
  db?: Firestore,
): () => void {
  const d = db ?? getFirestoreDb();
  const q = query(collection(d, COL), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) =>
    cb(
      snap.docs.map((s) =>
        mapDoc(s.id, s.data() as Record<string, unknown>),
      ),
    ),
  );
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderDoc["status"],
  db?: Firestore,
) {
  const d = db ?? getFirestoreDb();
  await updateDoc(doc(d, COL, orderId), { status });
}
