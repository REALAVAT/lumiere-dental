import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/shared/page-hero";
import { richEm } from "@/components/shared/section-heading";
import { ServiceCards } from "@/components/sections/services-grid";
import { InsuranceStrip } from "@/components/sections/insurance-strip";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta.services" });
  return pageMetadata({ locale, path: "/services", title: t("title"), description: t("description") });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("servicesPage");
  const tn = await getTranslations("nav");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t.rich("title", richEm)} subtitle={t("subtitle")} />
      <section className="pb-20 sm:pb-28">
        <div className="container-page">
          <ServiceCards headingLevel="h2" />
        </div>
      </section>
      <InsuranceStrip />
      <div className="pt-20 sm:pt-28">
        <FinalCta />
      </div>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: tn("home"), path: "/" },
            { name: tn("services"), path: "/services" },
          ],
          locale,
        )}
      />
    </>
  );
}
