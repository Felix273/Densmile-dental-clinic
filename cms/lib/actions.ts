"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { queryOne, execute, getDb } from "./db";
import { createSession, destroySession, requireSession, createPasswordResetToken, verifyPasswordResetToken } from "./auth";
import { sendPasswordResetEmail } from "./mail";
import { APPOINTMENT_STATUSES, SETTINGS_FIELDS, getResource } from "./resources";

const attempts = new Map<string, { n: number; t: number }>();

export async function login(_: string | null, form: FormData): Promise<string | null> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const rec = attempts.get(email);
  if (rec && Date.now() - rec.t < 15 * 60_000 && rec.n >= 5) return "Too many attempts. Try again later.";

  const user = await queryOne<{ password_hash: string }>(
    "SELECT password_hash FROM users WHERE lower(email) = ?",
    [email]
  );
  const ok = user ? await bcrypt.compare(password, user.password_hash) : false;
  if (!ok) {
    attempts.set(email, { n: rec && Date.now() - rec.t < 15 * 60_000 ? rec.n + 1 : 1, t: Date.now() });
    return "Invalid email or password.";
  }
  attempts.delete(email);
  await createSession(email);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/login");
}

export async function saveResourceAction(
  prevState: string | null,
  formData: FormData
): Promise<string | null> {
  try {
    await requireSession();
  } catch {
    return "Session expired. Please log in again.";
  }

  const key = String(formData.get("__resource_key") || "").trim();
  const id = String(formData.get("__resource_id") || "").trim();

  const res = getResource(key);
  if (!res) return "Unknown resource";

  const values: Record<string, string | number> = {};
  for (const f of res.fields) {
    const raw = formData.get(f.name);
    if (f.type === "checkbox") {
      values[f.name] = raw ? 1 : 0;
    } else if (f.type === "number") {
      values[f.name] = Number(raw) || 0;
    } else {
      const v = String(raw ?? "").trim();
      if (f.required && !v) return `${f.label} is required.`;
      values[f.name] = v;
    }
  }

  if (values.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(String(values.slug))) {
    return "Slug must be lowercase letters, numbers, and dashes.";
  }
  if ("rating" in values) {
    values.rating = Math.min(5, Math.max(1, Number(values.rating) || 5));
  }

  const names = res.fields.map((f) => f.name);
  const db = getDb();

  try {
    if (id === "new") {
      const sql = `INSERT INTO ${res.table} (${names.join(",")}) VALUES (${names.map(() => "?").join(",")})`;
      const args = names.map((n) => (values[n] !== undefined ? values[n] : ""));
      await db.execute({ sql, args });
    } else {
      const sql = `UPDATE ${res.table} SET ${names.map((n) => `${n}=?`).join(",")} WHERE id=?`;
      const args = [...names.map((n) => (values[n] !== undefined ? values[n] : "")), Number(id)];
      await db.execute({ sql, args });
    }

    revalidatePath(`/admin/${key}`);
    revalidatePath(`/admin/${key}/${id}`);
    return "Saved.";
  } catch (err: any) {
    console.error("Save resource error:", err);
    if (err instanceof Error && err.message.includes("UNIQUE")) {
      return "That slug is already in use.";
    }
    return `Database error: ${err?.message || "Failed to save."}`;
  }
}

export async function deleteResource(key: string, id: number) {
  await requireSession();
  const res = getResource(key);
  if (!res) return;
  await execute(`DELETE FROM ${res.table} WHERE id = ?`, [id]);
  revalidatePath(`/admin/${key}`);
}

export async function saveSettings(_: string | null, form: FormData): Promise<string | null> {
  try {
    await requireSession();
  } catch {
    return "Session expired. Please log in again.";
  }

  try {
    for (const f of SETTINGS_FIELDS) {
      await execute(
        "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
        [f.name, String(form.get(f.name) ?? "").trim()]
      );
    }
    revalidatePath("/admin/settings");
    return "Saved.";
  } catch (err: any) {
    return `Settings error: ${err?.message || "Failed to save settings."}`;
  }
}

export async function setAppointmentStatus(id: number, status: string) {
  await requireSession();
  if (!(APPOINTMENT_STATUSES as readonly string[]).includes(status)) return;
  await execute("UPDATE appointments SET status = ? WHERE id = ?", [status, id]);
  revalidatePath("/admin/appointments");
}

export async function deleteAppointment(id: number) {
  await requireSession();
  await execute("DELETE FROM appointments WHERE id = ?", [id]);
  revalidatePath("/admin/appointments");
}

export async function requestPasswordReset(_: string | null, form: FormData): Promise<string | null> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!email) return "Please enter your email address.";

  const user = await queryOne<{ id: number }>("SELECT id FROM users WHERE lower(email) = ?", [email]);

  if (user) {
    const token = await createPasswordResetToken(email);
    const origin = process.env.APP_URL || "https://densmile-cms-kohl.vercel.app";
    const resetUrl = `${origin}/reset-password?token=${encodeURIComponent(token)}`;
    try {
      await sendPasswordResetEmail(email, resetUrl);
    } catch (err) {
      console.error("Failed to dispatch reset email:", err);
      return "Could not send reset email. Please try again.";
    }
  }

  return "If that account exists, a password reset link has been dispatched to your email.";
}

export async function completePasswordReset(_: string | null, form: FormData): Promise<string | null> {
  const token = String(form.get("token") ?? "").trim();
  const password = String(form.get("password") ?? "");
  const confirm = String(form.get("confirm_password") ?? "");

  if (!token) return "Invalid or missing reset token.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (password !== confirm) return "Passwords do not match.";

  const email = await verifyPasswordResetToken(token);
  if (!email) return "This reset link is invalid or has expired. Please request a new one.";

  const hash = bcrypt.hashSync(password, 12);
  await execute("UPDATE users SET password_hash = ? WHERE lower(email) = ?", [hash, email]);

  redirect("/login?reset=success");
}
