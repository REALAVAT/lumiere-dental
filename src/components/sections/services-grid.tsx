import { ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { services } from "@/data/services";
import { ServiceIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export async function ServiceCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const locale = (await getLocale()) as Locale;
  const tc = await getTranslations("common");
  const Heading = headingLevel;

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <Reveal as="li" key={service.slug} delay={(i % 3) * 0.08} className="h-full">
            <Link
              href={`/services/${service.slug}`}
              className="card-lift group relative flex h-full flex-col rounded-2xl border bg-card p-7"
            >
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "inline-flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-300",
                    "group-hover:bg-primary group-hover:text-primary-foreground",
                  )}
                >
                  <ServiceIcon icon={service.icon} className="size-6" />
                </span>
                <ArrowUpRight
                  className="size-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                  aria-hidden
                />
              </div>
              <Heading className="mt-6 text-xl font-semibold tracking-tight">{service.title[locale]}</Heading>
              <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{service.short[locale]}</p>
              <p className="mt-6 text-sm">
                <span className="text-muted-foreground">{tc("from")} </span>
                <span className="font-semibold text-foreground">{formatPrice(service.priceFrom, locale, tc("currency"))}</span>
              </p>
            </Link>
        </Reveal>
      ))}
    </ul>
  );
}
