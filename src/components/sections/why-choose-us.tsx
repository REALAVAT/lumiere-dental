import Image from "next/image";
import { Armchair, Receipt, ScanLine, Stethoscope } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading, richEm } from "@/components/shared/section-heading";
import { images, unsplash } from "@/lib/images";

const items = [
  { key: "tech", Icon: ScanLine },
  { key: "comfort", Icon: Armchair },
  { key: "transparent", Icon: Receipt },
  { key: "specialists", Icon: Stethoscope },
] as const;

export async function WhyChooseUs() {
  const t = await getTranslations("why");

  const stats = [
    { value: "12k+", label: t("stats.smiles") },
    { value: "98.6%", label: t("stats.implants") },
    { value: "9", label: t("stats.languages") },
  ];

  return (
    <section className="py-20 sm:py-28" aria-labelledby="why-title">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={unsplash(images.xray, 1400)}
              alt={t("imageAlt")}
              fill
              quality={75}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <dl className="glass absolute inset-x-4 -bottom-8 grid grid-cols-3 gap-2 rounded-2xl p-5 shadow-xl sm:inset-x-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse text-center">
                <dt className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-primary tabular-nums sm:text-3xl" dir="ltr">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="pt-6 lg:pt-0">
          <SectionHeading id="why-title" eyebrow={t("eyebrow")} title={t.rich("title", richEm)} />
          <ul className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {items.map(({ key, Icon }, i) => (
              <Reveal as="li" key={key} delay={i * 0.08}>
                <span className="inline-flex size-11 items-center justify-center rounded-xl border bg-card text-primary">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{t(`items.${key}.title`)}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{t(`items.${key}.body`)}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
