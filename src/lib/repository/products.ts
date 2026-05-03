"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type Firestore,
} from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase";
import { defaultProductsSeed } from "@/lib/default-products";
import { pruneUndefined } from "@/lib/object";
import type { ProductDoc } from "@/types";

const COL = "products";

function mapDoc(id: string, data: Record<string, unknown>): ProductDoc {
  return {
    id,
    slug: String(data.slug ?? ""),
    name: String(data.name ?? ""),
    price: Number(data.price ?? 0),
    compareAtPrice:
      data.compareAtPrice !== undefined ? Number(data.compareAtPrice) : undefined,
    category: data.category as ProductDoc["category"],
    shortDescription: String(data.shortDescription ?? ""),
    description: String(data.description ?? ""),
    benefits: Array.isArray(data.benefits) ? (data.benefits as string[]) : [],
    ingredients: String(data.ingredients ?? ""),
    usage: String(data.usage ?? ""),
    images: Array.isArray(data.images) ? (data.images as string[]) : [],
    badges: Array.isArray(data.badges) ? (data.badges as ProductDoc["badges"]) : [],
    inventory: Number(data.inventory ?? 0),
    sku: data.sku ? String(data.sku) : undefined,
  };
}

export async function fetchAllProducts(db?: Firestore): Promise<ProductDoc[]> {
  const d = db ?? getFirestoreDb();
  const snapshot = await getDocs(query(collection(d, COL), orderBy("name")));
  return snapshot.docs.map((s) =>
    mapDoc(s.id, s.data() as Record<string, unknown>),
  );
}

export function subscribeProducts(
  cb: (items: ProductDoc[]) => void,
  db?: Firestore,
): () => void {
  const d = db ?? getFirestoreDb();
  const q = query(collection(d, COL), orderBy("name"));
  return onSnapshot(q, (snap) =>
    cb(
      snap.docs.map((s) =>
        mapDoc(s.id, s.data() as Record<string, unknown>),
      ),
    ),
  );
}

export type ProductUpsertPayload = Omit<ProductDoc, "id"> &
  Partial<Pick<ProductDoc, "id">>;

export async function upsertProduct(
  payload: ProductUpsertPayload,
  db?: Firestore,
): Promise<string> {
  const d = db ?? getFirestoreDb();
  const { id, ...rest } = payload;
  const body = pruneUndefined({
    ...rest,
    updatedAt: serverTimestamp(),
  });
  if (id) {
    await updateDoc(doc(d, COL, id), body);
    return id;
  }
  const draft = pruneUndefined({
    ...rest,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  const ref = await addDoc(collection(d, COL), draft);
  return ref.id;
}

export async function deleteProduct(productId: string, db?: Firestore) {
  const d = db ?? getFirestoreDb();
  await deleteDoc(doc(d, COL, productId));
}

/** One-click starter catalog for empty stores (admin dashboard). */
export async function seedDefaultCatalog(db?: Firestore): Promise<number> {
  const d = db ?? getFirestoreDb();
  const existing = await getDocs(collection(d, COL));
  const existingSlugs = new Set(
    existing.docs.map(
      (s) =>
        ((s.data() as Record<string, unknown>).slug ?? "") as string,
    ),
  );
  let added = 0;
  for (const seed of defaultProductsSeed) {
    if (existingSlugs.has(seed.slug)) continue;
    await addDoc(collection(d, COL), {
      ...seed,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    existingSlugs.add(seed.slug);
    added += 1;
  }
  return added;
}
