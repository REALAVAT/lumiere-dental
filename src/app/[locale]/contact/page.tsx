import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { site, whatsappUrl } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/shared/page-hero";
import { richEm } from "@/components/shared/section-heading";
import { MapEmbed } from "@/components/shared/map-embed";
import { ContactForm } from "@/components/contact/contact-form";
import { ClinicDetails } from "@/components/sections/location-section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return pageMetadata({ locale, path: "/contact", title: t("title"), description: t("description") });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tc = await getTranslations("common");
  const tl = await getTranslations("location");
  const tn = await getTranslations("nav");

  const channels = [
    {
      href: whatsappUrl(tc("whatsappMessage")),
      label: tc("whatsapp"),
      value: `+${site.whatsappNumber}`,
      Icon: WhatsAppIcon,
      external: true,
    },
    { href: site.phoneHref, label: tc("callUs"), value: site.phone, Icon: Phone, external: false },
    { href: `mailto:${site.email}`, label: tc("emailUs"), value: site.email, Icon: Mail, external: false },
  ];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t.rich("title", richEm)} subtitle={t("subtitle")}>
        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {channels.map(({ href, label, value, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="card-lift group flex items-center gap-4 rounded-2xl border bg-card p-5"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="truncate text-sm text-muted-foreground" dir="ltr">
                    {value}
                  </span>
                </span>
                {external && <span className="sr-only">{tc("opensInNewTab")}</span>}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="pb-20 sm:pb-28">
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <div className="lg:col-span-5">
            <ClinicDetails />
          </div>
        </div>
        <div className="container-page mt-8">
          <MapEmbed
            src={site.mapEmbedUrl}
            title={tl("mapTitle")}
            loadingLabel={tl("mapLoading")}
            className="min-h-[360px] sm:min-h-[460px]"
          />
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: tn("home"), path: "/" },
            { name: tn("contact"), path: "/contact" },
          ],
          locale,
        )}
      />
    </>
  );
}
