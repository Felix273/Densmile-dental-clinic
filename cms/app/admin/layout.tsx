import Link from "next/link";
import Image from "next/image";
import { logout } from "@/lib/actions";
import { RESOURCES } from "@/lib/resources";
import { queryOne } from "@/lib/db";
import {
  LayoutDashboard,
  CalendarCheck,
  Stethoscope,
  Award,
  Image as ImageIcon,
  ShieldCheck,
  Users,
  MessageSquareQuote,
  HelpCircle,
  Settings,
  ExternalLink,
  LogOut,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let newAppts = 0;
  try {
    const res = await queryOne<{ c: number }>("SELECT COUNT(*) c FROM appointments WHERE status='new'");
    newAppts = res?.c ?? 0;
  } catch {
    newAppts = 0;
  }

  const getResourceIcon = (key: string) => {
    switch (key) {
      case "services":
        return <Stethoscope size={18} />;
      case "pillars":
        return <Award size={18} />;
      case "gallery":
        return <ImageIcon size={18} />;
      case "partners":
        return <ShieldCheck size={18} />;
      case "team":
        return <Users size={18} />;
      case "testimonials":
        return <MessageSquareQuote size={18} />;
      case "faqs":
        return <HelpCircle size={18} />;
      default:
        return <Stethoscope size={18} />;
    }
  };

  return (
    <div className="shell">
      <nav className="side">
        <div className="brand">
          <Image
            src="/logo.png"
            alt="Densmile CMS"
            width={120}
            height={34}
            style={{ objectFit: "contain", height: 32, width: "auto" }}
          />
          <div className="brand-text">
            <b>Densmile</b>
            <span>Clinical CMS</span>
          </div>
        </div>

        <div className="nav-section-title">Overview</div>
        <Link href="/admin" className="nav-item">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>

        <Link href="/admin/appointments" className="nav-item">
          <CalendarCheck size={18} />
          <span>Appointments</span>
          {newAppts > 0 && <span className="nav-badge">{newAppts}</span>}
        </Link>

        <div className="nav-section-title">Clinical & Content</div>
        {RESOURCES.map((r) => (
          <Link key={r.key} href={`/admin/${r.key}`} className="nav-item">
            {getResourceIcon(r.key)}
            <span>{r.label}</span>
          </Link>
        ))}

        <div className="nav-section-title">Configuration</div>
        <Link href="/admin/settings" className="nav-item">
          <Settings size={18} />
          <span>Site Settings</span>
        </Link>

        <div className="side-footer">
          <a
            href="https://densmile-dental-clinic-k3fgiwije-fel-inc-africa.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-item"
            style={{ color: "#38bdf8" }}
          >
            <ExternalLink size={18} />
            <span>View Public Website</span>
          </a>

          <form action={logout}>
            <button
              className="btn ghost sm"
              style={{
                width: "100%",
                justifyContent: "flex-start",
                color: "#94a3b8",
                borderColor: "rgba(255,255,255,0.12)",
                padding: "8px 14px",
              }}
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </nav>

      <main className="main">{children}</main>
    </div>
  );
}
