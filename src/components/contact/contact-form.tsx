"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { submitContact } from "@/actions/contact";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, Honeypot, inputClass } from "@/components/forms/field";
import { useErrorMessage } from "@/components/forms/use-error-message";
import { MotionProvider } from "@/components/motion/motion-provider";
import { cn } from "@/lib/utils";

export function ContactForm() {
  return (
    <MotionProvider>
      <ContactFormInner />
    </MotionProvider>
  );
}

function ContactFormInner() {
  const t = useTranslations("contact.form");
  const tb = useTranslations("booking");
  const locale = useLocale() as Locale;
  const err = useErrorMessage();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", message: "", locale, website: "" },
  });

  function onValid(data: ContactInput) {
    setStatus("idle");
    startTransition(async () => {
      const res = await submitContact(data);
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      noValidate
      className="relative rounded-[2rem] border bg-card p-6 sm:p-10"
      aria-labelledby="contact-form-title"
    >
      <h2 id="contact-form-title" className="text-2xl font-semibold tracking-tight">
        {t("title")}
      </h2>
      <input type="hidden" {...register("locale")} />
      <Honeypot label={tb("honeypot")} {...register("website")} />

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="c-name" label={t("name")} error={err(errors.name?.message)}>
          <Input
            id="c-name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "c-name-error" : undefined}
            className={inputClass}
            {...register("name")}
          />
        </Field>
        <Field id="c-email" label={t("email")} error={err(errors.email?.message)}>
          <Input
            id="c-email"
            type="email"
            autoComplete="email"
            dir="ltr"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "c-email-error" : undefined}
            className={cn(inputClass, "rtl:text-end")}
            {...register("email")}
          />
        </Field>
        <Field id="c-phone" label={t("phone")} error={err(errors.phone?.message)} className="sm:col-span-2">
          <Input
            id="c-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "c-phone-error" : undefined}
            className={cn(inputClass, "rtl:text-end")}
            {...register("phone")}
          />
        </Field>
        <Field id="c-message" label={t("message")} error={err(errors.message?.message)} className="sm:col-span-2">
          <Textarea
            id="c-message"
            rows={5}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "c-message-error" : undefined}
            className="min-h-36 rounded-xl bg-background px-4 py-3 text-base md:text-[0.95rem] dark:bg-input/20"
            {...register("message")}
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div aria-live="polite" className="min-h-6 text-sm">
          <AnimatePresence>
            {status === "success" && (
              <m.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-primary"
              >
                <CircleCheck className="size-4 shrink-0" aria-hidden />
                {t("success")}
              </m.p>
            )}
            {status === "error" && (
              <m.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-destructive">
                {t("error")}
              </m.p>
            )}
          </AnimatePresence>
        </div>
        <Button type="submit" size="lg" disabled={pending} className="shrink-0">
          {pending ? <LoaderCircle className="animate-spin" aria-hidden /> : <Send className="rtl:-scale-x-100" aria-hidden />}
          {pending ? t("sending") : t("send")}
        </Button>
      </div>
    </form>
  );
}
