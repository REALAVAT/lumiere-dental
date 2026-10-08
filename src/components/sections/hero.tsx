import Image from "next/image";
import { ArrowRight, CalendarCheck, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import { richEm } from "@/components/shared/section-heading";
import { site, whatsappUrl } from "@/data/site";
import { images, unsplash } from "@/lib/images";
import { TrustBadges } from "./trust-badges";

export async function Hero() {
  const t = await getTranslations("hero");
  const tc = await getTranslations("common");

  return (
    <section className="grain-bg relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:pt-40 lg:pb-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <p className="eyebrow">
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inline-flex size-full rounded-full bg-primary/60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            {t("eyebrow")}
          </p>
          <h1 className="display mt-5 text-[2.6rem] leading-[1.04] text-foreground sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]">
            {t.rich("title", richEm)}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{t("subtitle")}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/booking">
                <CalendarCheck aria-hidden />
                {tc("bookAppointment")}
                <ArrowRight className="transition-transform group-hover/button:translate-x-0.5 rtl:rotate-180 rtl:group-hover/button:-translate-x-0.5" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="whatsapp">
              <a href={whatsappUrl(tc("whatsappMessage"))} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-[1.1rem]" />
                {tc("whatsapp")}
                <span className="sr-only"> {tc("opensInNewTab")}</span>
              </a>
            </Button>
          </div>
          <TrustBadges className="mt-12" />
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(15_76_74/0.45)] sm:aspect-[16/11] lg:aspect-[4/5]">
            <Image
              src={unsplash(images.hero, 1600)}
              alt={t("imageAlt")}
              fill
              loading="eager"
              fetchPriority="high"
              quality={75}
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" aria-hidden />
          </div>

          <div className="glass absolute -bottom-6 start-4 flex items-center gap-3 rounded-2xl p-4 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:300ms] [animation-fill-mode:both] sm:start-8">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <CalendarCheck className="size-5" aria-hidden />
            </span>
            <span className="flex flex-col">
              <span className="text-xs text-muted-foreground">{t("nextAvailable")}</span>
              <span className="text-sm font-semibold">{t("nextAvailableValue")}</span>
            </span>
          </div>

          <div className="glass absolute end-4 top-4 hidden rounded-2xl p-4 shadow-xl animate-in fade-in slide-in-from-top-4 duration-700 [animation-delay:500ms] [animation-fill-mode:both] sm:end-6 sm:top-6 sm:block">
            <div className="flex items-center gap-1 text-sand-strong" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
            <p className="mt-1.5 text-sm font-semibold">
              {site.rating.value} <span className="font-normal text-muted-foreground">· Google</span>
            </p>
            <p className="text-xs text-muted-foreground">{t("patients")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
