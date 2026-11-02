import type { Metadata } from "next";
import { getContent } from "@/lib/cms";
import BookingForm from "./booking-form";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Schedule your dental visit with Densmile Dental Clinic in Westlands, Nairobi.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service = "" } = await searchParams;
  const { services, settings: s } = await getContent();
  const titles = services.map((x) => x.title);

  const phoneRaw = s.phone || "+254 712 345 678";
  const phoneClean = phoneRaw.replace(/\s/g, "");

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <div className="book-grid">
            {/* Left Column: Why Book & Clinic Info */}
            <div>
              <div className="eyebrow">
                <Calendar size={14} />
                <span>Online Appointment Request</span>
              </div>
              <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)", marginBottom: 16 }}>
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
                  padding: 28,
                  border: "1px solid var(--hairline)",
                  boxShadow: "var(--shadow-sm)",
                  marginBottom: 32,
                }}
              >
                <h3 style={{ fontSize: 17, marginBottom: 18, color: "var(--navy)" }}>
                  What Happens After You Book:
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                      1
                    </div>
                    <div>
                      <b style={{ fontSize: 14, color: "var(--ink)", display: "block" }}>Immediate Request Log</b>
                      <span style={{ fontSize: 13, color: "var(--muted)" }}>Our clinic triage receives your booking details securely.</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                      2
                    </div>
                    <div>
                      <b style={{ fontSize: 14, color: "var(--ink)", display: "block" }}>Personal Confirmation Call / WhatsApp</b>
                      <span style={{ fontSize: 13, color: "var(--muted)" }}>We contact you within 30 minutes during business hours to confirm your dentist and slot.</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                      3
                    </div>
                    <div>
                      <b style={{ fontSize: 14, color: "var(--ink)", display: "block" }}>Appointment Reminder & Directions</b>
                      <span style={{ fontSize: 13, color: "var(--muted)" }}>You receive clinic location pin, parking info, and insurance pre-check guidance.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct helpline card */}
              <div
                style={{
                  background: "linear-gradient(135deg, var(--navy) 0%, #1e293b 100%)",
                  borderRadius: 20,
                  padding: 24,
                  color: "#ffffff",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#38bdf8", marginBottom: 8, fontSize: 13, fontWeight: 600 }}>
                  <Phone size={16} />
                  <span>Prefer To Book Over The Phone?</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                  <a href={`tel:${phoneClean}`} style={{ color: "#ffffff" }}>{phoneRaw}</a>
                </div>
                <p style={{ fontSize: 13, color: "#94a3b8" }}>
                  Our reception team is ready to answer questions regarding treatments, costs, or emergency slots.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Booking Form */}
            <div>
              <div className="form-card">
                <BookingForm
                  services={titles}
                  initialService={titles.includes(service) ? service : ""}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
