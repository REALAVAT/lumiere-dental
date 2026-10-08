import type { Metadata } from "next";
import Image from "next/image";
import { CalendarCheck, GraduationCap, Languages } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { doctors } from "@/data/doctors";
import { getService } from "@/data/services";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/shared/page-hero";
import { richEm } from "@/components/shared/section-heading";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { unsplash } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/doctors">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta.doctors" });
  return pageMetadata({ locale, path: "/doctors", title: t("title"), description: t("description") });
}

export default async function DoctorsPage({ params }: PageProps<"/[locale]/doctors">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("doctorsPage");
  const ts = await getTranslations("doctorsSection");
  const tn = await getTranslations("nav");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t.rich("title", richEm)} subtitle={t("subtitle")} />

      <section className="pb-20 sm:pb-28">
        <ul className="container-page space-y-8 sm:space-y-12">
          {doctors.map((doctor, i) => (
            <Reveal
              as="li"
              key={doctor.slug}
              id={doctor.slug}
              className="scroll-mt-28 overflow-hidden rounded-[2rem] border bg-card"
            >
              <article className="grid md:grid-cols-12" aria-labelledby={`${doctor.slug}-name`}>
                <div
                  className={cn(
                    "relative aspect-[4/3] bg-muted md:col-span-5 md:aspect-auto md:min-h-[480px]",
                    i % 2 === 1 && "md:order-last",
                  )}
                >
                  <Image
                    src={unsplash(doctor.image, 1000)}
                    alt={doctor.imageAlt[locale]}
                    fill
                    quality={75}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    sizes="(min-width: 768px) 42vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-col p-7 sm:p-10 md:col-span-7 lg:p-14">
                  <p className="eyebrow">{ts("yearsExperience", { years: doctor.years })}</p>
                  <h2 id={`${doctor.slug}-name`} className="display mt-3 text-3xl sm:text-4xl">
                    {doctor.name[locale]}
                  </h2>
                  <p className="mt-2 text-lg text-primary">{doctor.role[locale]}</p>
                  <p className="mt-6 leading-relaxed text-muted-foreground">{doctor.bio[locale]}</p>

                  <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <dt className="flex items-center gap-2 text-sm font-semibold">
                        <GraduationCap className="size-4 text-primary" aria-hidden />
                        {t("education")}
                      </dt>
                      {doctor.education.map((e) => (
                        <dd key={e.en} className="mt-2 text-sm text-muted-foreground">
                          {e[locale]}
                        </dd>
                      ))}
                    </div>
                    <div>
                      <dt className="flex items-center gap-2 text-sm font-semibold">
                        <Languages className="size-4 text-primary" aria-hidden />
                        {t("languages")}
                      </dt>
                      <dd className="mt-2 text-sm text-muted-foreground">{doctor.languages[locale]}</dd>
                    </div>
                  </dl>

                  <div className="mt-8">
                    <h3 className="text-sm font-semibold">{t("specialties")}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {doctor.services.map((slug) => {
                        const s = getService(slug);
                        if (!s) return null;
                        return (
                          <li key={slug}>
                            <Link
                              href={`/services/${slug}`}
                              className="inline-flex rounded-full border bg-background px-3.5 py-1.5 text-sm transition-colors hover:border-primary/40 hover:text-primary"
                            >
                              {s.title[locale]}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="mt-auto pt-10">
                    <Button asChild>
                      <Link href={{ pathname: "/booking", query: { doctor: doctor.slug } }}>
                        <CalendarCheck aria-hidden />
                        {t("bookWith", { name: doctor.name[locale] })}
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <FinalCta />

      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: tn("home"), path: "/" },
              { name: tn("doctors"), path: "/doctors" },
            ],
            locale,
          ),
          ...doctors.map((d) => ({
            "@context": "https://schema.org",
            "@type": "Physician",
            name: d.name[locale],
            jobTitle: d.role[locale],
            image: unsplash(d.image, 600),
            knowsLanguage: d.languages.en.split(", "),
            worksFor: { "@id": `${site.url}/#clinic` },
          })),
        ]}
      />
    </>
  );
}
