export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { getContent } from "@/lib/cms";
import {
  DentalServiceIcon,
  Sparkles,
  ShieldCheck,
  Star,
  CheckCircle2,
  ArrowRight,
  Phone,
  MapPin,
  Calendar,
  Zap,
  Clock,
  HeartHandshake,
  Microscope,
  ChevronDown,
  Building2,
  Award,
} from "@/components/icons";

export default async function Home() {
  const { settings: s, services, team, testimonials, faqs, partners, gallery, pillars, branches } = await getContent();

  const phoneClean = (s.phone || "+254 712 345 678").replace(/\s/g, "");

  const getPillarIcon = (iconKey?: string) => {
    const k = (iconKey || "").toLowerCase();
    if (k.includes("micro") || k.includes("3d")) return <Microscope size={26} />;
    if (k.includes("shield") || k.includes("insur")) return <ShieldCheck size={26} />;
    if (k.includes("heart") || k.includes("steril")) return <HeartHandshake size={26} />;
    return <Zap size={26} />;
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-content">
            <div className="eyebrow">
              <Sparkles size={14} />
              <span>{s.tagline || "Modern, Gentle & Pain-Free Dental Care"}</span>
            </div>

            <h1>
              Exceptional Dental Care for Your{" "}
              <span className="gradient">Confident Smile</span>
            </h1>

            <p className="lead">{s.hero_subtitle}</p>

            <div className="actions">
              <Link href="/book" className="btn lg">
                <Calendar size={18} />
                <span>Book an Appointment</span>
              </Link>
              <Link href="/#services" className="btn secondary lg">
                <span>Explore Treatments</span>
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

              {/* Floating review card */}
              <div className="floating-card top-right">
                <div className="floating-card-icon gold">
                  <Star size={22} fill="currentColor" />
                </div>
                <div className="floating-card-text">
                  <b>{s.hero_stat_rating || "4.9 / 5.0 Rating"}</b>
                  <span>{s.hero_stat_reviews || "Over 1,200+ happy smiles"}</span>
                </div>
              </div>

              {/* Floating reassurance card */}
              <div className="floating-card bottom-left">
                <div className="floating-card-icon">
                  <ShieldCheck size={22} />
                </div>
                <div className="floating-card-text">
                  <b>Certified Specialists</b>
                  <span>{s.hero_badge_reassurance || "KDA & ITI Accredited"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACCEPTED INSURANCE & PARTNERS */}
      <section className="partners-section">
        <div className="wrap">
          <div className="partners-header">
            <p>{s.insurance_banner_text || "Direct Cashless Settlement With Leading Insurance Providers"}</p>
          </div>
          <div className="partners-grid">
            {partners.map((p) => (
              <div key={p.id ?? p.name} className="partner-logo-item" title={p.name}>
                <Image
                  src={p.logo_url}
                  alt={p.name}
                  width={120}
                  height={50}
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE DENSMILE (4 PILLARS) */}
      

      {/* SERVICES SECTION */}
      <section className="section" id="services">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">
              <Sparkles size={14} />
              <span>{s.services_eyebrow || "Our Dental Specialties"}</span>
            </div>
            <h2>{s.services_title || "Comprehensive Dental Care for Every Smile"}</h2>
            <p className="lead">
              {s.services_subtitle || "From preventative dental hygiene to complex smile rehabilitation and clear aligners, our doctors use advanced protocols for lasting oral wellness."}
            </p>
          </div>

          <div className="services-grid">
            {services.map((sv) => (
              <Link key={sv.id} href={`/services/${sv.slug}`} className="service-card">
                <div className="service-image">
                  <Image
                    src={sv.image_url || "/img/clinic1.jpg"}
                    alt={sv.title}
                    width={400}
                    height={220}
                  />
                  <div className="service-icon-floating">
                    <DentalServiceIcon name={sv.icon || sv.slug} size={24} />
                  </div>
                </div>

                <div className="service-body">
                  <h3>{sv.title}</h3>
                  <p>{sv.summary}</p>

                  <div className="service-footer">
                    <div className="service-price">
                      <span className="label">Investment</span>
                      <span>
                        {sv.price_from
                          ? `${/^\d|^[A-Z]{3}\s/.test(sv.price_from) ? "From " : ""}${sv.price_from}`
                          : "Custom Plan"}
                      </span>
                    </div>

                    <span className="service-link">
                      <span>Details</span>
                      <ArrowRight size={15} />
                    </span>
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
            {(branches || []).map((b) => {
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

      {/* TEAM SECTION */}
      

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="section" id="testimonials">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow teal">
                <Star size={14} fill="currentColor" />
                <span>Patient Experiences</span>
              </div>
              <h2>What Our Patients Say</h2>
              <p className="lead">
                Real feedback from real individuals and families whose oral health and smiles we have had the privilege to look after.
              </p>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((t) => (
                <div key={t.id} className="testimonial-card">
                  <div className="stars-row" aria-label={`${t.rating} out of 5 stars`}>
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="testimonial-quote">“{t.quote}”</p>
                  <div className="testimonial-author">
                    <div className="author-avatar-placeholder">
                      {t.author.charAt(0)}
                    </div>
                    <div className="author-info">
                      <b>{t.author}</b>
                      <span>
                        <CheckCircle2 size={13} />
                        Verified Patient
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ SECTION */}
      {faqs.length > 0 && (
        <section className="section soft" id="faq">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">
                <ShieldCheck size={14} />
                <span>Frequently Asked Questions</span>
              </div>
              <h2>Clear Answers to Common Questions</h2>
              <p className="lead">
                Everything you need to know about preparing for your dental appointment, treatment expectations, and insurance coverage.
              </p>
            </div>

            <div className="faq-wrap">
              {faqs.map((f) => (
                <div key={f.id} className="faq-card">
                  <details>
                    <summary>
                      <span>{f.question}</span>
                      <div className="summary-icon">
                        <ChevronDown size={16} />
                      </div>
                    </summary>
                    <div className="faq-answer">
                      <p>{f.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CALL TO ACTION BANNER */}
      <section className="section">
        <div className="wrap">
          <div className="cta-banner">
            <h2>{s.cta_title || "Ready to Experience Pain-Free Dental Care?"}</h2>
            <p>
              {s.cta_subtitle || "Book your comprehensive oral consultation online in seconds, or speak directly with our clinic coordinator to schedule an appointment for you and your family."}
            </p>

            <div className="cta-banner-actions">
              <Link href="/book" className="btn lg" style={{ background: "#ffffff", color: "var(--navy)" }}>
                <Calendar size={18} />
                <span>Book Appointment Online</span>
              </Link>
              <a href={`tel:${phoneClean}`} className="btn lg secondary" style={{ background: "transparent", color: "#ffffff", borderColor: "rgba(255,255,255,0.4)" }}>
                <Phone size={18} />
                <span>Call {s.phone || "+254 712 345 678"}</span>
              </a>
            </div>

            <div className="cta-banner-badges">
              <div className="cta-badge">
                <CheckCircle2 size={16} />
                <span>Same-Day Emergency Slots</span>
              </div>
              <div className="cta-badge">
                <CheckCircle2 size={16} />
                <span>Zero Hidden Fees</span>
              </div>
              <div className="cta-badge">
                <CheckCircle2 size={16} />
                <span>Direct Insurance Claims</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
