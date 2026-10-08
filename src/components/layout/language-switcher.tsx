"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const target = locale === "ar" ? "en" : "ar";

  return (
    <Link
      href={pathname}
      locale={target}
      hrefLang={target}
      lang={target}
      aria-label={t("switchToLabel")}
      onClick={onNavigate}
      className={cn(
        "inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground",
        className,
      )}
    >
      <Languages className="size-4" aria-hidden />
      {t("switchTo")}
    </Link>
  );
}
