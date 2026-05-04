# AayuUnify · Technical & Design Documentation

AayuUnify is a premium, high-conversion D2C e-commerce platform built for a luxury Ayurvedic wellness brand. It blends modern "Apple-style" minimalism with an organic, "Aesop-inspired" botanical aesthetic.

---

## 🚀 Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) | App Router, Server Components, and optimized routing. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe development for robust application logic. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS with a custom design system and tokens. |
| **3D Engine** | [Three.js](https://threejs.org/) | WebGL-powered 3D graphics in the Hero section. |
| **3D Bridge** | [@react-three/fiber](https://r3f.docs.pmnd.rs/) | Declarative Three.js components for React. |
| **3D Utils** | [@react-three/drei](https://github.com/pmndrs/drei) | Helpers for shadows, floating effects, and preloading. |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Smooth fade-ups, staggered lists, and interactive transitions. |
| **Database** | [Firebase Firestore](https://firebase.google.com/products/firestore) | NoSQL real-time database for products and orders. |
| **Auth** | [Firebase Auth](https://firebase.google.com/products/auth) | Secure admin access and user identification. |
| **Payments** | [Razorpay](https://razorpay.com/) | Scaffolded for UPI and card processing. |
| **Logic** | Custom Hooks | Shopping cart, coupon application, and auth guards. |
| **Feedback** | [Sonner](https://sonner.emilkowal.ski/) | Premium, lightweight toast notifications. |

---

## 🎨 Design System & Aesthetics

The design philosophy focuses on **"Luminous Wellness"** — clean, spacious, and premium.

### 1. Color Palette
- **Botanical Green (#1f4634)**: The primary brand color, used for deep accents and grounding elements.
- **Gold (#c9a24d)**: Used for premium highlights, ratings, and call-to-action details.
- **Cream (#fffdf9) & Sand (#f6f3eb)**: The background foundation, providing a soft, paper-like feel compared to clinical white.
- **Parchment (#f0eadd)**: Used for secondary sections and subtle depth.

### 2. Typography
- **Display**: *Cormorant Garamond* (Serif) — Elegant, traditional, and high-end. Used for headings.
- **Body**: *DM Sans* (Sans-serif) — Modern, highly readable, and clean. Used for UI and descriptions.

### 3. Visual Effects
- **Glassmorphism**: Backdrop blurs (`backdrop-blur-xl`) on navigation bars and floating pills.
- **Magnetic Buttons**: Custom interactive buttons that "pull" towards the cursor for a tactile feel.
- **Shimmer Effects**: Animated gradient overlays on primary buttons to guide user attention.
- **Soft Shadows**: Custom `shadow-premium` tokens for subtle elevation without clutter.

---

## ✨ Core Features

### 💎 Interactive Hero Experience
The landing page features a **WebGL Antigravity Layer**. 3D Ayurvedic bottles and jars float in the background, reacting dynamically to the user's scroll position. This is optimized for performance using low-poly geometries and adaptive DPR (Device Pixel Ratio).

### 🛒 Ritual Shopping Cart
- **Persistent State**: Cart items are saved to local storage, ensuring no progress is lost.
- **Bundle Logic**: Integrated "Complete your Ritual" section that suggests complementary products.
- **Coupon System**: Dynamic application of discount codes (e.g., `AAYU10`) with real-time subtotal updates.
- **Micro-interactions**: Spring-based drawer animations and haptic-like quantity updates.

### 🔐 Ceremonial Checkout
Tailored for the Indian market:
- **Payment Methods**: Native support for **UPI**, **Cash on Delivery (COD)**, and **WhatsApp Concierge**.
- **WhatsApp Orchestration**: After placing an order, users are redirected to WhatsApp with a pre-filled, formatted message. This acts as an instant notification for the admin and a confirmation for the user.
- **Firestore Fidelity**: Orders are persisted to Firebase for record-keeping and admin management.

### 🛠 Admin Ceremonial Desk
A secure dashboard for store management:
- **SKU Orchestration**: Add, edit, and delete products in real-time.
- **Orders Ledger**: Track fulfillment status, payment states, and customer dossiers.

---

## 📈 Performance & SEO
- **Optimized Assets**: Uses `next/image` for WebP conversion and lazy loading.
- **Semantic HTML**: Proper heading hierarchies and ARIA labels for accessibility.
- **Metadata**: Dynamic OpenGraph and Twitter card generation for premium social sharing.
- **WebGL Optimization**: Disabled antialiasing and stencil buffers on mobile to ensure 60fps on most devices.

---

## 📁 Project Structure
- `/src/app`: Next.js 14 App Router (Routes & Layouts).
- `/src/components`: UI components (Shadcn-like structure but vanilla-styled).
- `/src/context`: React Context for Cart and Auth state management.
- `/src/lib`: Core logic (Firebase, WhatsApp URL builders, brand constants).
- `/public`: Static assets, images, and fonts.
