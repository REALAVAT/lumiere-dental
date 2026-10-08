import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { generalFaqs } from "@/data/faqs";
import { whatsappUrl } from "@/data/site";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import { FaqList } from "@/components/shared/faq-list";
import { SectionHeading, richEm } from "@/components/shared/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd } from "@/lib/seo";

export async function FaqSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("faq");
  const tc = await getTranslations("common");

  return (
    <section className="py-20 sm:py-28" aria-labelledby="faq-title">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="faq-title" eyebrow={t("eyebrow")} title={t.rich("title", richEm)} subtitle={t("subtitle")} />
          <Button asChild variant="whatsapp" className="mt-8">
            <a href={whatsappUrl(tc("whatsappMessage"))} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              {tc("whatsapp")}
              <span className="sr-only"> {tc("opensInNewTab")}</span>
            </a>
          </Button>
        </div>
        <div className="lg:col-span-7">
          <FaqList items={generalFaqs} locale={locale} idPrefix="faq" />
        </div>
      </div>
      <JsonLd data={faqJsonLd(generalFaqs, locale)} />
    </section>
  );
}
