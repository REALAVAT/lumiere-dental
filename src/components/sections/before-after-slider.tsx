"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { images, unsplash } from "@/lib/images";

export function BeforeAfterSlider() {
  const t = useTranslations("beforeAfter");
  const rtl = useLocale() === "ar";
  const [position, setPosition] = useState(50);

  const src = unsplash(images.smile, 1600);
  const clip = rtl ? `inset(0 0 0 ${100 - position}%)` : `inset(0 ${100 - position}% 0 0)`;

  return (
    <figure className="relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border bg-muted select-none sm:aspect-[16/10]">
        <Image
          src={src}
          alt={t("afterAlt")}
          fill
          quality={75}
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-cover object-[50%_35%]"
        />
        <div className="absolute inset-0" style={{ clipPath: clip }}>
          <Image
            src={src}
            alt={t("beforeAlt")}
            fill
            quality={75}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover object-[50%_35%] [filter:sepia(0.45)_saturate(0.75)_brightness(0.9)_contrast(0.92)_hue-rotate(-8deg)]"
          />
        </div>

        <span className="glass absolute start-4 top-4 rounded-full px-3 py-1 text-xs font-semibold">{t("before")}</span>
        <span className="glass absolute end-4 top-4 rounded-full px-3 py-1 text-xs font-semibold">{t("after")}</span>

        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_20px_rgb(0_0_0/0.25)] rtl:translate-x-1/2"
          style={{ insetInlineStart: `${position}%` }}
          aria-hidden
        >
          <span className="absolute top-1/2 left-1/2 inline-flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-xl ring-4 ring-white/40">
            <ChevronsLeftRight className="size-5" />
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={t("sliderLabel")}
          aria-valuetext={`${position}%`}
          className="peer absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[2rem] ring-ring/60 peer-focus-visible:ring-4"
          aria-hidden
        />
      </div>
      <figcaption className="mt-4 text-center text-xs text-muted-foreground">{t("disclaimer")}</figcaption>
    </figure>
  );
}
