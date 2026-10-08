import { site } from "@/data/site";

export const SLOT_MINUTES = 30;
export const BOOKING_WINDOW_DAYS = 60;

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (mins: number) => `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;

/** ISO weekday (1 = Monday … 7 = Sunday) for a yyyy-MM-dd string, timezone-independent. */
export function isoWeekday(date: string) {
  const day = new Date(`${date}T00:00:00Z`).getUTCDay();
  return day === 0 ? 7 : day;
}

export function slotsForDate(date: string): string[] {
  const hours = site.hours.find((h) => (h.days as readonly number[]).includes(isoWeekday(date)));
  if (!hours) return [];
  const slots: string[] = [];
  for (let t = toMinutes(hours.opens); t + SLOT_MINUTES <= toMinutes(hours.closes); t += SLOT_MINUTES) {
    slots.push(toHHMM(t));
  }
  return slots;
}

export function isClosedDay(date: string) {
  return slotsForDate(date).length === 0;
}

/** Today's date in Dubai as yyyy-MM-dd. */
export function todayInDubai(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dubai" }).format(now);
}

export function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function slotPeriod(time: string): "morning" | "afternoon" | "evening" {
  const mins = toMinutes(time);
  if (mins < 12 * 60) return "morning";
  if (mins < 17 * 60) return "afternoon";
  return "evening";
}

export function isValidSlot(date: string, time: string) {
  return date >= todayInDubai() && slotsForDate(date).includes(time);
}
