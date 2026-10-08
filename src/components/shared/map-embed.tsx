"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function MapEmbed({
  src,
  title,
  loadingLabel,
  className,
}: {
  src: string;
  title: string;
  loadingLabel: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("relative overflow-hidden rounded-[2rem] border bg-muted", className)}>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:40px_40px]"
        aria-hidden={visible}
      >
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <MapPin className="size-6" aria-hidden />
        </span>
        <span className="text-sm">{loadingLabel}</span>
      </div>
      {visible && (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0 dark:[filter:invert(0.9)_hue-rotate(180deg)_saturate(0.8)]"
          allowFullScreen
        />
      )}
    </div>
  );
}
