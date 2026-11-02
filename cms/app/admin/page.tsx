import Link from "next/link";
import { query, queryOne } from "@/lib/db";
import {
  CalendarCheck,
  Stethoscope,
  MessageSquareQuote,
  ShieldCheck,
  ArrowRight,
  Plus,
  Settings,
  ExternalLink,
  Clock,
  Phone,
} from "lucide-react";

export default async function Dashboard() {
  const count = async (sql: string) => {
    try {
      const row = await queryOne<{ c: number }>(sql);
      return row?.c ?? 0;
    } catch {
      return 0;
    }
  };

  const [newAppts, totalAppts, servicesCount, reviewsCount, partnersCount] = await Promise.all([
    count("SELECT COUNT(*) c FROM appointments WHERE status='new'"),
    count("SELECT COUNT(*) c FROM appointments"),
    count("SELECT COUNT(*) c FROM services"),
    count("SELECT COUNT(*) c FROM testimonials"),
    count("SELECT COUNT(*) c FROM partners"),
  ]);

  interface Appt {
    id: number;
    name: string;
    phone: string;
    service: string;
    preferred_date: string;
    status: string;
    created_at: string;
  }

  let recentAppts: Appt[] = [];
  try {
    recentAppts = await query<Appt>("SELECT * FROM appointments ORDER BY id DESC LIMIT 5");
  } catch {
    recentAppts = [];
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-info">
          <h1>Clinic Overview & Dashboard</h1>
          <p>Real-time patient bookings, clinical service management, and website configuration.</p>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/admin/settings" className="btn secondary sm">
            <Settings size={15} />
            <span>Site Settings</span>
          </Link>
          <a
            href="https://densmile-dental-clinic-k3fgiwije-fel-inc-africa.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn sm"
          >
            <span>Live Website</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="stats-grid">
        <Link href="/admin/appointments" className="stat-card" style={{ textDecoration: "none" }}>
          <div className="stat-card-header">
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)" }}>New Appointments</span>
            <div className={`stat-icon ${newAppts > 0 ? "red" : ""}`}>
              <CalendarCheck size={20} />
            </div>
          </div>
          <b style={{ color: newAppts > 0 ? "var(--danger)" : "var(--ink)" }}>{newAppts}</b>
          <span>{totalAppts} total requests logged</span>
        </Link>

        <Link href="/admin/services" className="stat-card" style={{ textDecoration: "none" }}>
          <div className="stat-card-header">
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)" }}>Dental Services</span>
            <div className="stat-icon">
              <Stethoscope size={20} />
            </div>
          </div>
          <b>{servicesCount}</b>
          <span>Published dental treatments</span>
        </Link>

        <Link href="/admin/testimonials" className="stat-card" style={{ textDecoration: "none" }}>
          <div className="stat-card-header">
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)" }}>Patient Reviews</span>
            <div className="stat-icon">
              <MessageSquareQuote size={20} />
            </div>
          </div>
          <b>{reviewsCount}</b>
          <span>Verified patient testimonials</span>
        </Link>

        <Link href="/admin/partners" className="stat-card" style={{ textDecoration: "none" }}>
          <div className="stat-card-header">
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)" }}>Insurance Partners</span>
            <div className="stat-icon">
              <ShieldCheck size={20} />
            </div>
          </div>
          <b>{partnersCount}</b>
          <span>Connected insurers</span>
        </Link>
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, #9e0066 0%, #660042 100%)",
          borderRadius: "var(--radius-md)",
          padding: "24px 28px",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div>
          <h3 style={{ color: "#ffffff", fontSize: 18, marginBottom: 4 }}>Quick Content Creation</h3>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13.5 }}>Add new clinical services, testimonials, or facility photos.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/admin/services/new" className="btn sm" style={{ background: "#ffffff", color: "#9e0066", fontWeight: 700 }}>
            <Plus size={15} />
            <span>Add Service</span>
          </Link>
          <Link href="/admin/gallery/new" className="btn sm secondary" style={{ background: "rgba(255,255,255,0.15)", color: "#ffffff", borderColor: "rgba(255,255,255,0.3)" }}>
            <Plus size={15} />
            <span>Add Photo</span>
          </Link>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div>
            <h3 style={{ fontSize: 17 }}>Recent Patient Bookings</h3>
            <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>
              Latest appointment submissions from the website.
            </p>
          </div>
          <Link
            href="/admin/appointments"
            style={{ fontSize: 13.5, color: "var(--primary)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}
          >
            <span>View All ({totalAppts})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Patient Details</th>
                <th>Requested Treatment</th>
                <th>Date</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentAppts.map((a) => (
                <tr key={a.id}>
                  <td>
                    <b style={{ color: "var(--ink)", display: "block" }}>{a.name}</b>
                    <a href={`tel:${a.phone}`} style={{ color: "var(--primary)", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Phone size={12} />
                      <span>{a.phone}</span>
                    </a>
                  </td>
                  <td>{a.service || "General Consultation"}</td>
                  <td>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13 }}>
                      <Clock size={13} style={{ color: "var(--muted)" }} />
                      <span>{a.preferred_date || "Flexible"}</span>
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${a.status}`}>
                      {a.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <Link href="/admin/appointments" className="btn ghost sm">
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
              {recentAppts.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "32px 16px", color: "var(--muted)" }}>
                    No appointment requests logged yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
