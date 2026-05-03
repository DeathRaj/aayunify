import Link from "next/link";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedProducts } from "@/components/catalog/featured-products";
import { BenefitPillars } from "@/components/catalog/benefit-pillars";
import { WhyChooseUs } from "@/components/catalog/why-choose-us";
import { WellnessQuiz } from "@/components/marketing/wellness-quiz";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";
import { JournalPreviewSection } from "@/components/sections/journal-preview";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { homeFaqs } from "@/data/content";
import { seedDocsFromCatalog } from "@/lib/catalog-fallback";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Ayurvedic apothecary for luminous daily rituals",
  description:
    "Natural wellness powered by Ayurveda — shop Moringa powder & ACV-moringa effervescents with lab-tested reassurance.",
};

const faqPayload = homeFaqs.map(({ q, a }) => ({ question: q, answer: a }));

export default function HomePage() {
  const seed = seedDocsFromCatalog();
  const headersList = headers();
  const wellnessGoal = headersList.get('x-user-goal') || null;

  return (
    <div className="space-y-24 bg-cream sm:space-y-28">
      {/* If wellnessGoal is present, we could pass it down to HeroSection to alter text, but for now we just show it's active. */}
      {wellnessGoal && (
        <div className="bg-botanical-800 text-cream text-center py-2 text-[10px] uppercase tracking-[0.2em]">
          ✧ Your experience is tuned for {decodeURIComponent(wellnessGoal)} ✧
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 pt-10 sm:pt-16">
        <HeroSection />
      </div>

      <FeaturedProducts fallback={seed} />
      
      {/* Wellness Diagnostic Quiz */}
      {!wellnessGoal && (
        <section className="mx-auto max-w-4xl px-6">
          <WellnessQuiz />
        </section>
      )}

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
