import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CalendarCheck, Check, ChevronRight, Clock, ShieldCheck, Wallet } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getService, services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { whatsappUrl } from "@/data/site";
import { Button } from "@/components/ui/button";
import { ServiceIcon, WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { FaqList } from "@/components/shared/faq-list";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { formatPrice } from "@/lib/format";
import { unsplash } from "@/lib/images";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!hasLocale(routing.locales, locale) || !service) return {};
  return pageMetadata({
    locale,
    path: `/services/${slug}`,
    title: service.title[locale],
    description: `${service.short[locale]} ${service.intro[locale]}`,
  });
}

export default async function ServiceDetailPage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!hasLocale(routing.locales, locale) || !service) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("serviceDetail");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const td = await getTranslations("doctorsSection");

  const title = service.title[locale];
  const specialists = doctors.filter((d) => d.services.includes(service.slug));
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const facts = [
    { Icon: Wallet, label: t("priceFrom"), value: formatPrice(service.priceFrom, locale, tc("currency")), note: service.priceUnit?.[locale] },
    { Icon: Clock, label: t("duration"), value: service.duration[locale] },
    { Icon: ShieldCheck, label: t("insurance"), value: t("insuranceValue") },
  ];

  return (
    <>
      <section className="grain-bg relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:pb-24">
        <div className="container-page">
          <nav aria-label={t("breadcrumb")}>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  {tn("home")}
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5 rtl:rotate-180" />
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground">
                  {tn("services")}
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5 rtl:rotate-180" />
              </li>
              <li aria-current="page" className="font-medium text-foreground">
                {title}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <ServiceIcon icon={service.icon} className="size-7" />
              </span>
              <h1 className="display mt-6 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
              <p className="mt-4 text-xl text-foreground/80">{service.short[locale]}</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">{service.intro[locale]}</p>

              <dl className="mt-8 grid gap-3 sm:grid-cols-3">
                {facts.map(({ Icon, label, value, note }) => (
                  <div key={label} className="rounded-2xl border bg-card p-4">
                    <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Icon className="size-3.5 text-primary" aria-hidden />
                      {label}
                    </dt>
                    <dd className="mt-1.5 text-[0.95rem] font-semibold">
                      {value}
                      {note && <span className="block text-xs font-normal text-muted-foreground">{note}</span>}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={{ pathname: "/booking", query: { service: service.slug } }}>
                    <CalendarCheck aria-hidden />
                    {t("bookThis", { service: title })}
                  </Link>
                </Button>
                <Button asChild size="lg" variant="whatsapp">
                  <a href={whatsappUrl(`${tc("whatsappMessage")} (${title})`)} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="size-[1.1rem]" />
                    {tc("whatsapp")}
                    <span className="sr-only"> {tc("opensInNewTab")}</span>
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(15_76_74/0.45)] lg:aspect-[4/5]">
              <Image
                src={unsplash(service.image, 1400)}
                alt={service.imageAlt[locale]}
                fill
                loading="eager"
                fetchPriority="high"
                quality={75}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24" aria-labelledby="benefits-title">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="benefits-title" className="display text-3xl sm:text-4xl">
              {t("benefits")}
            </h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
            {service.benefits.map((b, i) => (
              <Reveal as="li" key={b.en} delay={i * 0.08} className="rounded-2xl border bg-card p-6">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-secondary text-primary">
                  <Check className="size-4" aria-hidden />
                </span>
                <p className="mt-4 font-medium leading-snug">{b[locale]}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24" aria-labelledby="process-title">
        <div className="container-page">
          <h2 id="process-title" className="display text-3xl sm:text-4xl">
            {t("process")}
          </h2>
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, i) => (
              <Reveal as="li" key={step.title.en} delay={i * 0.08} className="relative rounded-2xl border bg-card p-6">
                <span className="text-xs font-semibold tracking-wider text-sand-strong uppercase">
                  {t("step", { n: i + 1 })}
                </span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{step.title[locale]}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{step.body[locale]}</p>
                <span
                  className="absolute end-6 top-5 text-5xl font-semibold text-foreground/[0.06] tabular-nums"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {specialists.length > 0 && (
        <section className="py-20 sm:py-24" aria-labelledby="specialists-title">
          <div className="container-page">
            <h2 id="specialists-title" className="display text-3xl sm:text-4xl">
              {t("specialists")}
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {specialists.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/doctors#${d.slug}`}
                    className="card-lift group flex items-center gap-4 rounded-2xl border bg-card p-4"
                  >
                    <span className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <Image
                        src={unsplash(d.image, 300)}
                        alt=""
                        fill
                        sizes="80px"
                        quality={60}
                        className="object-cover object-top"
                      />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="font-semibold group-hover:text-primary">{d.name[locale]}</span>
                      <span className="text-sm text-muted-foreground">{d.role[locale]}</span>
                      <span className="mt-1 text-xs text-muted-foreground">{td("yearsExperience", { years: d.years })}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="pb-20 sm:pb-24" aria-labelledby="service-faq-title">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <h2 id="service-faq-title" className="display text-3xl sm:text-4xl lg:col-span-4">
            {t("faq")}
          </h2>
          <div className="lg:col-span-8">
            <FaqList items={service.faqs} locale={locale} idPrefix={service.slug} />
          </div>
        </div>
      </section>

      <section className="border-t py-16" aria-labelledby="other-title">
        <div className="container-page">
          <h2 id="other-title" className="text-sm font-semibold text-muted-foreground">
            {t("other")}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="card-lift group flex items-center justify-between gap-3 rounded-2xl border bg-card p-5"
                >
                  <span className="flex items-center gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                      <ServiceIcon icon={s.icon} className="size-5" />
                    </span>
                    <span className="font-medium">{s.title[locale]}</span>
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="pt-4">
        <FinalCta />
      </div>

      <JsonLd
        data={[
          serviceJsonLd(service, locale),
          faqJsonLd(service.faqs, locale),
          breadcrumbJsonLd(
            [
              { name: tn("home"), path: "/" },
              { name: tn("services"), path: "/services" },
              { name: title, path: `/services/${service.slug}` },
            ],
            locale,
          ),
        ]}
      />
    </>
  );
}
