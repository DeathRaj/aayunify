import Link from "next/link";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedProducts } from "@/components/catalog/featured-products";
import { BenefitPillars } from "@/components/catalog/benefit-pillars";
import { WhyChooseUs } from "@/components/catalog/why-choose-us";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";
import { JournalPreviewSection } from "@/components/sections/journal-preview";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { homeFaqs } from "@/data/content";
import { seedDocsFromCatalog } from "@/lib/catalog-fallback";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ayurvedic apothecary for luminous daily rituals",
  description:
    "Natural wellness powered by Ayurveda — shop Moringa powder & ACV-moringa effervescents with lab-tested reassurance.",
};

const faqPayload = homeFaqs.map(({ q, a }) => ({ question: q, answer: a }));

export default function HomePage() {
  const seed = seedDocsFromCatalog();

  return (
    <div className="space-y-24 bg-cream sm:space-y-28">
      <div className="mx-auto max-w-7xl px-6 pt-10 sm:pt-16">
        <HeroSection />
      </div>

      <FeaturedProducts fallback={seed} />
      <BenefitPillars />
      <div className="mx-auto max-w-7xl space-y-20 px-6">
        <FAQAccordion heading="FAQ preview · radiant clarity before checkout" items={faqPayload.slice(0, 2)} />
        <JournalPreviewSection />
      </div>
      <WhyChooseUs />
      <TestimonialsCarousel />
      <NewsletterSignup />

      <section className="mx-auto mb-52 max-w-5xl px-6 text-center">
        <Link
          href="/shop"
          className="inline-flex justify-center rounded-full bg-botanical-800 px-14 py-[0.93rem] text-xs uppercase tracking-[0.43em] text-cream hover:bg-botanical-700 transition shadow-soft"
        >
          Embark ceremonial shop tour
        </Link>
      </section>
    </div>
  );
}
