import { Resend } from "resend";

type Notification = {
  subject: string;
  text: string;
  replyTo?: string;
};

/**
 * Sends a notification email through Resend when RESEND_API_KEY and BOOKING_EMAIL_TO are set.
 * Otherwise it logs the payload server-side and reports a mocked delivery.
 */
export async function sendNotification({ subject, text, replyTo }: Notification) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_EMAIL_TO;

  if (!apiKey || !to) {
    console.info(`[lumiere] mock delivery — set RESEND_API_KEY and BOOKING_EMAIL_TO to send real email.\n${subject}\n${text}`);
    return { mocked: true as const };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? "Lumière Dental <onboarding@resend.dev>",
    to: to.split(",").map((s) => s.trim()),
    subject,
    text,
    replyTo,
  });

  if (error) {
    console.error("[lumiere] Resend error", error);
    throw new Error("Email delivery failed");
  }
  return { mocked: false as const };
}
