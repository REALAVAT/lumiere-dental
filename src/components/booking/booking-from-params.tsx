"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { MotionProvider } from "@/components/motion/motion-provider";

const BookingWizard = dynamic(() => import("./booking-wizard").then((mod) => mod.BookingWizard), {
  ssr: false,
  loading: () => <BookingSkeleton />,
});

export function BookingFromParams() {
  const params = useSearchParams();
  const service = params.get("service") ?? undefined;
  const doctor = params.get("doctor") ?? undefined;
  return (
    <MotionProvider>
      <BookingWizard key={`${service}-${doctor}`} initialService={service} initialDoctor={doctor} />
    </MotionProvider>
  );
}

export function BookingSkeleton() {
  return (
    <div className="rounded-[2rem] border bg-card p-5 sm:p-8 lg:p-10" aria-hidden>
      <div className="h-4 w-1/3 animate-pulse rounded-full bg-muted" />
      <div className="mt-4 h-1.5 rounded-full bg-muted" />
      <div className="mt-10 h-7 w-2/3 animate-pulse rounded-full bg-muted" />
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[4.75rem] animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    </div>
  );
}
