"use client";

import { useActionState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { completePasswordReset } from "@/lib/actions";
import { Lock, AlertCircle, ArrowLeft } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [error, action, pending] = useActionState(completePasswordReset, null);

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
          <h1>Create New Password</h1>
          <p>Please enter your new portal access password below.</p>
        </div>

        {error && (
          <div className="msg-banner err" style={{ marginBottom: 16 }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {!token ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <p style={{ color: "var(--danger)", fontSize: 14 }}>Missing password reset token.</p>
            <Link href="/forgot-password" className="btn sm secondary" style={{ marginTop: 12 }}>
              Request a New Link
            </Link>
          </div>
        ) : (
          <form action={action}>
            <input type="hidden" name="token" value={token} />

            <div className="field">
              <label htmlFor="password">New Password (8+ characters)</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="••••••••••••"
              />
            </div>

            <div className="field">
              <label htmlFor="confirm_password">Confirm New Password</label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              className="btn"
              disabled={pending}
              style={{ width: "100%", justifyContent: "center", marginTop: 12 }}
            >
              <Lock size={15} style={{ marginRight: 6 }} />
              <span>{pending ? "Saving New Password…" : "Update Password & Sign In"}</span>
            </button>
          </form>
        )}

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link
            href="/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "var(--muted)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="login-shell" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
