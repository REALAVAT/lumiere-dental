import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "start",
  as: Tag = "h2",
  id,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "start" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow", align === "center" && "justify-center")}>
          <span className="h-px w-6 bg-sand-strong/60" aria-hidden />
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "display mt-4 text-foreground",
          Tag === "h1" ? "text-4xl leading-[1.05] sm:text-5xl lg:text-6xl" : "text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem]",
        )}
      >
        {title}
      </Tag>
      {subtitle && <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{subtitle}</p>}
    </div>
  );
}

export const richEm = { em: (chunks: React.ReactNode) => <em>{chunks}</em> };
