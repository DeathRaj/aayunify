import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { TrustBadgeStrip } from "@/components/sections/trust-badges";

export const metadata: Metadata = {
  title: "About AayuUnify · Ayurvedic philosophy",
  description:
    "Brand story rooted in Ayurveda — mission-led ritual commerce with lab-tested integrity.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-32 pt-28">
      <p className="text-xs uppercase tracking-[0.4em] text-botanical-500">Heritage dossier</p>
      <h1 className="mt-4 font-display text-5xl leading-tight sm:text-[3.6rem]">
        {brand.name} · botanical theatre for cosmopolitan metabolisms
      </h1>
      <p className="mt-10 text-lg leading-relaxed text-botanical-600">
        {brand.heroSubtitle}
      </p>

      <section className="mt-16 rounded-[38px] border border-botanical-100 bg-white/90 px-10 py-12 shadow-soft">
        <h2 className="font-display text-3xl text-botanical-900">Brand narrative</h2>
        <p className="mt-6 leading-relaxed text-botanical-600">
          {brand.name} was founded on a restless question: Why should Ayurvedic depth feel austere instead of ceremonial?
          We translate classical rasāyana thinking into luminous packaging, evocative taste architecture, transparent sourcing,
          and daily rituals tuned for luminous metabolisms juggling modern stimuli.
        </p>
      </section>

      <section className="mt-14 grid gap-10 md:grid-cols-2">
        <div className="rounded-[36px] border border-botanical-100 bg-botanical-50 px-10 py-10">
          <h2 className="text-xs uppercase tracking-[0.35em] text-botanical-500">Ayurvedic philosophy</h2>
          <p className="mt-6 leading-relaxed text-botanical-700">
            We honour prakṛti (constitution) awareness, mindful agni (digestive intelligence), and śodhana (seasonal housekeeping)
            as daily commitments — empowering you to stack botanical nuance responsibly alongside movement, nourishment, breath,
            and sleep architecture.
          </p>
        </div>
        <div className="rounded-[36px] border border-botanical-100 bg-parchment px-10 py-10">
          <h2 className="text-xs uppercase tracking-[0.35em] text-botanical-500">Mission</h2>
          <p className="mt-6 leading-relaxed text-botanical-700">
            Normalize premium Ayurvedic craft for India’s cosmopolitan households · ship lab-transparent SKU · carbon-conscious last-mile choreography · WhatsApp concierge with human warmth — no chatbot poetry.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl">Trust scaffolding</h2>
        <p className="mt-4 max-w-2xl text-botanical-600">
          Ritual SKU ship with dossiers on sourcing provenance · heavy-metal screening summaries · allergens legibility · biodegradable cartons prioritised quarterly.
        </p>
        <div className="mt-10">
          <TrustBadgeStrip />
        </div>
      </section>

      <div className="mt-14 text-center">
        <Link
          href="/shop"
          className="inline-flex rounded-full bg-botanical-800 px-14 py-3 text-xs uppercase tracking-[0.3em] text-cream hover:bg-botanical-700 transition"
        >
          Shop ceremonial essentials
        </Link>
      </div>
    </div>
  );
}
