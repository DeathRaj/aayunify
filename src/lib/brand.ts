/**
 * Edit this file to rebrand — name, URLs, messaging, palette tokens.
 */

export const brand = {
  name: "AayuUnify",
  /** Short subtitle used in navbar / meta */
  shortTagline: "Ayurvedic wellness, refined.",
  heroTitle: "Natural Wellness Powered by Ayurveda",
  heroSubtitle:
    "Holistic formulations rooted in Ayurveda — crafted for daily immunity, energy, metabolism, and heart-friendly living. Small-batch quality you can trace from leaf to doorstep.",
  contactEmail: "modiraj267@gmail.com",
  /** WhatsApp in international digits only (no + or spaces); used for wa.me links */
  whatsAppNumberDefault: "919624419624",
  socials: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
  },
} as const;

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || brand.whatsAppNumberDefault;
}
