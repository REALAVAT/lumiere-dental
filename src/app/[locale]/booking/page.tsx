import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { site, whatsappUrl } from "@/data/site";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/shared/page-hero";
import { richEm } from "@/components/shared/section-heading";
import { BookingFromParams, BookingSkeleton } from "@/components/booking/booking-from-params";
import { TrustBadges } from "@/components/sections/trust-badges";
import { openingHoursRows } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/booking">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta.booking" });
  return pageMetadata({ locale, path: "/booking", title: t("title"), description: t("description") });
}

export default async function BookingPage({ params }: PageProps<"/[locale]/booking">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("booking");
  const tc = await getTranslations("common");
  const tl = await getTranslations("location");
  const td = await getTranslations("days");
  const hours = openingHoursRows(locale, (d) => td(String(d) as "1"));

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t.rich("title", richEm)} subtitle={t("subtitle")} />
      <section className="pb-20 sm:pb-28">
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <Suspense fallback={<BookingSkeleton />}>
              <BookingFromParams />
            </Suspense>
          </div>
          <aside className="space-y-5 lg:col-span-4">
            <div className="rounded-[2rem] bg-primary p-7 text-primary-foreground">
              <h2 className="text-xl font-semibold">{tl("contact")}</h2>
              <p className="mt-2 text-sm text-primary-foreground/85">{t("subtitle")}</p>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild variant="whatsapp">
                  <a href={whatsappUrl(tc("whatsappMessage"))} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="size-4" />
                    {tc("whatsapp")}
                    <span className="sr-only"> {tc("opensInNewTab")}</span>
                  </a>
                </Button>
                <Button
                  asChild
                  className="bg-primary-foreground text-primary shadow-none hover:bg-primary-foreground/90 dark:hover:bg-primary-foreground/90"
                >
                  <a href={site.phoneHref}>
                    <Phone aria-hidden />
                    <span dir="ltr">{site.phone}</span>
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-[2rem] border bg-card p-7">
              <h2 className="text-sm font-semibold">{tl("hours")}</h2>
              <dl className="mt-3 space-y-2 text-sm">
                {hours.map((row) => (
                  <div key={row.label} className="flex flex-wrap justify-between gap-x-4">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="font-medium tabular-nums">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-[2rem] border bg-card p-7">
              <TrustBadges className="sm:grid-cols-1 sm:divide-x-0 sm:gap-4 [&>li]:sm:px-0" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
