"use client";

import Image from "next/image";
import { useCallback, useSyncExternalStore } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { doctors } from "@/data/doctors";
import { Button } from "@/components/ui/button";
import { unsplash } from "@/lib/images";

export function DoctorsCarousel() {
  const t = useTranslations("doctorsSection");
  const locale = useLocale() as Locale;
  const [viewportRef, api] = useEmblaCarousel({
    align: "start",
    direction: locale === "ar" ? "rtl" : "ltr",
    containScroll: "trimSnaps",
  });

  const subscribe = useCallback(
    (onChange: () => void) => {
      api?.on("select", onChange).on("reInit", onChange).on("init", onChange);
      return () => {
        api?.off("select", onChange).off("reInit", onChange).off("init", onChange);
      };
    },
    [api],
  );
  const canPrev = useSyncExternalStore(subscribe, () => api?.canScrollPrev() ?? false, () => false);
  const canNext = useSyncExternalStore(subscribe, () => api?.canScrollNext() ?? false, () => false);

  return (
    <div>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollPrev()}
          disabled={!canPrev}
          aria-label={t("prev")}
        >
          <ArrowLeft className="rtl:rotate-180" aria-hidden />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollNext()}
          disabled={!canNext}
          aria-label={t("next")}
        >
          <ArrowRight className="rtl:rotate-180" aria-hidden />
        </Button>
      </div>

      <div className="mt-6 overflow-hidden" ref={viewportRef}>
        <ul className="-ms-5 flex touch-pan-y">
          {doctors.map((doctor) => (
            <li
              key={doctor.slug}
              className="min-w-0 shrink-0 grow-0 basis-[85%] ps-5 sm:basis-1/2 lg:basis-1/3"
            >
              <Link href={`/doctors#${doctor.slug}`} className="group block rounded-[1.75rem]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-muted">
                  <Image
                    src={unsplash(doctor.image, 900)}
                    alt={doctor.imageAlt[locale]}
                    fill
                    quality={75}
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 85vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" aria-hidden />
                  <span className="absolute start-4 bottom-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-900">
                    {t("yearsExperience", { years: doctor.years })}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                  {doctor.name[locale]}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{doctor.role[locale]}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
