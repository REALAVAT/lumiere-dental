import type { CSSProperties, HTMLAttributes } from "react";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "li";
  /** Stagger, in the same units the old time-based API used (seconds). */
  delay?: number;
  y?: number;
};

/**
 * Scroll-driven reveal (CSS `animation-timeline: view()`), so it costs no JavaScript or hydration.
 * Browsers without support, and users who prefer reduced motion, simply see the content.
 */
export function Reveal({ as: Comp = "div", delay = 0, y = 24, style, ...props }: RevealProps) {
  return (
    <Comp
      data-reveal=""
      style={{ "--reveal-y": `${y}px`, "--reveal-stagger": `${Math.round(delay * 500)}px`, ...style } as CSSProperties}
      {...props}
    />
  );
}
