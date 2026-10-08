import { getTranslations } from "next-intl/server";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappUrl } from "@/data/site";

export async function FloatingWhatsApp() {
  const t = await getTranslations("common");

  return (
    <a
      href={whatsappUrl(t("whatsappMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t("whatsappFloating")} ${t("opensInNewTab")}`}
      className="group fixed end-5 bottom-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#0e7a3f] text-white shadow-[0_12px_32px_-8px_rgb(14_122_63/0.6)] transition-transform duration-300 animate-in fade-in zoom-in-75 [animation-delay:600ms] [animation-fill-mode:both] hover:scale-105 focus-visible:ring-4 focus-visible:ring-[#0e7a3f]/40 motion-reduce:transition-none sm:end-7 sm:bottom-7"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25d366]/40 motion-safe:animate-ping [animation-duration:2.5s]"
      />
      <WhatsAppIcon className="relative size-7" />
      <span className="pointer-events-none absolute end-full me-3 hidden rounded-full bg-foreground px-3 py-1.5 text-xs font-medium whitespace-nowrap text-background opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block">
        {t("whatsappFloating")}
      </span>
    </a>
  );
}
