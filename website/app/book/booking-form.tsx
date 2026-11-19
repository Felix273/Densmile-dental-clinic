"use client";

import { useState } from "react";
import { CheckCircle2, Calendar, ShieldCheck, ArrowRight, AlertCircle } from "@/components/icons";

const CMS_ENDPOINT = "https://densmile-cms.netlify.app/api/public/appointments";

export default function BookingForm({
  services,
  initialService,
}: {
  services: string[];
  initialService: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      service: String(formData.get("service") || "").trim(),
      preferred_date: String(formData.get("preferred_date") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    try {
      const res = await fetch(CMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Please check your details and try again.");
      }
    } catch {
      setError("Could not submit booking online. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
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
        <p style={{ color: "var(--body)", fontSize: 15, maxWidth: 420, margin: "0 auto 24px", lineHeight: 1.6 }}>
          Thank you! Our patient coordinator will contact you shortly via call or WhatsApp to confirm your appointment time and provide consultation instructions.
        </p>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--hairline)",
            borderRadius: "var(--radius-md)",
            padding: "16px 20px",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontSize: 13.5,
            color: "var(--body)",
          }}
        >
          <ShieldCheck size={18} style={{ color: "var(--teal)" }} />
          <span>Need immediate assistance? Call our helpline: <a href="tel:0790330294" style={{ color: "inherit", fontWeight: 700, textDecoration: "underline" }}>0790 330 294</a></span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div
          style={{
            background: "var(--danger-soft)",
            color: "var(--danger)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            borderRadius: "var(--radius-md)",
            padding: "12px 16px",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13.5,
          }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <label>
          Full Name *
          <input name="name" type="text" required placeholder="e.g. Sarah Wambui" />
        </label>
        <label>
          Phone Number *
          <input name="phone" type="tel" required placeholder="e.g. +254 712 345 678" />
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <label>
          Email Address (Optional)
          <input name="email" type="email" placeholder="e.g. sarah@example.com" />
        </label>
        <label>
          Treatment / Service
          <select name="service" defaultValue={initialService}>
            <option value="">General Dental Consultation</option>
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
          placeholder="e.g. Sensitivity when chewing on the left side, prefer weekend morning slot, using AAR insurance..."
        />
      </label>

      <button
        type="submit"
        className="btn lg"
        disabled={loading}
        style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
      >
        <Calendar size={18} />
        <span>{loading ? "Submitting Booking…" : "Confirm Appointment Request"}</span>
        {!loading && <ArrowRight size={17} />}
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginTop: 18,
          fontSize: 12.5,
          color: "var(--muted)",
        }}
      >
        <ShieldCheck size={14} style={{ color: "var(--teal)" }} />
        <span>Your medical data is encrypted and handled in strict clinical confidentiality.</span>
      </div>
    </form>
  );
}
