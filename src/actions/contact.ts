"use server";

import { contactSchema } from "@/lib/schemas";
import { sendNotification } from "@/lib/mailer";

export type ContactResult = { ok: true } | { ok: false; error: "invalid" | "server" };

export async function submitContact(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };

  const data = parsed.data;
  if (data.website) return { ok: true };

  try {
    await sendNotification({
      subject: `New website message from ${data.name}`,
      replyTo: data.email,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : "",
        `Language: ${data.locale.toUpperCase()}`,
        "",
        data.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "server" };
  }
}
