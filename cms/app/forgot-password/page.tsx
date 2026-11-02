"use client";

import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { requestPasswordReset } from "@/lib/actions";
import { ArrowLeft, Mail, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [msg, action, pending] = useActionState(requestPasswordReset, null);

  const isOk = msg && msg.includes("dispatched");

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
          <h1>Reset Portal Password</h1>
          <p>Enter your clinic email address and we will dispatch a secure reset link.</p>
        </div>

        {msg && (
          <div className={`msg-banner ${isOk ? "ok" : "err"}`} style={{ marginBottom: 16 }}>
            {isOk ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{msg}</span>
          </div>
        )}

        <form action={action}>
          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="roysambu@densmiledentalclinic.co.ke"
            />
          </div>

          <button
            type="submit"
            className="btn"
            disabled={pending}
            style={{ width: "100%", justifyContent: "center", marginTop: 12 }}
          >
            <Mail size={16} style={{ marginRight: 6 }} />
            <span>{pending ? "Dispatching Email…" : "Send Reset Link"}</span>
          </button>

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
        </form>
      </div>
    </div>
  );
}
