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
| **3D Utils** | [@react-three/drei](https://github.com/pmndrs/drei) | Helpers for transmission, shadows, adaptive resolution, and scroll-linked animation. |
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
- **Display**: *Cormorant Garamond* (Serif) — Elegant, traditional, and high-end. Headings use explicit font-metric matching fallbacks to eliminate Layout Shift (CLS).
- **Body**: *DM Sans* (Sans-serif) — Modern, highly readable, and clean. Used for UI and descriptions.

### 3. Visual Effects
- **Glassmorphism**: Backdrop blurs (`backdrop-blur-xl`) on navigation bars and floating pills.
- **Magnetic Buttons**: Custom interactive buttons that "pull" towards the cursor with strategic `will-change` layer promotion during interaction.
- **Shimmer Effects**: Animated gradient overlays on primary buttons to guide user attention.
- **Luminous Glass**: Custom WebGL shaders utilizing `MeshTransmissionMaterial`. Parameters include high-quality transmission (`transmission: 1`), physical thickness (`thickness: 1.2`), and chromatic aberration (`0.06`) to simulate realistic light splitting.
- **Cinematic Lighting**: A multi-layered lighting setup including an `Environment` map (preset: "forest") for realistic reflections, a high-penumbra `SpotLight` for soft shadows, and a mint-tinted `PointLight` for botanical color bleeding.

---

## ⚡ Performance Engineering (60fps Refactor)

The platform is engineered for a flawless, lag-free experience on both mobile and high-end desktop displays.

### 1. Adaptive WebGL Layer
The **Antigravity Hero** uses a sophisticated render-suspension and scaling system:
- **Render Suspension**: The 3D `<Canvas>` automatically unmounts when the hero section scrolls out of view (using `framer-motion`'s `useInView`), reclaiming 100% of GPU resources and VRAM.
- **Performance Monitor**: Real-time FPS monitoring via `@react-three/drei`'s `PerformanceMonitor`. It dynamically scales the Device Pixel Ratio (DPR) between `0.5` and `1.5` based on GPU headroom and frame stability.
- **Mobile Degradation**: If a device cannot sustain 30fps after a strict 3-second monitoring window, the WebGL layer is replaced by a graceful, CSS-animated WebP fallback image.
- **Modular Scene Architecture**: The scene is decoupled into `LuminousBottle` and `LuminousJar` components, allowing for independent optimization of polygon counts and material complexity based on the device profile.

### 2. Optimized State Architecture
The cart system was refactored into a **Split Context Architecture**:
- **CartDataContext**: Manages items and business logic.
- **CartUIContext**: Manages drawer open/close states.
- **Benefit**: Toggling the cart drawer no longer triggers re-renders of the entire product grid or navigation bar, solving an O(N) re-render bottleneck.

### 3. GPU-Composited Scrolling
- **Reflow Elimination**: Replaced legacy `background-attachment: fixed` (which kills mobile scroll performance) with a `position: fixed` pseudo-element.
- **Layer Promotion**: Strategic use of `will-change: transform` on heavy components (Cart Drawer, Magnetic Buttons) to ensure they reside on their own GPU compositor layers.

---

## ✨ Core Features

### 💎 Interactive Hero Experience
The landing page features a **WebGL Antigravity Layer**. 3D Ayurvedic bottles and jars float in the background, reacting dynamically to the user's scroll position.

### 🛒 Ritual Shopping Cart
- **Persistent State**: Cart items are saved to local storage, ensuring no progress is lost.
- **Bundle Logic**: Integrated "Complete your Ritual" section that suggests complementary products.
- **Coupon System**: Dynamic application of discount codes (e.g., `AAYU10`) with real-time subtotal updates.
- **Micro-interactions**: Spring-based drawer animations and haptic-like quantity updates.

### 🔐 Ceremonial Checkout
Tailored for the Indian market:
- **Payment Methods**: Native support for **UPI**, **Cash on Delivery (COD)**, and **WhatsApp Concierge**.
- **WhatsApp Orchestration**: After placing an order, users are redirected to WhatsApp with a pre-filled, formatted message.
- **Firestore Fidelity**: Orders are persisted to Firebase for record-keeping and admin management.

### 🛠 Admin Ceremonial Desk
A secure dashboard for store management:
- **SKU Orchestration**: Add, edit, and delete products in real-time.
- **Orders Ledger**: Track fulfillment status, payment states, and customer dossiers.

---

## 📈 SEO & Accessibility
- **CLS 0.0**: Precise font preloading and metric matching eliminate layout shifts.
- **LCP Optimization**: Critical assets (Hero image, fonts) are preloaded; heavy 3D bundles are lazy-loaded via `next/dynamic`.
- **Accessibility**: Support for `prefers-reduced-motion` across all Framer Motion interactions.
- **Semantic HTML**: Proper heading hierarchies and ARIA labels for accessibility.

---

## 📁 Project Structure
- `/src/app`: Next.js 14 App Router (Routes & Layouts).
- `/src/components`: UI components organized by feature (catalog, checkout, sections).
- `/src/context`: Split state management (Cart Data vs UI).
- `/src/hooks`: Custom hooks for mobile detection, FPS monitoring, and debouncing.
- `/src/lib`: Core logic (Firebase, WhatsApp builders, brand constants).
- `/public`: Optimized WebP images and localized assets.
