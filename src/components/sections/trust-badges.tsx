import { Award, ShieldCheck, Star } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { site, yearsOfExperience } from "@/data/site";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export async function TrustBadges({ className }: { className?: string }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("trust");

  const items = [
    { Icon: ShieldCheck, title: t("dha"), sub: t("dhaSub") },
    {
      Icon: Star,
      title: t("rating", { rating: site.rating.value }),
      sub: t("ratingSub", { count: formatNumber(site.rating.count, locale) }),
    },
    { Icon: Award, title: t("years", { years: yearsOfExperience }), sub: t("yearsSub") },
  ];

  return (
    <ul className={cn("grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:rtl:divide-x-reverse", className)}>
      {items.map(({ Icon, title, sub }) => (
        <li key={title} className="flex items-center gap-3 sm:px-5 sm:first:ps-0">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
            <Icon className="size-[1.1rem]" aria-hidden />
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold">{title}</span>
            <span className="text-xs text-muted-foreground">{sub}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
