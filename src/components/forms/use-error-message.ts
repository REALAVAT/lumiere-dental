"use client";

import { useTranslations } from "next-intl";

const validationKeys = [
  "serviceRequired",
  "doctorRequired",
  "dateRequired",
  "timeRequired",
  "nameMin",
  "phoneInvalid",
  "emailInvalid",
  "consentRequired",
  "messageMin",
  "invalid",
] as const;

type ValidationKey = (typeof validationKeys)[number];

/** Zod issues carry translation keys; this maps them to localized messages. */
export function useErrorMessage() {
  const t = useTranslations("validation");
  return (key?: string) => {
    if (!key) return undefined;
    return t((validationKeys as readonly string[]).includes(key) ? (key as ValidationKey) : "invalid");
  };
}
