"use client";

import { useActionState } from "react";
import { submitBooking, type BookingState } from "./actions";
import { CheckCircle2, Calendar, ShieldCheck, ArrowRight, AlertCircle } from "@/components/icons";

export default function BookingForm({
  services,
  initialService,
}: {
  services: string[];
  initialService: string;
}) {
  const [state, action, pending] = useActionState<BookingState, FormData>(submitBooking, {});

  if (state.ok) {
    return (
      <div style={{ textAlign: "center", padding: "32px 16px" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "var(--green-soft)",
            color: "var(--green)",
            display: "grid",
            placeItems: "center",
            margin: "0 auto 20px",
          }}
        >
          <CheckCircle2 size={36} />
        </div>
        <h3 style={{ fontSize: 24, marginBottom: 12, color: "var(--navy)" }}>
          Appointment Request Received!
        </h3>
        <p style={{ color: "var(--muted)", maxWidth: 440, margin: "0 auto 24px", lineHeight: 1.6 }}>
          Thank you! Our patient coordinator will contact you shortly via call or WhatsApp to confirm your appointment time and provide consultation instructions.
        </p>
        <div
          style={{
            background: "var(--soft)",
            padding: "16px 20px",
            borderRadius: 14,
            fontSize: 13.5,
            color: "var(--body)",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <ShieldCheck size={18} style={{ color: "var(--teal)" }} />
          <span>Need immediate assistance? Call our helpline: <a href="tel:0790330294" style={{ color: "inherit", fontWeight: 700, textDecoration: "underline" }}>0790 330 294</a></span>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="form">
      <div>
        <h3 style={{ fontSize: 20, marginBottom: 6, color: "var(--navy)" }}>
          Schedule an Appointment
        </h3>
        <p style={{ fontSize: 13.5, color: "var(--muted)" }}>
          Please fill in your contact information and chosen service below.
        </p>
      </div>

      <div className="form-row">
        <label>
          Full Name
          <input
            name="name"
            required
            minLength={2}
            autoComplete="name"
            placeholder="e.g. Sarah Mwangi"
          />
        </label>

        <label>
          Phone Number
          <input
            name="phone"
            type="tel"
            required
            minLength={7}
            autoComplete="tel"
            placeholder="e.g. 0790 330 294"
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Email Address (Optional)
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="e.g. sarah@example.com"
          />
        </label>

        <label>
          Treatment / Consultation
          <select name="service" defaultValue={initialService}>
            <option value="">General Dental Consultation & Exam</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Preferred Appointment Date
        <input
          name="preferred_date"
          type="date"
          min={new Date().toLocaleDateString("en-CA")}
          required
        />
      </label>

      <label>
        Any Symptoms, Concerns, or Medical Notes?
        <textarea
          name="message"
          rows={3}
          placeholder="e.g. Sensitive tooth on upper right side, prefer morning visit, have insurance card with AAR..."
        />
      </label>

      {/* Honeypot anti-spam field */}
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden />

      {state.error && (
        <div className="msg-err" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <AlertCircle size={18} />
          <span>{state.error}</span>
        </div>
      )}

      <button
        type="submit"
        className="btn lg"
        disabled={pending}
        style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
      >
        <Calendar size={18} />
        <span>{pending ? "Sending Reservation…" : "Request Appointment Now"}</span>
        {!pending && <ArrowRight size={16} />}
      </button>

      <p style={{ fontSize: 12.5, color: "var(--muted-light)", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <ShieldCheck size={14} style={{ color: "var(--teal)" }} />
        <span>Your health data is 100% private & never shared with third parties.</span>
      </p>
    </form>
  );
}
