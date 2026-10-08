import { getTranslations } from "next-intl/server";
import { insurers } from "@/data/insurance";
import { cn } from "@/lib/utils";

const styleClass = {
  serif: "font-[family-name:var(--font-serif)] text-2xl italic",
  sans: "text-xl font-semibold tracking-tight",
  mono: "font-mono text-lg font-medium uppercase tracking-widest",
} as const;

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-14 pe-14" aria-hidden={hidden || undefined}>
      {insurers.map((ins) => (
        <li
          key={ins.name}
          className={cn("whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground", styleClass[ins.style])}
          lang="en"
          dir="ltr"
        >
          {ins.name}
        </li>
      ))}
    </ul>
  );
}

export async function InsuranceStrip() {
  const t = await getTranslations("insurance");

  return (
    <section className="border-y py-12" aria-labelledby="insurance-title">
      <h2 id="insurance-title" className="text-center text-sm font-medium text-muted-foreground">
        {t("title")}
      </h2>
      <div className="group relative mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] rtl:animate-marquee-rtl">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
