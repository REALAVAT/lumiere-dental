"use client";

import { CalendarCheck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import * as m from "motion/react-m";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { WhatsAppIcon } from "@/components/icons";
import { MotionProvider } from "@/components/motion/motion-provider";
import { whatsappUrl } from "@/data/site";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { isActivePath, navItems } from "./nav-items";

type MobileMenuProps = {
  brand: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
};

export function MobileMenu(props: MobileMenuProps) {
  return (
    <MotionProvider>
      <MobileMenuSheet {...props} />
    </MotionProvider>
  );
}

function MobileMenuSheet({ brand, open, onOpenChange, returnFocusTo }: MobileMenuProps) {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        id="mobile-menu"
        side={locale === "ar" ? "left" : "right"}
        closeLabel={t("closeMenu")}
        className="w-full gap-0 border-0 bg-background p-0 sm:max-w-sm"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocusTo.current?.focus();
        }}
      >
        <div className="flex h-[4.75rem] items-center px-6">
          <SheetTitle asChild>
            <span>
              <Logo name={brand} />
            </span>
          </SheetTitle>
          <SheetDescription className="sr-only">{t("mainNav")}</SheetDescription>
        </div>
        <nav aria-label={t("mainNav")} className="flex-1 overflow-y-auto px-4 pt-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item, i) => {
              const active = isActivePath(pathname, item.href);
              return (
                <m.li
                  key={item.href}
                  initial={{ opacity: 0, x: locale === "ar" ? -16 : 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-4 text-2xl font-medium tracking-tight transition-colors",
                      active ? "bg-secondary text-foreground" : "text-foreground/80 hover:bg-muted",
                    )}
                  >
                    {t(item.key)}
                    {active && <span className="size-2 rounded-full bg-primary" aria-hidden />}
                  </Link>
                </m.li>
              );
            })}
          </ul>
        </nav>
        <m.div
          className="flex flex-col gap-3 border-t p-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
        >
          <Button asChild size="lg">
            <Link href="/booking" onClick={close}>
              <CalendarCheck aria-hidden />
              {tc("bookAppointment")}
            </Link>
          </Button>
          <Button asChild size="lg" variant="whatsapp">
            <a href={whatsappUrl(tc("whatsappMessage"))} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              {tc("whatsapp")}
              <span className="sr-only"> {tc("opensInNewTab")}</span>
            </a>
          </Button>
          <LanguageSwitcher className="justify-center sm:hidden" onNavigate={close} />
        </m.div>
      </SheetContent>
    </Sheet>
  );
}
