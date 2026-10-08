import { Mail, MapPin, Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";
import { openingHoursRows } from "@/lib/format";
import { Logo } from "./logo";
import { navItems } from "./nav-items";

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const tl = await getTranslations("location");
  const td = await getTranslations("days");
  const hours = openingHoursRows(locale, (d) => td(String(d) as "1"));
  const year = new Date().getFullYear();

  const socials = [
    { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  ];

  return (
    <footer className="border-t bg-surface">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo name={site.name[locale]} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{t("about")}</p>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("social", { network: label })}
                  className="inline-flex size-10 items-center justify-center rounded-full border bg-background text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={t("explore")} className="lg:col-span-2">
          <h2 className="text-sm font-semibold">{t("explore")}</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {tn(item.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/booking" className="text-muted-foreground transition-colors hover:text-foreground">
                {tn("booking")}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label={t("treatments")} className="lg:col-span-2">
          <h2 className="text-sm font-semibold">{t("treatments")}</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.title[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="text-sm font-semibold">{t("visit")}</h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-muted-foreground">
            <p className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>
                {site.address.street[locale]}, {site.address.locality[locale]}
              </span>
            </p>
            <p className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <a href={site.phoneHref} dir="ltr" className="hover:text-foreground">
                {site.phone}
              </a>
            </p>
            <p className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <a href={`mailto:${site.email}`} className="hover:text-foreground">
                {site.email}
              </a>
            </p>
          </address>
          <h3 className="sr-only">{tl("hours")}</h3>
          <dl className="mt-5 space-y-1.5 text-sm">
            {hours.map((row) => (
              <div key={row.label} className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{row.label}</dt>
                <dd className="whitespace-nowrap font-medium tabular-nums">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t">
        <div className="container-page flex flex-col gap-3 pt-6 pb-24 text-xs md:pe-20 md:pb-6 text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name[locale]}. {t("rights")} · {t("licence", { licence: site.licence })}
          </p>
          <p>
            {t("demoBy")} {site.credit.name} —{" "}
            <a
              href={site.credit.url}
              target="_blank"
              rel="noopener"
              className="font-medium text-foreground underline decoration-sand underline-offset-4 transition-colors hover:text-primary"
            >
              {site.credit.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
