import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getContent } from "@/lib/cms";
import {
  DentalServiceIcon,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Phone,
  ShieldCheck,
  Clock,
  Sparkles,
} from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sv = (await getContent()).services.find((x) => x.slug === slug);
  return sv
    ? {
        title: `${sv.title} | Densmile Dental Clinic`,
        description: sv.summary,
      }
    : {};
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const { services, settings: s } = await getContent();
  const sv = services.find((x) => x.slug === slug);
  if (!sv) notFound();

  const phoneClean = (s.phone || "+254 712 345 678").replace(/\s/g, "");

  // Clinical procedure steps
  const steps = [
    {
      num: "01",
      title: "Comprehensive Digital Assessment",
      desc: "Detailed diagnostic evaluation utilizing intraoral cameras and 3D digital imaging to assess your oral health without discomfort.",
    },
    {
      num: "02",
      title: "Gentle Precision Treatment",
      desc: "Carried out with computer-controlled gentle anaesthesia, micro-invasive techniques, and state-of-the-art sterile clinical equipment.",
    },
    {
      num: "03",
      title: "Personalized Maintenance & Review",
      desc: "Clear aftercare guidance, preventative wellness coaching, and scheduled follow-ups to ensure long-term smile vitality.",
    },
  ];

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* Top Banner / Breadcrumb */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid var(--hairline)", padding: "18px 0" }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--muted)" }}>
            <Link href="/" style={{ color: "var(--primary)", fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <Link href="/#services" style={{ color: "var(--primary)", fontWeight: 600 }}>Services</Link>
            <span>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 600 }}>{sv.title}</span>
          </div>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 48, alignItems: "start" }}>
            {/* Left Main Clinical Content */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 16,
                    background: "var(--primary-soft)",
                    color: "var(--primary)",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid var(--primary-border)",
                  }}
                >
                  <DentalServiceIcon name={sv.icon || sv.slug} size={30} />
                </div>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 4 }}>Clinical Specialty</div>
                  <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>{sv.title}</h1>
                </div>
              </div>

              <p className="lead" style={{ fontSize: 18, marginBottom: 32 }}>
                {sv.summary}
              </p>

              {/* Service Hero Image */}
              <div
                style={{
                  position: "relative",
                  borderRadius: 24,
                  overflow: "hidden",
                  boxShadow: "var(--shadow-md)",
                  border: "1px solid var(--hairline)",
                  height: 380,
                  marginBottom: 36,
                }}
              >
                <Image
                  src={sv.image_url || "/img/clinic1.jpg"}
                  alt={sv.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>

              {/* Clinical Description */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 20,
                  padding: "32px",
                  border: "1px solid var(--hairline)",
                  boxShadow: "var(--shadow-sm)",
                  marginBottom: 36,
                }}
              >
                <h3 style={{ fontSize: 20, marginBottom: 16, color: "var(--navy)" }}>
                  Treatment Overview & Clinical Methodology
                </h3>
                <p style={{ color: "var(--body)", fontSize: 16, lineHeight: 1.7 }} className="pre">
                  {sv.description}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 16,
                    marginTop: 28,
                    paddingTop: 24,
                    borderTop: "1px solid var(--hairline)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle2 size={18} style={{ color: "var(--teal)" }} />
                    <span style={{ fontSize: 14, fontWeight: 600 }}>Pain-Free Anaesthesia</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle2 size={18} style={{ color: "var(--teal)" }} />
                    <span style={{ fontSize: 14, fontWeight: 600 }}>Digital 3D Diagnostics</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle2 size={18} style={{ color: "var(--teal)" }} />
                    <span style={{ fontSize: 14, fontWeight: 600 }}>Strict Hospital Hygiene</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle2 size={18} style={{ color: "var(--teal)" }} />
                    <span style={{ fontSize: 14, fontWeight: 600 }}>Insurance Accepted</span>
                  </div>
                </div>
              </div>

              {/* What to expect procedure steps */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 20,
                  padding: "32px",
                  border: "1px solid var(--hairline)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <h3 style={{ fontSize: 20, marginBottom: 24, color: "var(--navy)" }}>
                  What to Expect During Your Treatment
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {steps.map((st) => (
                    <div
                      key={st.num}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 20,
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: "var(--primary-soft)",
                          color: "var(--primary)",
                          fontWeight: 800,
                          fontSize: 16,
                          display: "grid",
                          placeItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        {st.num}
                      </div>
                      <div>
                        <h4 style={{ fontSize: 17, marginBottom: 6, color: "var(--ink)" }}>{st.title}</h4>
                        <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6 }}>{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sticky Booking & Price Card */}
            <div style={{ position: "sticky", top: 104 }}>
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--hairline)",
                  borderRadius: 24,
                  padding: 36,
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted-light)", fontWeight: 600 }}>
                    Estimated Investment
                  </span>
                  <div style={{ fontSize: 32, fontWeight: 800, color: "var(--navy)", marginTop: 4 }}>
                    {sv.price_from || "Consultation Based"}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>
                    Clear, transparent itemized quote provided before any procedure starts.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                  <Link
                    href={`/book?service=${encodeURIComponent(sv.title)}`}
                    className="btn lg"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <Calendar size={18} />
                    <span>Book This Treatment</span>
                  </Link>

                  <a
                    href={`tel:${phoneClean}`}
                    className="btn secondary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <Phone size={16} />
                    <span>Call To Inquire</span>
                  </a>
                </div>

                <div style={{ borderTop: "1px solid var(--hairline-soft)", paddingTop: 20 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>
                    Included With Your Appointment:
                  </h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    <li style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "var(--body)" }}>
                      <CheckCircle2 size={16} style={{ color: "var(--teal)" }} />
                      <span>Direct specialist consultation</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "var(--body)" }}>
                      <CheckCircle2 size={16} style={{ color: "var(--teal)" }} />
                      <span>Digital 3D & intraoral assessment</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "var(--body)" }}>
                      <CheckCircle2 size={16} style={{ color: "var(--teal)" }} />
                      <span>Insurance claim assistance</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "var(--body)" }}>
                      <CheckCircle2 size={16} style={{ color: "var(--teal)" }} />
                      <span>Personalized preventive maintenance plan</span>
                    </li>
                  </ul>
                </div>

                <div
                  style={{
                    background: "var(--teal-soft)",
                    borderRadius: 14,
                    padding: "16px",
                    marginTop: 24,
                    border: "1px solid var(--teal-border)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <ShieldCheck size={24} style={{ color: "var(--teal)", flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5, color: "var(--teal-hover)", fontWeight: 600 }}>
                    Accepted by AAR, CIC, KCB, MAKL, MUA & UAP Old Mutual
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
