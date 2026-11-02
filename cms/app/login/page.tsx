"use client";

import { useActionState } from "react";
import Image from "next/image";
import { login } from "@/lib/actions";
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [error, action, pending] = useActionState(login, null);

  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="login-header">
          <Image
            src="/logo.png"
            alt="Densmile Dental Clinic"
            width={160}
            height={44}
            priority
            style={{ objectFit: "contain", height: 42, width: "auto" }}
          />
          <h1>Clinical Administration Portal</h1>
          <p>Sign in to manage patient appointments, dental services, and site content.</p>
        </div>

        <form action={action}>
          {error && (
            <div className="msg-banner err">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email Address</label>
            <div style={{ position: "relative" }}>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="username"
                placeholder="admin@densmiledental.co.ke"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn"
            disabled={pending}
            style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
          >
            <span>{pending ? "Authenticating…" : "Sign In to Portal"}</span>
            {!pending && <ArrowRight size={16} />}
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              marginTop: 24,
              paddingTop: 18,
              borderTop: "1px solid var(--hairline-soft)",
              fontSize: 12,
              color: "var(--muted)",
            }}
          >
            <ShieldCheck size={14} style={{ color: "var(--teal)" }} />
            <span>Encrypted Healthcare Session · Authorized Personnel Only</span>
          </div>
        </form>
      </div>
    </div>
  );
}
