import { z } from "zod";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";

const phone = z
  .string()
  .trim()
  .regex(/^\+?[0-9\s\-()]{7,20}$/, { error: "phoneInvalid" });

export const ANY_DOCTOR = "any";

export const bookingSchema = z.object({
  service: z.string().refine((v) => services.some((s) => s.slug === v), { error: "serviceRequired" }),
  doctor: z
    .string()
    .refine((v) => v === ANY_DOCTOR || doctors.some((d) => d.slug === v), { error: "doctorRequired" }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { error: "dateRequired" }),
  time: z.string().regex(/^\d{2}:\d{2}$/, { error: "timeRequired" }),
  name: z.string().trim().min(2, { error: "nameMin" }).max(80, { error: "nameMin" }),
  phone,
  email: z.email({ error: "emailInvalid" }),
  notes: z.string().trim().max(500).optional(),
  consent: z.boolean().refine((v) => v, { error: "consentRequired" }),
  locale: z.enum(["en", "ar"]),
  /** Honeypot — real users never fill this in. */
  website: z.string().max(0).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const bookingStepFields = [
  ["service"],
  ["doctor"],
  ["date", "time"],
  ["name", "phone", "email", "consent"],
  [],
] as const satisfies readonly (readonly (keyof BookingInput)[])[];

export const contactSchema = z.object({
  name: z.string().trim().min(2, { error: "nameMin" }).max(80, { error: "nameMin" }),
  email: z.email({ error: "emailInvalid" }),
  phone: z.union([z.literal(""), phone]).optional(),
  message: z.string().trim().min(10, { error: "messageMin" }).max(2000),
  locale: z.enum(["en", "ar"]),
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
