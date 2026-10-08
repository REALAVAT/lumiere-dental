import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { MapEmbed } from "@/components/shared/map-embed";
import { SectionHeading, richEm } from "@/components/shared/section-heading";
import { openingHoursRows } from "@/lib/format";

export async function ClinicDetails() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("location");
  const tc = await getTranslations("common");
  const td = await getTranslations("days");
  const hours = openingHoursRows(locale, (d) => td(String(d) as "1"));

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <div className="rounded-2xl border bg-card p-6">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <MapPin className="size-4 text-primary" aria-hidden />
          {t("address")}
        </h3>
        <address className="mt-3 text-[0.95rem] leading-relaxed not-italic text-muted-foreground">
          {site.address.street[locale]}
          <br />
          {site.address.locality[locale]}, {site.address.country[locale]}
        </address>
        <p className="mt-3 text-xs text-muted-foreground">{t("parking")}</p>
        <Button asChild variant="outline" size="sm" className="mt-4">
          <a href={site.mapLinkUrl} target="_blank" rel="noopener noreferrer">
            <Navigation aria-hidden />
            {tc("getDirections")}
            <span className="sr-only"> {tc("opensInNewTab")}</span>
          </a>
        </Button>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Clock className="size-4 text-primary" aria-hidden />
          {t("hours")}
        </h3>
        <dl className="mt-3 space-y-2 text-[0.95rem]">
          {hours.map((row) => (
            <div key={row.label} className="flex flex-wrap justify-between gap-x-4">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="font-medium tabular-nums">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-2xl border bg-card p-6 sm:col-span-2 lg:col-span-1">
        <h3 className="text-sm font-semibold">{t("contact")}</h3>
        <ul className="mt-3 space-y-2 text-[0.95rem]">
          <li>
            <a href={site.phoneHref} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <Phone className="size-4 text-primary" aria-hidden />
              <span dir="ltr">{site.phone}</span>
            </a>
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Mail className="size-4 text-primary" aria-hidden />
              {site.email}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export async function LocationSection() {
  const t = await getTranslations("location");

  return (
    <section className="py-20 sm:py-28" aria-labelledby="location-title">
      <div className="container-page">
        <SectionHeading id="location-title" eyebrow={t("eyebrow")} title={t.rich("title", richEm)} />
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <MapEmbed
            src={site.mapEmbedUrl}
            title={t("mapTitle")}
            loadingLabel={t("mapLoading")}
            className="min-h-[340px] lg:col-span-8 lg:min-h-[520px]"
          />
          <div className="lg:col-span-4">
            <ClinicDetails />
          </div>
        </div>
      </div>
    </section>
  );
}
