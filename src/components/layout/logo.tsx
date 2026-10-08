import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <rect width="32" height="32" rx="10" className="fill-primary" />
      <path
        d="M16 7.5c-1.4-1-2.9-1.5-4.4-1.2-2.1.4-3.2 2.3-2.9 4.6.2 2 1.1 3.3 1.6 5.2.4 1.8.6 4.8 2.1 4.8 1.6 0 1.4-4 3.6-4s2 4 3.6 4c1.5 0 1.7-3 2.1-4.8.5-1.9 1.4-3.2 1.6-5.2.3-2.3-.8-4.2-2.9-4.6-1.5-.3-3 .2-4.4 1.2Z"
        className="fill-none stroke-primary-foreground"
        strokeWidth="1.6"
        strokeLinejoin="round"
        transform="translate(0 2.5)"
      />
      <circle cx="23.5" cy="8.5" r="1.6" className="fill-sand" />
    </svg>
  );
}

export function Logo({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="text-[1.05rem] font-semibold tracking-tight">{name}</span>
      </span>
    </span>
  );
}
