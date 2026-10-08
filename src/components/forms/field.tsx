import { CircleAlert } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-destructive">
      <CircleAlert className="size-4 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

export function Field({
  id,
  label,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <Label htmlFor={id} className="mb-2 text-sm font-medium">
        {label}
      </Label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export const inputClass =
  "h-12 rounded-xl bg-background px-4 text-base shadow-none md:text-[0.95rem] dark:bg-input/20";

/** Visually hidden honeypot that bots tend to fill in. */
export function Honeypot({ label, ...props }: { label: string } & React.ComponentProps<"input">) {
  return (
    <div className="pointer-events-none absolute size-px overflow-hidden opacity-0 [clip-path:inset(50%)]" aria-hidden="true">
      <label>
        {label}
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
}
