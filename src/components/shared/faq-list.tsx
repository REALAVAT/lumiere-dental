import { ChevronDown } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { FaqItem } from "@/data/types";

/** Native exclusive accordion (`<details name>`): zero JavaScript, keyboard and screen-reader friendly. */
export function FaqList({ items, locale, idPrefix }: { items: FaqItem[]; locale: Locale; idPrefix: string }) {
  return (
    <div className="divide-y rounded-2xl border bg-card px-2 sm:px-4">
      {items.map((item, i) => (
        <details key={i} name={idPrefix} className="faq-item group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-lg px-3 py-5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
            <h3 className="text-base font-medium sm:text-[1.05rem]">{item.q[locale]}</h3>
            <ChevronDown
              className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden
            />
          </summary>
          <p className="px-3 pb-5 text-[0.95rem] leading-relaxed text-muted-foreground">{item.a[locale]}</p>
        </details>
      ))}
    </div>
  );
}
