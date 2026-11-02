"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { Field } from "@/lib/resources";
import { CheckCircle2, AlertCircle, Save, X } from "lucide-react";
import ImageUploader from "./image-uploader";

export function FieldInput({
  f,
  value,
}: {
  f: Field;
  value: string | number | undefined;
}) {
  const id = `f_${f.name}`;
  const strVal = value !== undefined && value !== null ? String(value) : "";
  const isImageField =
    f.type === "url" && (f.name.includes("image") || f.name.includes("logo") || f.name.includes("photo")) ||
    f.name.includes("image") ||
    f.name.includes("logo") ||
    f.name.includes("photo");

  if (isImageField) {
    return (
      <ImageUploader
        name={f.name}
        defaultValue={strVal}
        label={f.label}
        help={f.help}
        required={f.required}
      />
    );
  }

  return (
    <div className="field">
      {f.type === "checkbox" ? (
        <label className="checkbox-label" htmlFor={id}>
          <input
            id={id}
            type="checkbox"
            name={f.name}
            defaultChecked={Boolean(value)}
          />
          <span>{f.label}</span>
        </label>
      ) : (
        <>
          <label htmlFor={id}>
            {f.label} {f.required && <span style={{ color: "var(--danger)" }}>*</span>}
          </label>

          {f.type === "textarea" ? (
            <textarea
              id={id}
              name={f.name}
              defaultValue={strVal}
              required={f.required}
              placeholder={f.help}
              rows={4}
            />
          ) : f.type === "select" && f.options ? (
            <select id={id} name={f.name} defaultValue={strVal} required={f.required}>
              <option value="">— Select an option —</option>
              {f.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={id}
              name={f.name}
              type={f.type === "number" ? "number" : "text"}
              defaultValue={strVal}
              required={f.required}
              placeholder={f.help}
            />
          )}
        </>
      )}

      {f.help && f.type !== "textarea" && <small>{f.help}</small>}
    </div>
  );
}

export default function ResourceForm({
  fields,
  values,
  resourceKey,
  resourceId,
  action,
  cancelHref,
}: {
  fields: Field[];
  values: Record<string, string | number>;
  resourceKey: string;
  resourceId: string;
  action: (prev: string | null, form: FormData) => Promise<string | null>;
  cancelHref?: string;
}) {
  const [msg, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="card" style={{ maxWidth: 860 }}>
      {/* Hidden identification fields */}
      <input type="hidden" name="__resource_key" value={resourceKey} />
      <input type="hidden" name="__resource_id" value={resourceId} />

      {msg && (
        <div className={`msg-banner ${msg === "Saved." ? "ok" : "err"}`}>
          {msg === "Saved." ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{msg}</span>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 4 }}>
        {fields.map((f) => (
          <FieldInput key={f.name} f={f} value={values[f.name]} />
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--hairline)" }}>
        <button type="submit" className="btn" disabled={pending}>
          <Save size={16} />
          <span>{pending ? "Saving Changes…" : "Save Changes"}</span>
        </button>

        {cancelHref && (
          <Link href={cancelHref} className="btn ghost">
            <X size={15} />
            <span>Cancel</span>
          </Link>
        )}
      </div>
    </form>
  );
}
