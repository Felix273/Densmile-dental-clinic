import { query, queryOne } from "@/lib/db";
import { APPOINTMENT_STATUSES } from "@/lib/resources";
import { deleteAppointment, setAppointmentStatus } from "@/lib/actions";
import {
  CalendarCheck,
  Phone,
  Mail,
  MessageCircle,
  Clock,
} from "lucide-react";
import DeleteButton from "../delete-button";

interface Appt {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  preferred_date: string;
  message: string;
  status: string;
  created_at: string;
}

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: filterStatus = "all" } = await searchParams;

  let querySql = "SELECT * FROM appointments";
  const params: string[] = [];
  if (filterStatus && filterStatus !== "all") {
    querySql += " WHERE status = ?";
    params.push(filterStatus);
  }
  querySql += " ORDER BY id DESC";

  let rows: Appt[] = [];
  try {
    rows = await query<Appt>(querySql, params);
  } catch {
    rows = [];
  }

  const countByStatus = async (st: string) => {
    try {
      const row = await queryOne<{ c: number }>("SELECT COUNT(*) c FROM appointments WHERE status = ?", [st]);
      return row?.c ?? 0;
    } catch {
      return 0;
    }
  };

  const totalCount = await (async () => {
    try {
      const row = await queryOne<{ c: number }>("SELECT COUNT(*) c FROM appointments");
      return row?.c ?? 0;
    } catch {
      return 0;
    }
  })();

  const statusCounts = await Promise.all(APPOINTMENT_STATUSES.map((st) => countByStatus(st)));

  return (
    <>
      <div className="page-header">
        <div className="page-header-info">
          <h1>Patient Appointments & Bookings</h1>
          <p>
            Manage triage, confirm consultation slots, and contact patients ({totalCount} total bookings).
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        <a
          href="/admin/appointments"
          className={`btn sm ${filterStatus === "all" ? "" : "secondary"}`}
        >
          <span>All Requests ({totalCount})</span>
        </a>

        {APPOINTMENT_STATUSES.map((st, idx) => {
          const cnt = statusCounts[idx];
          const isActive = filterStatus === st;
          return (
            <a
              key={st}
              href={`/admin/appointments?status=${st}`}
              className={`btn sm ${isActive ? "" : "secondary"}`}
              style={{ textTransform: "capitalize" }}
            >
              <span>{st}</span>
              <span
                style={{
                  background: isActive ? "rgba(255,255,255,0.25)" : "var(--hairline)",
                  color: isActive ? "#ffffff" : "var(--muted)",
                  padding: "1px 6px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {cnt}
              </span>
            </a>
          );
        })}
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="table-wrapper" style={{ border: 0, borderRadius: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Patient Information</th>
                <th>Treatment Requested</th>
                <th>Status & Transition</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => {
                const phoneClean = a.phone.replace(/\s/g, "");
                const waDigits = a.phone.replace(/\D/g, "");

                return (
                  <tr key={a.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            background: "var(--primary-soft)",
                            color: "var(--primary)",
                            display: "grid",
                            placeItems: "center",
                            fontWeight: 700,
                            flexShrink: 0,
                            fontSize: 14,
                          }}
                        >
                          {a.name.charAt(0)}
                        </div>

                        <div>
                          <b style={{ color: "var(--ink)", fontSize: 14.5 }}>{a.name}</b>

                          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4, flexWrap: "wrap" }}>
                            <a
                              href={`tel:${phoneClean}`}
                              style={{
                                color: "var(--primary)",
                                fontSize: 13,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                                fontWeight: 500,
                              }}
                            >
                              <Phone size={12} />
                              <span>{a.phone}</span>
                            </a>

                            {waDigits && (
                              <a
                                href={`https://wa.me/${waDigits}?text=Hello%20${encodeURIComponent(a.name)}%2C%20this%20is%20Densmile%20Dental%20Clinic%20regarding%20your%20appointment%20request.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "#16a34a",
                                  fontSize: 12.5,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 4,
                                  fontWeight: 600,
                                }}
                              >
                                <MessageCircle size={12} />
                                <span>WhatsApp</span>
                              </a>
                            )}

                            {a.email && (
                              <a
                                href={`mailto:${a.email}`}
                                style={{
                                  color: "var(--muted)",
                                  fontSize: 12.5,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 4,
                                }}
                              >
                                <Mail size={12} />
                                <span>{a.email}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <b style={{ color: "var(--ink)", fontSize: 14, display: "block" }}>
                        {a.service || "General Dental Consultation"}
                      </b>

                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--muted)", marginTop: 4 }}>
                        <Clock size={12} />
                        <span>Preferred Date: <b>{a.preferred_date || "Any time"}</b></span>
                      </div>

                      {a.message && (
                        <div
                          style={{
                            background: "var(--surface)",
                            padding: "6px 10px",
                            borderRadius: 6,
                            marginTop: 6,
                            fontSize: 12.5,
                            color: "var(--body)",
                            maxWidth: 360,
                            fontStyle: "italic",
                          }}
                        >
                          “{a.message}”
                        </div>
                      )}

                      <small style={{ color: "var(--muted-light)", fontSize: 11, display: "block", marginTop: 4 }}>
                        Logged: {a.created_at} UTC
                      </small>
                    </td>

                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <span className={`badge ${a.status}`} style={{ alignSelf: "flex-start", textTransform: "capitalize" }}>
                          {a.status}
                        </span>

                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 2 }}>
                          {APPOINTMENT_STATUSES.map((s) => (
                            <form key={s} style={{ display: "inline" }}>
                              <button
                                type="submit"
                                formAction={setAppointmentStatus.bind(null, a.id, s)}
                                disabled={a.status === s}
                                style={{
                                  border: "1px solid var(--hairline)",
                                  background: a.status === s ? "var(--ink)" : "#ffffff",
                                  color: a.status === s ? "#ffffff" : "var(--muted)",
                                  fontSize: 11,
                                  fontWeight: 600,
                                  padding: "3px 8px",
                                  borderRadius: 6,
                                  cursor: a.status === s ? "default" : "pointer",
                                  textTransform: "capitalize",
                                }}
                              >
                                {s}
                              </button>
                            </form>
                          ))}
                        </div>
                      </div>
                    </td>

                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      <form
                        style={{ display: "inline" }}
                        action={deleteAppointment.bind(null, a.id)}
                      >
                        <DeleteButton confirmText="Are you sure you want to delete this appointment request?" showText />
                      </form>
                    </td>
                  </tr>
                );
              })}

              {rows.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "48px 16px", color: "var(--muted)" }}>
                    <CalendarCheck size={36} style={{ color: "var(--muted-light)", margin: "0 auto 12px", display: "block" }} />
                    <p style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)", margin: 0 }}>
                      No appointment requests in this view.
                    </p>
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>
                      Requests made through the website booking form will appear here instantly.
                    </span>
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
