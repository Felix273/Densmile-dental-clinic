import { Suspense } from "react";
import { getContent } from "@/lib/cms";
import BookingForm from "./booking-form";
import { Calendar, Clock, MapPin, Phone, ShieldCheck } from "@/components/icons";

export const metadata = {
  title: "Book an Appointment | Densmile Dental Clinic",
  description: "Schedule your dental consultation online in seconds with our clinic specialists.",
};

export default async function BookPage() {
  const { services, settings: s } = await getContent();
  const titles = (services || []).map((x) => x.title);

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <section className="section" style={{ paddingTop: 48, paddingBottom: 64 }}>
        <div className="wrap">
          <div className="book-grid">
            {/* Left Column: Why Book & Clinic Info */}
            <div>
              <div className="eyebrow">
                <Calendar size={14} />
                <span>Online Appointment Request</span>
              </div>
              <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 16 }}>
                Reserve Your Dental Visit
              </h1>
              <p className="lead" style={{ marginBottom: 32 }}>
                Take the first step toward a healthier, more confident smile. Complete our brief reservation form, and our patient coordinator will reach out promptly to confirm your preferred time.
              </p>

              {/* What happens next steps */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 20,
                  padding: 24,
                  border: "1px solid var(--hairline)",
                  boxShadow: "var(--shadow-sm)",
                  marginBottom: 24,
                }}
              >
                <b style={{ fontSize: 16, display: "block", marginBottom: 16, color: "var(--ink)" }}>
                  What Happens After You Book:
                </b>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                      1
                    </div>
                    <div>
                      <b style={{ fontSize: 14, color: "var(--ink)", display: "block" }}>Immediate Request Log</b>
                      <span style={{ fontSize: 13, color: "var(--muted)" }}>Our triage team receives your booking details securely.</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                      2
                    </div>
                    <div>
                      <b style={{ fontSize: 14, color: "var(--ink)", display: "block" }}>Fast Direct Confirmation</b>
                      <span style={{ fontSize: 13, color: "var(--muted)" }}>We call or WhatsApp you to lock in the exact appointment slot.</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                      3
                    </div>
                    <div>
                      <b style={{ fontSize: 14, color: "var(--ink)", display: "block" }}>Zero-Wait Arrival</b>
                      <span style={{ fontSize: 13, color: "var(--muted)" }}>Arrive at your chosen branch and walk right into your consultation.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Booking Form */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: 24,
                padding: "36px 32px",
                border: "1px solid var(--hairline)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <h2 style={{ fontSize: 24, marginBottom: 6 }}>Schedule Consultation</h2>
              <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
                Please fill in your details. We will confirm your chosen service and time promptly.
              </p>

              <Suspense fallback={<div>Loading booking form…</div>}>
                <BookingForm services={titles} initialService="" />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
