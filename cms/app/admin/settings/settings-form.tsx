"use client";

import { useActionState } from "react";
import { SETTINGS_SECTIONS } from "@/lib/resources";
import { FieldInput } from "../resource-form";
import { Save, CheckCircle2, AlertCircle } from "lucide-react";

export default function SettingsForm({
  values,
  action,
}: {
  values: Record<string, string>;
  action: (prev: string | null, form: FormData) => Promise<string | null>;
}) {
  const [msg, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction}>
      {msg && (
        <div className={`msg-banner ${msg === "Saved." ? "ok" : "err"}`} style={{ maxWidth: 880 }}>
          {msg === "Saved." ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{msg}</span>
        </div>
      )}

      <div style={{ maxWidth: 880, display: "flex", flexDirection: "column", gap: 24 }}>
        {SETTINGS_SECTIONS.map((sec) => (
          <div key={sec.id} className="settings-section-card">
            <h3>{sec.title}</h3>
            <p className="desc">{sec.description}</p>

            <div className="settings-grid-2">
              {sec.fields.map((f) => (
                <div key={f.name} style={{ gridColumn: f.type === "textarea" ? "span 2" : "span 1" }}>
                  <FieldInput f={f} value={values[f.name]} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div
          style={{
            position: "sticky",
            bottom: 24,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            padding: "16px 24px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--hairline)",
            boxShadow: "var(--shadow-lg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: 13.5, color: "var(--muted)", fontWeight: 500 }}>
            Updates apply immediately to the public website.
          </span>

          <button type="submit" className="btn" disabled={pending}>
            <Save size={16} />
            <span>{pending ? "Saving All Settings…" : "Save Site Settings"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
