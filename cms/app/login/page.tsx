"use client";

import { useActionState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { login } from "@/lib/actions";
import { ArrowRight, AlertCircle, ShieldCheck, CheckCircle2 } from "lucide-react";

function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  const searchParams = useSearchParams();
  const resetSuccess = searchParams.get("reset") === "success";

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

        {resetSuccess && (
          <div className="msg-banner ok" style={{ marginBottom: 16 }}>
            <CheckCircle2 size={16} />
            <span>Password updated successfully! Please sign in with your new password.</span>
          </div>
        )}

        <form action={action}>
          {error && (
            <div className="msg-banner err" style={{ marginBottom: 16 }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              placeholder="roysambu@densmiledentalclinic.co.ke"
            />
          </div>

          <div className="field">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label htmlFor="password" style={{ margin: 0 }}>Password</label>
              <Link
                href="/forgot-password"
                style={{ fontSize: 12.5, color: "var(--primary)", textDecoration: "none", fontWeight: 600 }}
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              style={{ marginTop: 6 }}
            />
          </div>

          <button
            type="submit"
            className="btn"
            disabled={pending}
            style={{ width: "100%", justifyContent: "center", marginTop: 12 }}
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="login-shell" />}>
      <LoginForm />
    </Suspense>
  );
}
