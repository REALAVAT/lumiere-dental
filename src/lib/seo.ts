import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { services, type Service } from "@/data/services";
import { doctors } from "@/data/doctors";
import type { FaqItem } from "@/data/types";

export function localizedUrl(locale: Locale, path = "/") {
  const clean = path === "/" ? "" : path;
  return `${site.url}/${locale}${clean}`;
}

export function languageAlternates(path = "/") {
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, path)])),
    "x-default": localizedUrl(routing.defaultLocale, path),
  };
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = localizedUrl(locale, path);
  const desc = truncate(description, 160);
  const image = { url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: site.name[locale] };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      title,
      description: desc,
      siteName: site.name[locale],
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      alternateLocale: locale === "ar" ? ["en_AE"] : ["ar_AE"],
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description: desc, images: [image.url] },
  };
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

const days = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function clinicJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalClinic"],
    "@id": `${site.url}/#clinic`,
    name: site.name[locale],
    alternateName: site.name[locale === "ar" ? "en" : "ar"],
    description: site.tagline[locale],
    url: localizedUrl(locale),
    logo: `${site.url}/icon.svg`,
    image: `${localizedUrl(locale)}/opengraph-image`,
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    currenciesAccepted: "AED",
    paymentAccepted: "Cash, Credit Card, Insurance, Tabby",
    medicalSpecialty: "Dentistry",
    isAcceptingNewPatients: true,
    foundingDate: String(site.foundedYear),
    hasMap: site.mapLinkUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street[locale],
      addressLocality: site.address.locality[locale],
      addressRegion: "Dubai",
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: { "@type": "City", name: "Dubai" },
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${days[d]}`),
      opens: h.opens,
      closes: h.closes,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    availableService: services.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.title[locale],
      url: localizedUrl(locale, `/services/${s.slug}`),
    })),
    employee: doctors.map((d) => ({
      "@type": "Person",
      name: d.name[locale],
      jobTitle: d.role[locale],
    })),
    sameAs: Object.values(site.socials),
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name[locale],
    url: localizedUrl(locale),
    inLanguage: locale,
    publisher: { "@id": `${site.url}/#clinic` },
  };
}

export function faqJsonLd(items: FaqItem[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q[locale],
      acceptedAnswer: { "@type": "Answer", text: f.a[locale] },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: localizedUrl(locale, item.path),
    })),
  };
}

export function serviceJsonLd(service: Service, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.title[locale],
    description: service.intro[locale],
    url: localizedUrl(locale, `/services/${service.slug}`),
    image: `${service.image}?w=1200&q=75&auto=format`,
    howPerformed: service.steps.map((s) => s.title[locale]).join(" → "),
    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      price: service.priceFrom,
      priceSpecification: { "@type": "PriceSpecification", minPrice: service.priceFrom, priceCurrency: "AED" },
    },
    provider: { "@id": `${site.url}/#clinic` },
  };
}
