import { ArrowRight, CalendarCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { whatsappUrl } from "@/data/site";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { richEm } from "@/components/shared/section-heading";

export async function FinalCta() {
  const t = await getTranslations("finalCta");
  const tc = await getTranslations("common");

  return (
    <section className="pb-20 sm:pb-28" aria-labelledby="cta-title">
      <div className="container-page">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12 sm:py-24">
            <div
              className="absolute -top-24 -end-24 -z-10 size-80 rounded-full bg-sand/30 blur-3xl"
              aria-hidden
            />
            <div
              className="absolute -bottom-32 -start-16 -z-10 size-96 rounded-full bg-emerald/40 blur-3xl"
              aria-hidden
            />
            <h2
              id="cta-title"
              className="display mx-auto max-w-3xl text-3xl leading-[1.1] sm:text-5xl [&_em]:text-sand dark:[&_em]:text-primary-foreground"
            >
              {t.rich("title", richEm)}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-primary-foreground/85 sm:text-lg">{t("subtitle")}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-primary-foreground text-primary shadow-none hover:bg-primary-foreground/90 dark:hover:bg-primary-foreground/90"
              >
                <Link href="/booking">
                  <CalendarCheck aria-hidden />
                  {tc("bookAppointment")}
                  <ArrowRight className="rtl:rotate-180" aria-hidden />
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
