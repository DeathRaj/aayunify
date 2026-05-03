import type { Timestamp } from "firebase/firestore";

export type ProductCategory = "Powders" | "Effervescents" | "All";

export type ProductBadge = "bestseller" | "sale";

export type ProductDoc = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  category: Exclude<ProductCategory, "All">;
  shortDescription: string;
  description: string;
  benefits: string[];
  ingredients: string;
  usage: string;
  images: string[];
  badges: ProductBadge[];
  /** Stock on hand — admin managed */
  inventory: number;
  sku?: string;
};

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type PaymentMethod = "upi" | "cod" | "whatsapp";

export type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

export type OrderDoc = {
  id: string;
  createdAt: Timestamp | null;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shipping: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: { productId: string; name: string; qty: number; unitPrice: number }[];
  subtotal: number;
  discount: number;
  total: number;
  coupon?: string | null;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  userId?: string | null;
};
