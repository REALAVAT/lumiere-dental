import type { Locale } from "@/i18n/routing";
import { site } from "@/data/site";

const intlLocale = (locale: Locale) => (locale === "ar" ? "ar-AE-u-nu-latn" : "en-AE");

export function formatTime(hhmm: string, locale: Locale) {
  const [h, m] = hhmm.split(":").map(Number);
  return new Intl.DateTimeFormat(intlLocale(locale), {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(2024, 0, 1, h, m)));
}

export function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(intlLocale(locale)).format(value);
}

export function formatPrice(value: number, locale: Locale, currencyLabel: string) {
  const n = formatNumber(value, locale);
  return locale === "ar" ? `${n} ${currencyLabel}` : `${currencyLabel} ${n}`;
}

export function formatDateLong(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Group opening hours into display rows, e.g. "Monday – Saturday · 9:00 AM – 9:00 PM". */
export function openingHoursRows(locale: Locale, dayName: (day: number) => string) {
  return site.hours.map((row) => {
    const first = row.days[0];
    const last = row.days[row.days.length - 1];
    const label = first === last ? dayName(first) : `${dayName(first)} – ${dayName(last)}`;
    return {
      label,
      value: `${formatTime(row.opens, locale)} – ${formatTime(row.closes, locale)}`,
    };
  });
}
