"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowLeft, ArrowRight, Check, LoaderCircle, Pencil, UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ar, enGB } from "react-day-picker/locale";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { submitBooking } from "@/actions/booking";
import { ANY_DOCTOR, bookingSchema, bookingStepFields, type BookingInput } from "@/lib/schemas";
import { BOOKING_WINDOW_DAYS, isClosedDay, slotPeriod, slotsForDate, toDateKey } from "@/lib/slots";
import { formatDateLong, formatPrice, formatTime } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ServiceIcon } from "@/components/icons";
import { Field, FieldError, Honeypot, inputClass } from "@/components/forms/field";
import { useErrorMessage } from "@/components/forms/use-error-message";
import { cn } from "@/lib/utils";
import { SuccessCheck } from "./success-check";

const stepKeys = ["service", "doctor", "datetime", "details", "confirm"] as const;
const LAST_STEP = stepKeys.length - 1;

const parseDateKey = (key: string) => {
  const [y, mo, d] = key.split("-").map(Number);
  return new Date(y, mo - 1, d);
};

const choiceCard =
  "relative flex cursor-pointer gap-4 rounded-2xl border bg-background p-4 transition-[border-color,background-color,box-shadow] duration-200 hover:border-primary/40 has-[input:checked]:border-primary has-[input:checked]:bg-secondary/70 has-[input:focus-visible]:ring-3 has-[input:focus-visible]:ring-ring/50 dark:bg-input/10";

function CheckDot() {
  return (
    <span
      className="ms-auto inline-flex size-6 shrink-0 items-center justify-center rounded-full border bg-background text-transparent transition-colors group-has-[input:checked]/choice:border-primary group-has-[input:checked]/choice:bg-primary group-has-[input:checked]/choice:text-primary-foreground"
      aria-hidden
    >
      <Check className="size-3.5" />
    </span>
  );
}

export function BookingWizard({ initialService, initialDoctor }: { initialService?: string; initialDoctor?: string }) {
  const t = useTranslations("booking");
  const tc = useTranslations("common");
  const err = useErrorMessage();
  const locale = useLocale() as Locale;
  const rtl = locale === "ar";

  const validService = services.some((s) => s.slug === initialService) ? initialService : undefined;
  const validDoctor = doctors.some((d) => d.slug === initialDoctor) ? initialDoctor : undefined;

  const [step, setStep] = useState(validService ? 1 : 0);
  const [direction, setDirection] = useState(1);
  const [result, setResult] = useState<{ reference: string; values: BookingInput } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const form = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      service: validService ?? "",
      doctor: validDoctor ?? "",
      date: "",
      time: "",
      name: "",
      phone: "",
      email: "",
      notes: "",
      consent: false,
      locale,
      website: "",
    },
  });
  const { register, control, setValue, trigger, setFocus, formState, handleSubmit, reset, getValues } = form;
  const { errors } = formState;
  const values = useWatch({ control }) as BookingInput;

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, result]);

  const service = services.find((s) => s.slug === values.service);
  const doctorChoices = useMemo(
    () => (values.service ? doctors.filter((d) => d.services.includes(values.service)) : doctors),
    [values.service],
  );
  const selectedDoctor = doctors.find((d) => d.slug === values.doctor);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const maxDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + BOOKING_WINDOW_DAYS);
    return d;
  }, [today]);

  const slots = useMemo(() => {
    if (!values.date) return [];
    const all = slotsForDate(values.date);
    if (values.date !== toDateKey(new Date())) return all;
    const now = new Date();
    const cutoff = now.getHours() * 60 + now.getMinutes() + 60;
    return all.filter((s) => {
      const [h, mi] = s.split(":").map(Number);
      return h * 60 + mi >= cutoff;
    });
  }, [values.date]);

  function focusFirstError(fieldErrors: FieldErrors<BookingInput>) {
    const first = (bookingStepFields[step] as readonly (keyof BookingInput)[]).find((f) => fieldErrors[f]);
    if (first && first !== "date" && first !== "time") setFocus(first);
  }

  async function goNext() {
    const fields = bookingStepFields[step];
    const valid = fields.length === 0 || (await trigger([...fields], { shouldFocus: false }));
    if (!valid) {
      focusFirstError(form.formState.errors);
      return;
    }
    if (step === 0) {
      const doctor = getValues("doctor");
      if (doctor && doctor !== ANY_DOCTOR && !doctors.find((d) => d.slug === doctor)?.services.includes(getValues("service"))) {
        setValue("doctor", "");
      }
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, LAST_STEP));
  }

  function goTo(target: number) {
    setDirection(target > step ? 1 : -1);
    setStep(target);
  }

  function onValid(data: BookingInput) {
    setServerError(null);
    startTransition(async () => {
      const res = await submitBooking(data);
      if (res.ok) {
        setResult({ reference: res.reference, values: data });
      } else {
        setServerError(t("error"));
      }
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < LAST_STEP) {
      void goNext();
    } else {
      void handleSubmit(onValid)();
    }
  }

  function startOver() {
    reset();
    setResult(null);
    setDirection(-1);
    setStep(0);
  }

  const dateLabel = (key: string) => (key ? formatDateLong(parseDateKey(key), locale) : "");
  const slide = (dir: number) => (rtl ? -dir : dir) * 28;

  if (result) {
    const v = result.values;
    const s = services.find((x) => x.slug === v.service)!;
    return (
      <m.div
        className="rounded-[2rem] border bg-card p-8 text-center sm:p-14"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SuccessCheck />
        <h2 ref={headingRef} tabIndex={-1} className="display mt-10 text-3xl outline-none sm:text-4xl">
          {t("success.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-lg leading-relaxed text-muted-foreground" role="status">
          {t("success.body", {
            name: v.name.split(" ")[0],
            service: s.title[locale],
            date: dateLabel(v.date),
            time: formatTime(v.time, locale),
          })}
        </p>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm">
          <span className="text-muted-foreground">{t("success.reference")}</span>
          <span className="font-mono font-semibold tracking-wider" dir="ltr">
            {result.reference}
          </span>
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" variant="outline" onClick={startOver}>
            {t("success.addAnother")}
          </Button>
          <Button asChild size="lg">
            <Link href="/">{t("success.home")}</Link>
          </Button>
        </div>
      </m.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative rounded-[2rem] border bg-card p-5 sm:p-8 lg:p-10">
      <input type="hidden" {...register("locale")} />
      <Honeypot label={t("honeypot")} {...register("website")} />

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{t(`steps.${stepKeys[step]}`)}</span>
          <span className="text-muted-foreground">{t("progress", { current: step + 1, total: stepKeys.length })}</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
          <m.div
            className={cn("h-full rounded-full bg-primary", rtl ? "ms-auto" : "")}
            initial={false}
            animate={{ width: `${((step + 1) / stepKeys.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </div>
        <ol className="mt-4 hidden grid-cols-5 gap-2 sm:grid">
          {stepKeys.map((key, i) => (
            <li
              key={key}
              className={cn("flex items-center gap-2 text-xs", i <= step ? "text-foreground" : "text-muted-foreground")}
              aria-current={i === step ? "step" : undefined}
            >
              <span
                className={cn(
                  "inline-flex size-5 shrink-0 items-center justify-center rounded-full border text-[0.65rem] font-semibold tabular-nums transition-colors",
                  i < step && "border-primary bg-primary text-primary-foreground",
                  i === step && "border-primary text-primary",
                )}
              >
                {i < step ? <Check className="size-3" aria-hidden /> : i + 1}
              </span>
              <span className="truncate">{t(`steps.${key}`)}</span>
            </li>
          ))}
        </ol>
      </div>

      <h2 ref={headingRef} tabIndex={-1} className="mt-8 text-2xl font-semibold tracking-tight outline-none sm:text-[1.75rem]">
        {t(`headings.${stepKeys[step]}`)}
      </h2>

      <div className="relative mt-6 min-h-[22rem]">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <m.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: slide(direction) }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: slide(-direction) }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <fieldset>
                <legend className="sr-only">{t("headings.service")}</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((s) => (
                    <label key={s.slug} className={cn(choiceCard, "group/choice items-center")}>
                      <input
                        type="radio"
                        value={s.slug}
                        className="sr-only"
                        aria-describedby={errors.service ? "service-error" : undefined}
                        {...register("service")}
                      />
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                        <ServiceIcon icon={s.icon} className="size-5" />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="font-medium">{s.title[locale]}</span>
                        <span className="text-xs text-muted-foreground">
                          {tc("from")} {formatPrice(s.priceFrom, locale, tc("currency"))} · {s.duration[locale]}
                        </span>
                      </span>
                      <CheckDot />
                    </label>
                  ))}
                </div>
                <FieldError id="service-error" message={err(errors.service?.message)} />
              </fieldset>
            )}

            {step === 1 && (
              <fieldset>
                <legend className="sr-only">{t("headings.doctor")}</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className={cn(choiceCard, "group/choice items-center")}>
                    <input type="radio" value={ANY_DOCTOR} className="sr-only" {...register("doctor")} />
                    <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                      <UserRound className="size-6" aria-hidden />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="font-medium">{t("anyDoctor")}</span>
                      <span className="text-xs text-muted-foreground">{t("anyDoctorDesc")}</span>
                    </span>
                    <CheckDot />
                  </label>
                  {doctorChoices.map((d) => (
                    <label key={d.slug} className={cn(choiceCard, "group/choice items-center")}>
                      <input type="radio" value={d.slug} className="sr-only" {...register("doctor")} />
                      <span
                        className="size-14 shrink-0 rounded-xl bg-muted bg-cover bg-top"
                        style={{ backgroundImage: `url(${d.image}?auto=format&fit=crop&w=160&q=60)` }}
                        aria-hidden
                      />
                      <span className="flex min-w-0 flex-col">
                        <span className="font-medium">{d.name[locale]}</span>
                        <span className="text-xs text-muted-foreground">{d.role[locale]}</span>
                      </span>
                      <CheckDot />
                    </label>
                  ))}
                </div>
                <FieldError id="doctor-error" message={err(errors.doctor?.message)} />
              </fieldset>
            )}

            {step === 2 && (
              <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
                <div>
                  <p className="mb-3 text-sm font-medium" id="date-label">
                    {t("date")}
                  </p>
                  <Calendar
                    mode="single"
                    selected={values.date ? parseDateKey(values.date) : undefined}
                    onSelect={(d) => {
                      setValue("date", d ? toDateKey(d) : "", { shouldValidate: true });
                      setValue("time", "");
                    }}
                    disabled={[{ before: today }, { after: maxDate }, (d: Date) => isClosedDay(toDateKey(d))]}
                    startMonth={today}
                    endMonth={maxDate}
                    locale={locale === "ar" ? ar : enGB}
                    dir={rtl ? "rtl" : "ltr"}
                    weekStartsOn={1}
                    aria-labelledby="date-label"
                    className="rounded-2xl border bg-background p-3 [--cell-size:--spacing(10)] sm:[--cell-size:--spacing(11)]"
                  />
                  <FieldError id="date-error" message={err(errors.date?.message)} />
                </div>
                <fieldset className="min-w-0">
                  <legend className="mb-3 text-sm font-medium">{t("time")}</legend>
                  {!values.date ? (
                    <p className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">{t("selectDateFirst")}</p>
                  ) : slots.length === 0 ? (
                    <p className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">{t("noSlots")}</p>
                  ) : (
                    <div className="space-y-5">
                      <p className="text-sm font-medium text-primary">{dateLabel(values.date)}</p>
                      {(["morning", "afternoon", "evening"] as const).map((period) => {
                        const list = slots.filter((s) => slotPeriod(s) === period);
                        if (!list.length) return null;
                        return (
                          <div key={period}>
                            <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">{t(period)}</p>
                            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                              {list.map((slot) => (
                                <label
                                  key={slot}
                                  className="cursor-pointer rounded-xl border bg-background py-2.5 text-center text-sm font-medium tabular-nums transition-colors hover:border-primary/40 has-[input:checked]:border-primary has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground has-[input:focus-visible]:ring-3 has-[input:focus-visible]:ring-ring/50"
                                >
                                  <input type="radio" value={slot} className="sr-only" {...register("time")} />
                                  {formatTime(slot, locale)}
                                </label>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <FieldError id="time-error" message={err(errors.time?.message)} />
                </fieldset>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label={t("fields.name")} error={err(errors.name?.message)} className="sm:col-span-2">
                  <Input
                    id="name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClass}
                    {...register("name")}
                  />
                </Field>
                <Field id="phone" label={t("fields.phone")} hint={t("fields.phoneHint")} error={err(errors.phone?.message)}>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    dir="ltr"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
                    className={cn(inputClass, "rtl:text-end")}
                    {...register("phone")}
                  />
                </Field>
                <Field id="email" label={t("fields.email")} error={err(errors.email?.message)}>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    dir="ltr"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(inputClass, "rtl:text-end")}
                    {...register("email")}
                  />
                </Field>
                <Field id="notes" label={t("fields.notes")} className="sm:col-span-2">
                  <Textarea
                    id="notes"
                    rows={3}
                    placeholder={t("fields.notesPlaceholder")}
                    className="min-h-24 rounded-xl bg-background px-4 py-3 text-base md:text-[0.95rem] dark:bg-input/20"
                    {...register("notes")}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      className="mt-0.5 size-5 shrink-0 rounded-md accent-[var(--primary)]"
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                      {...register("consent")}
                    />
                    <span>{t("fields.consent")}</span>
                  </label>
                  <FieldError id="consent-error" message={err(errors.consent?.message)} />
                </div>
              </div>
            )}

            {step === 4 && (
              <dl className="divide-y rounded-2xl border bg-background">
                {[
                  { label: t("summary.service"), value: service?.title[locale], to: 0 },
                  {
                    label: t("summary.doctor"),
                    value: values.doctor === ANY_DOCTOR ? t("anyDoctor") : selectedDoctor?.name[locale],
                    to: 1,
                  },
                  {
                    label: t("summary.date"),
                    value:
                      values.date && values.time ? (
                        <>
                          {dateLabel(values.date)} · <span className="whitespace-nowrap">{formatTime(values.time, locale)}</span>
                        </>
                      ) : (
                        ""
                      ),
                    to: 2,
                  },
                  { label: t("summary.name"), value: values.name, to: 3 },
                  {
                    label: t("summary.contact"),
                    value: (
                      <span className="flex flex-col" dir="ltr">
                        <span className="rtl:text-end">{values.phone}</span>
                        <span className="text-muted-foreground rtl:text-end">{values.email}</span>
                      </span>
                    ),
                    to: 3,
                  },
                  ...(values.notes ? [{ label: t("summary.notes"), value: values.notes, to: 3 }] : []),
                ].map((row) => (
                  <div key={row.label} className="flex items-start gap-3 p-4 sm:gap-4 sm:p-5">
                    <dt className="w-20 shrink-0 text-sm text-muted-foreground sm:w-36">{row.label}</dt>
                    <dd className="min-w-0 flex-1 text-sm font-medium [overflow-wrap:anywhere]">{row.value}</dd>
                    <button
                      type="button"
                      onClick={() => goTo(row.to)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-primary hover:bg-secondary"
                      aria-label={`${t("summary.edit")} ${row.label}`}
                    >
                      <Pencil className="size-3" aria-hidden />
                      {t("summary.edit")}
                    </button>
                  </div>
                ))}
              </dl>
            )}
          </m.div>
        </AnimatePresence>
      </div>

      {serverError && (
        <p role="alert" className="mt-6 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3 border-t pt-6">
        <Button
          type="button"
          variant="ghost"
          onClick={() => goTo(step - 1)}
          className={cn(step === 0 && "invisible")}
          aria-hidden={step === 0}
          tabIndex={step === 0 ? -1 : undefined}
        >
          <ArrowLeft className="rtl:rotate-180" aria-hidden />
          {t("back")}
        </Button>
        {step < LAST_STEP ? (
          <Button type="submit" size="lg">
            {t("next")}
            <ArrowRight className="rtl:rotate-180" aria-hidden />
          </Button>
        ) : (
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? <LoaderCircle className="animate-spin" aria-hidden /> : <Check aria-hidden />}
            {pending ? t("submitting") : t("submit")}
          </Button>
        )}
      </div>
    </form>
  );
}
