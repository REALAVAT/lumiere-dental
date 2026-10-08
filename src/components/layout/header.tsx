"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { CalendarCheck, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { isActivePath, navItems } from "./nav-items";

const loadMobileMenu = () => import("./mobile-menu").then((mod) => mod.MobileMenu);
const MobileMenu = dynamic(loadMobileMenu, { ssr: false });

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

export function Header({ brand }: { brand: string }) {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 16,
    () => false,
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-2xl border px-3 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 sm:px-5",
          scrolled
            ? "glass shadow-[0_10px_40px_-20px_rgb(16_32_31/0.25)]"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" className="rounded-xl" aria-label={brand}>
          <Logo name={brand} />
        </Link>

        <nav aria-label={t("mainNav")} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors",
                      active ? "bg-secondary text-foreground" : "text-foreground/70 hover:bg-muted/70 hover:text-foreground",
                    )}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <ThemeToggle />
          <Button asChild className="ms-1 hidden md:inline-flex">
            <Link href="/booking">
              <CalendarCheck aria-hidden />
              {tc("bookAppointment")}
            </Link>
          </Button>

          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={t("openMenu")}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={open ? "mobile-menu" : undefined}
            onPointerEnter={loadMobileMenu}
            onFocus={loadMobileMenu}
            onTouchStart={loadMobileMenu}
            onClick={() => {
              setMenuMounted(true);
              setOpen(true);
            }}
          >
            <Menu className="size-5" aria-hidden />
          </Button>
          {menuMounted && (
            <MobileMenu brand={brand} open={open} onOpenChange={setOpen} returnFocusTo={menuButtonRef} />
          )}
        </div>
      </div>
    </header>
  );
}
