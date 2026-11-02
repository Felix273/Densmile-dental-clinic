"use server";

import { CMS_URL } from "@/lib/cms";

export interface BookingState { ok?: boolean; error?: string }

export async function submitBooking(_: BookingState, form: FormData): Promise<BookingState> {
  if (String(form.get("website") ?? "")) return { ok: true };
  const payload = {
    name: String(form.get("name") ?? ""),
    phone: String(form.get("phone") ?? ""),
    email: String(form.get("email") ?? ""),
    service: String(form.get("service") ?? ""),
    preferred_date: String(form.get("preferred_date") ?? ""),
    message: String(form.get("message") ?? ""),
  };
  try {
    const res = await fetch(`${CMS_URL}/api/public/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true };
    if (res.status === 429) return { error: "Too many requests. Please try again in a few minutes." };
    return { error: "Please check your details and try again." };
  } catch {
    return { error: "We couldn't send your request. Please call us instead." };
  }
}
