import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { SectionHeading, richEm } from "@/components/shared/section-heading";
import { Hero } from "@/components/sections/hero";
import { ServiceCards } from "@/components/sections/services-grid";
import { BeforeAfterSlider } from "@/components/sections/before-after-slider";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { DoctorsCarousel } from "@/components/sections/doctors-carousel";
import { Testimonials } from "@/components/sections/testimonials";
import { InsuranceStrip } from "@/components/sections/insurance-strip";
import { FaqSection } from "@/components/sections/faq-section";
import { LocationSection } from "@/components/sections/location-section";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return pageMetadata({ locale, path: "/", title: t("title"), description: t("description"), absoluteTitle: true });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <>
      <Hero />

      <section className="py-20 sm:py-28" aria-labelledby="services-title">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="services-title"
              eyebrow={t("servicesSection.eyebrow")}
              title={t.rich("servicesSection.title", richEm)}
              subtitle={t("servicesSection.subtitle")}
            />
            <Button asChild variant="outline" className="self-start md:self-auto">
              <Link href="/services">
                {t("common.viewAllServices")}
                <ArrowRight className="rtl:rotate-180" aria-hidden />
              </Link>
            </Button>
          </div>
          <div className="mt-12">
            <ServiceCards />
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-28" aria-labelledby="results-title">
        <div className="container-page">
          <SectionHeading
            id="results-title"
            align="center"
            eyebrow={t("beforeAfter.eyebrow")}
            title={t.rich("beforeAfter.title", richEm)}
            subtitle={t("beforeAfter.subtitle")}
          />
          <div className="mx-auto mt-12 max-w-5xl">
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <section className="py-20 sm:py-28" aria-labelledby="doctors-title">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="doctors-title"
              eyebrow={t("doctorsSection.eyebrow")}
              title={t.rich("doctorsSection.title", richEm)}
              subtitle={t("doctorsSection.subtitle")}
            />
            <Button asChild variant="outline" className="self-start md:self-auto">
              <Link href="/doctors">
                {t("common.meetTheTeam")}
                <ArrowRight className="rtl:rotate-180" aria-hidden />
              </Link>
            </Button>
          </div>
          <div className="mt-8">
            <DoctorsCarousel />
          </div>
        </div>
      </section>

      <Testimonials />
      <InsuranceStrip />
      <FaqSection />
      <LocationSection />
      <FinalCta />
    </>
  );
}
