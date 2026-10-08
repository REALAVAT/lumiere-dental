import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { preload } from "react-dom";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeDirection, routing } from "@/i18n/routing";
import { site } from "@/data/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { ThemeScript } from "@/components/theme/theme-script";
import { JsonLd } from "@/components/seo/json-ld";
import { clinicJsonLd, websiteJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import "../globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "swap",
  preload: false,
});

const arabicCriticalWeights = ["400", "600"];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1413" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(site.url),
    title: { default: t("home.title"), template: `%s · ${t("siteName")}` },
    description: t("home.description"),
    applicationName: t("siteName"),
    authors: [{ name: site.credit.name, url: site.credit.url }],
    creator: site.credit.name,
    formatDetection: { telephone: false },
    category: "health",
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });
  if (locale === "ar") {
    for (const weight of arabicCriticalWeights) {
      preload(`/fonts/ibm-plex-sans-arabic-${weight}.woff2`, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
    }
  }

  return (
    <html
      lang={locale}
      dir={localeDirection[locale]}
      suppressHydrationWarning
      className={cn(geist.variable, serif.variable)}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only z-[60] rounded-full bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
          >
            {t("skip")}
          </a>
          <Header brand={site.name[locale]} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </NextIntlClientProvider>
        <JsonLd data={[clinicJsonLd(locale), websiteJsonLd(locale)]} />
      </body>
    </html>
  );
}
