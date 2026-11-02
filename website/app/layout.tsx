import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { getContent } from "@/lib/cms";
import {
  Phone,
  Clock,
  MapPin,
  Calendar,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  Mail,
} from "@/components/icons";

const font = Montserrat({
  subsets: ["latin"],
  variable: "--font",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { settings: s } = await getContent();
    return {
      title: {
        default: `${s.clinic_name} | ${s.tagline}`,
        template: `%s | ${s.clinic_name}`,
      },
      description: s.hero_subtitle,
    };
  } catch {
    return { title: "Densmile Dental Clinic & Implant Centre" };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent();
  const s = content.settings;

  const phoneRaw = s.phone || "+254 712 345 678";
  const phoneClean = phoneRaw.replace(/\s/g, "");
  const whatsappNum = (s.whatsapp || "254712345678").replace(/\D/g, "");

  return (
    <html lang="en" className={font.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Top Emergency & Info Bar */}
        <div className="topbar">
          <div className="wrap">
            <div className="topbar-items">
              <div className="badge-pulse">
                <span className="pulse-dot"></span>
                <span>{s.topbar_notice || "Accepting New Patients"}</span>
              </div>
              <div className="topbar-item">
                <MapPin size={13} style={{ color: "#38bdf8" }} />
                <span>{s.address ? s.address.split("\n")[0] : "Westlands, Nairobi"}</span>
              </div>
              <div className="topbar-item">
                <Clock size={13} style={{ color: "#38bdf8" }} />
                <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
              </div>
            </div>

            <div className="topbar-items">
              <div className="topbar-item">
                <Phone size={13} style={{ color: "#38bdf8" }} />
                <span>Emergency Helpline:</span>
                <a href={`tel:${phoneClean}`}>{s.emergency_helpline || phoneRaw}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Main Header */}
        <header className="header">
          <div className="wrap">
            <Link href="/" className="logo" aria-label="Densmile Dental Clinic Home">
              <Image
                src="/logo.png"
                alt={s.clinic_name || "Densmile Dental Clinic"}
                width={210}
                height={56}
                priority
                style={{ objectFit: "contain", height: 48, width: "auto" }}
              />
            </Link>

            <nav className="nav">
              <Link href="/#services">Services</Link>
              <Link href="/#why-us">Why Densmile</Link>
              <Link href="/#facility">Our Clinic</Link>
              <Link href="/#team">Specialists</Link>
              <Link href="/#faq">FAQ</Link>
              <Link href="/#contact">Contact</Link>
              <Link href="/book" className="btn sm">
                <Calendar size={15} />
                <span>Book Appointment</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main>{children}</main>

        {/* Global Footer */}
        <footer className="footer" id="contact">
          <div className="wrap">
            <div className="cols">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <Image
                    src="/logo.png"
                    alt={s.clinic_name}
                    width={180}
                    height={46}
                    style={{ background: "#ffffff", padding: "6px 12px", borderRadius: 8, height: 42, width: "auto" }}
                  />
                </div>
                <p style={{ marginTop: 12, fontSize: 14 }}>
                  {s.clinic_name} is Nairobi&apos;s centre of excellence for pain-free restorative, cosmetic, and surgical dentistry. Dedicated to sterile, gentle, and compassionate patient care.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18, color: "#38bdf8", fontSize: 13, fontWeight: 600 }}>
                  <ShieldCheck size={16} />
                  <span>Certified KDA & Hospital-Grade Autoclave Sterilization</span>
                </div>
              </div>

              <div>
                <h3>Quick Links</h3>
                <ul className="footer-nav-list">
                  <li><Link href="/#services">Dental Services</Link></li>
                  <li><Link href="/#why-us">The Densmile Difference</Link></li>
                  <li><Link href="/#facility">Clinic & Technology</Link></li>
                  <li><Link href="/#team">Meet the Dentists</Link></li>
                  <li><Link href="/#faq">Frequently Asked Questions</Link></li>
                  <li><Link href="/book">Book an Appointment</Link></li>
                </ul>
              </div>

              <div>
                <h3>Treatments</h3>
                <ul className="footer-nav-list">
                  <li><Link href="/services/general-checkups">Check-ups & Cleaning</Link></li>
                  <li><Link href="/services/teeth-whitening">Laser Teeth Whitening</Link></li>
                  <li><Link href="/services/braces-aligners">Clear Aligners & Braces</Link></li>
                  <li><Link href="/services/dental-implants">Dental Implants</Link></li>
                  <li><Link href="/services/root-canal">Root Canal Therapy</Link></li>
                  <li><Link href="/services/kids-dentistry">Children&apos;s Dentistry</Link></li>
                </ul>
              </div>

              <div>
                <h3>Contact & Hours</h3>
                <div className="footer-contact-list">
                  <div className="footer-contact-item">
                    <MapPin size={18} />
                    <p className="pre">{s.address || "4th Floor, The Pavilion, Westlands\nNairobi, Kenya"}</p>
                  </div>
                  <div className="footer-contact-item">
                    <Phone size={18} />
                    <p><a href={`tel:${phoneClean}`}>{phoneRaw}</a></p>
                  </div>
                  <div className="footer-contact-item">
                    <Mail size={18} />
                    <p><a href={`mailto:${s.email || "care@densmiledental.co.ke"}`}>{s.email || "care@densmiledental.co.ke"}</a></p>
                  </div>
                  <div className="footer-contact-item">
                    <Clock size={18} />
                    <p className="pre">{s.hours || "Mon – Fri: 8:00 AM – 6:00 PM\nSat: 9:00 AM – 4:00 PM\nSun: Emergencies Only"}</p>
                  </div>
                </div>
              </div>
            </div>

            {s.map_url && (
              <div className="footer-map">
                <iframe
                  src={s.map_url}
                  title="Densmile Dental Clinic Location Map"
                  loading="lazy"
                  style={{ border: 0, width: "100%", height: 260, display: "block" }}
                />
              </div>
            )}

            <div className="footer-bottom">
              <p className="footer-legal">
                © {new Date().getFullYear()} {s.clinic_name}. All rights reserved. Registered Healthcare Facility in Kenya.
              </p>
              <div style={{ display: "flex", gap: 20, fontSize: 13 }}>
                <Link href="/book" style={{ color: "#38bdf8", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <span>Online Consultations</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp Quick Action */}
        <a
          className="floating-whatsapp"
          href={`https://wa.me/${whatsappNum}?text=Hello%20Densmile%20Dental%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20dental%20appointment.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Densmile on WhatsApp"
        >
          <MessageCircle size={18} />
          <span>Chat on WhatsApp</span>
        </a>
      </body>
    </html>
  );
}
