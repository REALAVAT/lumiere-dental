import { Quote, Star } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { testimonials } from "@/data/testimonials";
import { site } from "@/data/site";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading, richEm } from "@/components/shared/section-heading";
import { formatNumber } from "@/lib/format";

export async function Testimonials() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("testimonials");

  return (
    <section className="bg-surface py-20 sm:py-28" aria-labelledby="testimonials-title">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="testimonials-title" eyebrow={t("eyebrow")} title={t.rich("title", richEm)} />
          <div className="flex items-center gap-3 rounded-2xl border bg-card px-5 py-4">
            <span className="text-3xl font-semibold tracking-tight">{site.rating.value}</span>
            <span className="flex flex-col">
              <span className="flex text-sand-strong" role="img" aria-label={t("stars", { rating: site.rating.value })}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" aria-hidden />
                ))}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                {t("summary", { rating: site.rating.value, count: formatNumber(site.rating.count, locale) })}
              </span>
            </span>
          </div>
        </div>

        <ul className="mt-14 gap-5 space-y-5 md:columns-2 lg:columns-3">
          {testimonials.map((item, i) => (
            <Reveal as="li" key={item.name.en} delay={(i % 3) * 0.08} className="break-inside-avoid">
              <figure className="card-lift rounded-2xl border bg-card p-7">
                <Quote className="size-7 text-sand rtl:-scale-x-100" aria-hidden />
                <blockquote className="mt-4 text-[1.02rem] leading-relaxed text-foreground/90">
                  “{item.quote[locale]}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    className="inline-flex size-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary"
                    aria-hidden
                  >
                    {item.name[locale].charAt(0)}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold">{item.name[locale]}</span>
                    <span className="text-xs text-muted-foreground">{item.detail[locale]}</span>
                  </span>
                  <span
                    className="ms-auto flex text-sand-strong"
                    role="img"
                    aria-label={t("stars", { rating: item.rating })}
                  >
                    {Array.from({ length: item.rating }).map((_, s) => (
                      <Star key={s} className="size-3.5 fill-current" aria-hidden />
                    ))}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
