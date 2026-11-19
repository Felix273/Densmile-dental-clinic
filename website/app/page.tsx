"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getContent, type Content } from "@/lib/cms";
import {
  DentalServiceIcon,
  Sparkles,
  ShieldCheck,
  Star,
  CheckCircle2,
  ArrowRight,
  Phone,
  Calendar,
  Zap,
  Clock,
  HeartHandshake,
  Microscope,
  ChevronDown,
  Building2,
  Award,
  MapPin,
} from "@/components/icons";

const CMS_API = "https://densmile-cms.netlify.app/api/public/content";

export default function Home() {
  const [content, setContent] = useState<Content | null>(null);

  // 1. Load initial pre-rendered content immediately, then fetch latest from CMS
  useEffect(() => {
    getContent().then(setContent);

    fetch(CMS_API)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.settings) {
          setContent((prev) => (prev ? { ...prev, ...data } : data));
        }
      })
      .catch((err) => console.warn("Live CMS sync fallback:", err));
  }, []);

  if (!content) {
    return <div style={{ minHeight: "100vh", background: "#ffffff" }} />;
  }

  const s = content.settings;
  const services = content.services || [];
  const testimonials = content.testimonials || [];
  const faqs = content.faqs || [];
  const partners = content.partners || [];
  const gallery = content.gallery || [];
  const branches = content.branches || [];

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-content">
            <div className="eyebrow">
              <Sparkles size={14} />
              <span>{s.tagline || "KITENGELA · ROYSAMBU"}</span>
            </div>

            <h1>
              {s.hero_title ? (
                s.hero_title
              ) : (
                <>
                  We care for your smile; <span className="gradient">your smile says it all.</span>
                </>
              )}
            </h1>

            <p className="lead">{s.hero_subtitle}</p>

            <div className="actions">
              <Link href="/book" className="btn lg">
                <Calendar size={18} />
                <span>Book an Appointment</span>
              </Link>
              <Link href="#branches" className="btn secondary lg">
                <span>Find a Branch</span>
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="hero-highlights">
              <div className="hero-highlight-item">
                <div className="hero-highlight-icon">
                  <Zap size={18} />
                </div>
                <div className="hero-highlight-text">
                  <b>Painless Anaesthesia</b>
                  <span>Gentle, anxiety-free comfort</span>
                </div>
              </div>

              <div className="hero-highlight-item">
                <div className="hero-highlight-icon">
                  <ShieldCheck size={18} />
                </div>
                <div className="hero-highlight-text">
                  <b>Direct Insurance Billing</b>
                  <span>Cashless claims handled</span>
                </div>
              </div>

              <div className="hero-highlight-item">
                <div className="hero-highlight-icon">
                  <Clock size={18} />
                </div>
                <div className="hero-highlight-text">
                  <b>Zero Wait Guarantee</b>
                  <span>Strictly on-time appointments</span>
                </div>
              </div>

              <div className="hero-highlight-item">
                <div className="hero-highlight-icon">
                  <Award size={18} />
                </div>
                <div className="hero-highlight-text">
                  <b>Specialist Dentists</b>
                  <span>Over 14 years clinical experience</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <Image
                src={s.hero_image || "/img/clinic1.jpg"}
                alt="Densmile Modern Dental Clinic"
                width={600}
                height={700}
                priority
              />

              <div className="floating-card top-right">
                <div className="floating-card-icon gold">
                  <Star size={16} />
                </div>
                <div className="floating-card-text">
                  <b>{s.hero_stat_rating || "5.0 ★ Rating"}</b>
                  <span>{s.hero_stat_reviews || "Over 1,200+ happy smiles"}</span>
                </div>
              </div>

              <div className="floating-card bottom-left">
                <div className="floating-card-icon teal">
                  <ShieldCheck size={16} />
                </div>
                <div className="floating-card-text">
                  <b>Certified Specialists</b>
                  <span>{s.hero_badge_reassurance || "Kitengela & Roysambu Branches"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DENTAL SERVICES SECTION */}
      <section className="section" id="services">
        <div className="wrap">
          <div className="section-head">
            <h2>Our Services</h2>
            <p className="lead">Comprehensive, modern dental treatments tailored for adults and children.</p>
          </div>

          <div className="services-grid">
            {services.map((sv) => (
              <Link key={sv.id} href={`/services/${sv.slug}`} className="service-card">
                <div className="service-image">
                  <Image
                    src={sv.image_url || "/img/exam.jpg"}
                    alt={sv.title}
                    width={400}
                    height={220}
                  />
                  <div className="service-icon-floating">
                    <DentalServiceIcon name={sv.icon} size={22} />
                  </div>
                </div>

                <div className="service-content">
                  <div className="service-meta">
                    <span className="price-tag">{sv.price_from}</span>
                  </div>
                  <h3>{sv.title}</h3>
                  <p>{sv.summary}</p>

                  <div className="service-link">
                    <span>Learn More</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OUR BRANCHES */}
      <section className="section" id="branches">
        <div className="wrap">
          <div className="section-head">
            <h2>Our Branches</h2>
            <p className="lead">Visit us at the branch nearest to you.</p>
          </div>

          <div className="branches-grid">
            {branches.map((b) => {
              const waClean = (b.whatsapp || b.phone || "").replace(/\D/g, "");
              const phoneClean = (b.phone || "").replace(/\s/g, "");

              return (
                <div key={b.id} className="branch-card">
                  <div className="branch-header">
                    <span className="branch-tag">Densmile Branch</span>
                    <h3 className="branch-title">{b.name}</h3>
                  </div>

                  <div className="branch-body">
                    <div className="branch-detail">
                      <div className="branch-icon-wrap">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <div className="branch-line1">{b.building}</div>
                        {b.room && <div className="branch-line2">{b.room}</div>}
                      </div>
                    </div>

                    <div className="branch-detail">
                      <div className="branch-icon-wrap">
                        <Phone size={18} />
                      </div>
                      <a href={`tel:${phoneClean}`} className="branch-phone">
                        {b.phone}
                      </a>
                    </div>

                    <div className="branch-actions">
                      <a href={`tel:${phoneClean}`} className="branch-btn call">
                        <Phone size={14} style={{ marginRight: 6 }} />
                        <span>Call</span>
                      </a>

                      <a
                        href={`https://wa.me/${waClean}?text=Hello%20Densmile%20${encodeURIComponent(b.name)}%20Branch,%20I%20would%20like%20to%20inquire%20about%20an%20appointment.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="branch-btn whatsapp"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: 6 }}>
                          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.27-2.42 5.82a8.19 8.19 0 01-5.82 2.42c-1.48 0-2.93-.39-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 01-1.25-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.78 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.31z"/>
                        </svg>
                        <span>WhatsApp</span>
                      </a>

                      <a
                        href={b.map_url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="branch-btn directions"
                      >
                        <MapPin size={14} style={{ marginRight: 6 }} />
                        <span>Directions</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="section" id="about">
        <div className="wrap">
          <div className="about-wrap">
            <div>
              <div className="eyebrow">
                <HeartHandshake size={14} />
                <span>{s.about_eyebrow || "About Densmile Clinic"}</span>
              </div>
              <h2>{s.about_title || "Care That Feels Personal, Safe & Honest"}</h2>
              <p className="lead">{s.about}</p>

              <div className="about-badge-list">
                <div className="about-badge-item">
                  <CheckCircle2 size={18} />
                  <span>{s.about_point_1 || "Licensed by the Kenya Medical Practitioners and Dentists Council (KMPDC)"}</span>
                </div>
                <div className="about-badge-item">
                  <CheckCircle2 size={18} />
                  <span>{s.about_point_2 || "Low-radiation digital panoramic 3D imaging & intraoral cameras"}</span>
                </div>
                <div className="about-badge-item">
                  <CheckCircle2 size={18} />
                  <span>{s.about_point_3 || "Flexible financing and cashless direct health insurance billing"}</span>
                </div>
              </div>
            </div>

            <div>
              <div style={{ position: "relative", borderRadius: 22, overflow: "hidden", boxShadow: "0 16px 40px -10px rgba(0,0,0,0.14)", height: 380, width: "100%", background: "#f1f5f9" }}>
                <Image
                  src={s.about_image || "/img/team.jpg"}
                  alt={s.clinic_name || "Densmile Dental Care Team"}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  style={{ objectFit: "cover", display: "block" }}
                />
              </div>

              <div className="about-stats" style={{ marginTop: 20 }}>
                <div className="about-stat-card">
                  <b>{s.about_stat_1_val || "5+"}</b>
                  <span>{s.about_stat_1_lbl || "Specialties"}</span>
                </div>
                <div className="about-stat-card">
                  <b>{s.about_stat_2_val || "3"}</b>
                  <span>{s.about_stat_2_lbl || "Senior Dentists"}</span>
                </div>
                <div className="about-stat-card">
                  <b>{s.about_stat_3_val || "5.0★"}</b>
                  <span>{s.about_stat_3_lbl || "Patient Rating"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PATIENT TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="section" id="testimonials">
          <div className="wrap">
            <div className="section-head">
              <h2>What Our Patients Say</h2>
              <p className="lead">Honest reviews from patients treated at our Kitengela and Roysambu clinics.</p>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((t) => (
                <div key={t.id} className="testimonial-card">
                  <div className="stars">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} size={16} fill="var(--gold)" color="var(--gold)" />
                    ))}
                  </div>
                  <p className="testimonial-quote">“{t.quote}”</p>
                  <b className="testimonial-author">{t.author}</b>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQS */}
      {faqs.length > 0 && (
        <section className="section soft" id="faq">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div className="section-head">
              <h2>Frequently Asked Questions</h2>
              <p className="lead">Clear answers to help you prepare for your consultation.</p>
            </div>

            <div className="faqs-list">
              {faqs.map((f) => (
                <details key={f.id} className="faq-item">
                  <summary className="faq-question">
                    <span>{f.question}</span>
                    <ChevronDown size={18} className="faq-chevron" />
                  </summary>
                  <p className="faq-answer">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <section className="section">
        <div className="wrap">
          <div className="cta-banner">
            <h2>{s.cta_title || "Ready to Experience Pain-Free Dental Care?"}</h2>
            <p>{s.cta_subtitle || "Book your appointment at our Kitengela or Roysambu branch online in seconds."}</p>

            <div className="cta-banner-actions">
              <Link href="/book" className="btn lg" style={{ background: "#ffffff", color: "var(--primary)", fontWeight: 700 }}>
                <Calendar size={18} />
                <span>Book an Appointment</span>
              </Link>
              <a href="tel:0790330294" className="btn lg secondary" style={{ borderColor: "#ffffff", color: "#ffffff" }}>
                <Phone size={18} />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
