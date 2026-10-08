import type { Localized } from "./types";

/**
 * Single source of truth for brand & business details.
 * Rebranding for a real clinic starts here.
 */
export const site = {
  name: { en: "Lumière Dental Dubai", ar: "لوميير لطب الأسنان دبي" } satisfies Localized,
  shortName: "Lumière",
  tagline: {
    en: "Calm, precise dentistry in the heart of Dubai Healthcare City.",
    ar: "طب أسنان هادئ ودقيق في قلب مدينة دبي الطبية.",
  } satisfies Localized,
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000")
  ).replace(/\/$/, ""),
  phone: "+971 4 555 0123",
  phoneHref: "tel:+97145550123",
  whatsappNumber: "971501234567",
  email: "hello@lumieredental.ae",
  address: {
    street: {
      en: "Building 64, Al Razi Medical Complex, Dubai Healthcare City",
      ar: "مبنى 64، مجمع الرازي الطبي، مدينة دبي الطبية",
    } satisfies Localized,
    locality: { en: "Dubai", ar: "دبي" } satisfies Localized,
    country: { en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" } satisfies Localized,
    countryCode: "AE",
    postalCode: "505055",
  },
  geo: { lat: 25.2302, lng: 55.3236 },
  mapEmbedUrl: "https://www.google.com/maps?q=Dubai+Healthcare+City,+Dubai&z=15&output=embed",
  mapLinkUrl: "https://maps.google.com/?q=Dubai+Healthcare+City,+Dubai",
  /** 24h format, Dubai time. Days use ISO numbering (1 = Monday). */
  hours: [
    { days: [1, 2, 3, 4, 5, 6], opens: "09:00", closes: "21:00" },
    { days: [7], opens: "10:00", closes: "18:00" },
  ],
  rating: { value: 4.9, count: 1280 },
  foundedYear: 2014,
  licence: "DHA-F-2014-0457",
  priceRange: "AED 250 – AED 25,000",
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    linkedin: "https://linkedin.com/",
  },
  credit: { name: "Ahmad Khajeh", url: "https://ahmadkhajeh.com", label: "ahmadkhajeh.com" },
} as const;

export const yearsOfExperience = Math.max(10, new Date().getFullYear() - site.foundedYear);

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
