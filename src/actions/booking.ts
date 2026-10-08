"use server";

import { bookingSchema, ANY_DOCTOR } from "@/lib/schemas";
import { isValidSlot } from "@/lib/slots";
import { sendNotification } from "@/lib/mailer";
import { getService } from "@/data/services";
import { getDoctor } from "@/data/doctors";

export type BookingResult = { ok: true; reference: string } | { ok: false; error: "invalid" | "server" };

function makeReference() {
  const random = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().padStart(6, "0").slice(-6);
  return `LMR-${random}`;
}

export async function submitBooking(input: unknown): Promise<BookingResult> {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success || !isValidSlot(parsed.data.date, parsed.data.time)) {
    return { ok: false, error: "invalid" };
  }

  const data = parsed.data;
  const reference = makeReference();

  // Bots that fill the honeypot get a convincing success without anything being sent.
  if (data.website) return { ok: true, reference };

  const service = getService(data.service)!;
  const doctor = data.doctor === ANY_DOCTOR ? undefined : getDoctor(data.doctor);

  try {
    await sendNotification({
      subject: `New booking ${reference} — ${service.title.en} on ${data.date} ${data.time}`,
      replyTo: data.email,
      text: [
        `Reference: ${reference}`,
        `Treatment: ${service.title.en}`,
        `Dentist: ${doctor ? doctor.name.en : "No preference"}`,
        `Date: ${data.date} at ${data.time} (Dubai time)`,
        "",
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Language: ${data.locale.toUpperCase()}`,
        data.notes ? `Notes: ${data.notes}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    });
    return { ok: true, reference };
  } catch {
    return { ok: false, error: "server" };
  }
}
