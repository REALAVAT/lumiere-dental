import { Baby, Gem, Siren, Sparkles, type LucideProps } from "lucide-react";
import type { ServiceIcon as ServiceIconKey } from "@/data/services";

type IconProps = React.SVGProps<SVGSVGElement>;

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43m8.03-17.47A11.28 11.28 0 0 0 12.05.72C5.79.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.6l6.02-1.58a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.35-11.34 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  );
}

export function ToothIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 5.5c-1.6-1.3-3.3-2-5-1.7C4.6 4.2 3.3 6.4 3.6 9c.3 2.3 1.3 3.8 1.8 6 .5 2.1.7 5.5 2.4 5.5 1.9 0 1.6-4.6 4.2-4.6s2.3 4.6 4.2 4.6c1.7 0 1.9-3.4 2.4-5.5.5-2.2 1.5-3.7 1.8-6 .3-2.6-1-4.8-3.4-5.2-1.7-.3-3.4.4-5 1.7Z" />
      <path d="M9.5 7.2c.9.5 1.7 1 2.5 1.6" />
    </svg>
  );
}

export function AlignerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 9c0-2.5 4-4.5 9-4.5S21 6.5 21 9c0 4-3.2 9-5 9-1.3 0-1.6-2.2-4-2.2S9.3 18 8 18c-1.8 0-5-5-5-9Z" />
      <path d="M7 9.5v2M10 8.5v2.5M14 8.5v2.5M17 9.5v2" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.47A20.6 20.6 0 0 0 14.3 4.3c-2.25 0-3.8 1.37-3.8 3.9v2.3H8v3h2.5V21h3Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 13.4c0-3.1-1.66-4.54-3.87-4.54-1.78 0-2.58.98-3.02 1.67V8.5h-3.38V20h3.38v-5.7c0-1.5.28-2.95 2.14-2.95 1.83 0 1.86 1.72 1.86 3.05V20h3.38l-.49-6.6Z" />
    </svg>
  );
}

export function ServiceIcon({ icon, ...props }: { icon: ServiceIconKey } & LucideProps) {
  switch (icon) {
    case "sparkles":
      return <Sparkles strokeWidth={1.75} aria-hidden {...props} />;
    case "gem":
      return <Gem strokeWidth={1.75} aria-hidden {...props} />;
    case "baby":
      return <Baby strokeWidth={1.75} aria-hidden {...props} />;
    case "siren":
      return <Siren strokeWidth={1.75} aria-hidden {...props} />;
    case "tooth":
      return <ToothIcon className={props.className} />;
    case "aligner":
      return <AlignerIcon className={props.className} />;
  }
}
