"use client";

import * as m from "motion/react-m";

export function SuccessCheck() {
  return (
    <div className="relative mx-auto size-28" aria-hidden>
      {[0, 1].map((i) => (
        <m.span
          key={i}
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: 1.6 + i * 0.3, opacity: 0 }}
          transition={{ duration: 1.4, delay: 0.35 + i * 0.2, ease: "easeOut" }}
        />
      ))}
      <m.svg
        viewBox="0 0 112 112"
        className="relative size-28"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <circle cx="56" cy="56" r="56" className="fill-primary" />
        <m.path
          d="M34 57.5 49.5 73 79 41"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-primary-foreground"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
        />
      </m.svg>
    </div>
  );
}
