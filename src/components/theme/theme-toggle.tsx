"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { THEME_STORAGE_KEY } from "./theme-script";

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
}

function prefersDark() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("nav");

  // React's dev Strict Mode remount resets <html> attributes set by the inline script.
  useLayoutEffect(() => {
    applyTheme(prefersDark());
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    applyTheme(next);
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={t("themeToggle")} className={className}>
      <Sun className="size-[1.15rem] scale-100 rotate-0 transition-transform duration-300 dark:scale-0 dark:-rotate-90" aria-hidden />
      <Moon className="absolute size-[1.15rem] scale-0 rotate-90 transition-transform duration-300 dark:scale-100 dark:rotate-0" aria-hidden />
    </Button>
  );
}
