# AayuUnify — Premium Ayurvedic D2C storefront

Next.js 14 App Router storefront with Firebase Auth/Firestore, Tailwind rituals, ceremonial copy, Razorpay-ready scaffolding, WhatsApp escalation, merchant console, offline seed catalog for frictionless prototyping.

## Quick start

```bash
cd aayunify
cp .env.example .env.local
npm install
npm run dev
```

Visit [`http://localhost:3000`](http://localhost:3000).

## Brand editing

Rename or restyle centrally in [`src/lib/brand.ts`](src/lib/brand.ts) — typography + palette accents live inside Tailwind extensions inside [`tailwind.config.ts`](tailwind.config.ts) and [`src/app/globals.css`](src/app/globals.css).

## Firebase setup

1. Create a Firebase project → enable **Firestore** + **Authentication (Email/password)**.
2. Add a web app · copy SDK keys into `.env.local` mirroring [.env.example](.env.example).
3. Under **Authentication ▸ Users** create merchant accounts manually (or programmatically via Admin SDK bootstrap).
4. Populate `NEXT_PUBLIC_ADMIN_EMAILS` with comma-separated admins that must match Firebase emails.
5. Deploy Firestore security rules tailored to production — scaffold provided in [`firestore.rules`](firestore.rules).
6. First time you subscribe to `orders` sorted by `createdAt`, Firebase may prompt you to create a composite index in the console — accept the deeplink suggestion.

### First catalog seed

1. Sign into `/account` with an authorised admin Firebase user whose email matches your admin list.
2. Visit `/admin/products` · click **Seed default catalog**.
3. SKU remain editable/removable thereafter.

Orders appear in `/admin/orders` after successful checkout persistence when Firebase env keys are wired.

## Vercel deployment

1. Push this folder to GitHub.
2. Create a **Vercel** project referencing the repo.
3. Paste environment variables (`NEXT_PUBLIC_*`) into Vercel project settings.
4. Set `NEXT_PUBLIC_SITE_URL` (or rely on generated `VERCEL_URL` fallback in [`src/app/layout.tsx`](src/app/layout.tsx)).

## Razorpay go-live checklist

[`src/lib/razorpay.ts`](src/lib/razorpay.ts) documents orchestration hints. Secrets never ship to the browser — create orders + verify signatures Cloud-side (Firebase Function or Next Route Handler) before flipping `paid` statuses in Firestore.

## Offline mode

Until Firebase vars exist, storefront hydrates SKU from [`src/lib/default-products.ts`](src/lib/default-products.ts) locally for demos · checkout politely routes to WhatsApp.

## NPM scripts

- `npm run dev` — Turbopack-free dev server scaffolded by CNA.
- `npm run build` — production bundle.
- `npm run lint` — eslint.

---

Built with ceremonial intent for luminous metabolisms 💚✨.
