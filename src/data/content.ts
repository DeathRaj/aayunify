import { brand } from "@/lib/brand";

export const benefitPillars = [
  {
    title: "Immunity",
    copy: "Daily botanical fortification for modern stressors & seasonal shifts.",
  },
  {
    title: "Weight Management",
    copy: "Supportive formulas that pair with mindful meals & movement.",
  },
  {
    title: "Energy",
    copy: "Steady, plant-led vitality without the crash of artificial stimulants.",
  },
  {
    title: "Heart Health",
    copy: "Heart-conscious nutrients chosen for authentic Ayurvedic synergy.",
  },
] as const;

export const whyChooseUs = [
  {
    title: "100% Natural",
    copy: "No synthetic colours or mystery fillers — just traceable botanicals.",
  },
  {
    title: "Ayurvedic Formula",
    copy: "Rooted in classical wisdom, adapted for premium modern routines.",
  },
  {
    title: "No Added Sugar",
    copy: "Effervescents sweetened consciously so wellness never tastes like candy.",
  },
  {
    title: "Lab Tested",
    copy: "Batch integrity checks for heavy metals, purity, and label accuracy.",
  },
] as const;

export const testimonials = [
  {
    id: "home-testimonial-ananya-blr",
    quote:
      "The moringa ritual has become my morning anchor — clean energy and no bitter aftertaste.",
    name: "Ananya R.",
    city: "Bengaluru",
  },
  {
    id: "home-testimonial-karan-mum-acv",
    quote:
      "ACV tablets feel luxe compared to bottled vinegar. My gut agrees and my countertop thanks me.",
    name: "Karan S.",
    city: "Mumbai",
  },
  {
    id: "home-testimonial-meera-pun-shipping",
    quote:
      "Finally a wellness brand that looks premium and behaves premium. Shipping was swift.",
    name: "Meera K.",
    city: "Pune",
  },
] as const;

export const homeFaqs = [
  {
    q: `Where is ${brand.name} crafted?`,
    a: `We partner with conscientious Ayurvedic-compliant facilities across India — small batches, audited processes, obsessive QC.`,
  },
  {
    q: "Will these formulations interact with prescriptions?",
    a: "If you’re pregnant, nursing, managing chronic conditions, or on medication — please consult your healthcare practitioner prior to introducing new botanicals.",
  },
  {
    q: "What is your return policy?",
    a: "We accept sealed, unopened products within 14 days of delivery — reach our care desk on WhatsApp for swift assistance.",
  },
] as const;

export const blogPlaceholders = [
  {
    slug: "benefits-of-moringa",
    title: "Benefits of Moringa for Daily Rituals",
    excerpt:
      "How this ancient green ally supports micronutrition, oxidative balance & calm energy.",
    tag: "Botanical deep-dive · 6 min",
  },
  {
    slug: "acv-for-weight-management",
    title: "Apple Cider Vinegar for Thoughtful Weight Support",
    excerpt:
      "Pairing fermented acids with Ayurvedic botanicals — what the science whisper says.",
    tag: "Metabolism · 8 min",
  },
] as const;

export type MockReview = {
  rating: number;
  title: string;
  comment: string;
  name: string;
  city: string;
};

/** Static social proof placeholders — migrate to Firestore later for authenticity. */
export const mockReviewsBySlug: Record<string, MockReview[]> = {
  "moringa-leaf-powder": [
    {
      rating: 5,
      title: "Silky smoothie upgrade",
      comment:
        "Dissolves cleanly in almond milk — zero chalkiness. Feeling more balanced week over week.",
      name: "Ishita",
      city: "Delhi NCR",
    },
    {
      rating: 4,
      title: "Trustworthy purity",
      comment:
        "Love the earthy aroma vs industrial greens. Packaging feels luxe.",
      name: "Rahul",
      city: "Hyderabad",
    },
  ],
  "apple-cider-vinegar-moringa-effervescent": [
    {
      rating: 5,
      title: "Finally ACV without the burn",
      comment:
        "Refreshing effervescent — perfect post walk. Helps me stay hydrated with intent.",
      name: "Pooja",
      city: "Chennai",
    },
    {
      rating: 5,
      title: "Morning metabolism ritual",
      comment:
        "Keeps cravings softer through the day paired with mindful eating.",
      name: "Dev",
      city: "Goa",
    },
  ],
};
