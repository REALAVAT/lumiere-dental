import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { services } from "@/data/services";
import { languageAlternates, localizedUrl } from "@/lib/seo";

const staticPaths = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/doctors", priority: 0.8, changeFrequency: "monthly" },
  { path: "/booking", priority: 0.9, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [
    ...staticPaths,
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
  ];

  return paths.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
