export interface Branch {
  id: number;
  name: string;
  building: string;
  room: string;
  phone: string;
  whatsapp: string;
  map_url: string;
  sort?: number;
}

export interface Settings {
  [key: string]: string;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: string;
  price_from: string;
  image_url: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image_url: string;
}

export interface Testimonial {
  id: number;
  author: string;
  quote: string;
  rating: number;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
}

export interface Partner {
  id: number;
  name: string;
  logo_url: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  is_featured: number;
}

export interface Pillar {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Content {
  settings: Settings;
  services: Service[];
  team: TeamMember[];
  testimonials: Testimonial[];
  faqs: Faq[];
  partners: Partner[];
  gallery: GalleryItem[];
  pillars: Pillar[];
  branches: Branch[];
}

export const CMS_URL = process.env.CMS_URL || "https://densmile-cms.vercel.app";

const DEFAULT_CONTENT: Content = {
  settings: {
    clinic_name: "Densmile Dental Clinic & Implant Centre",
    tagline: "Modern, Gentle & Pain-Free Dental Care",
    hero_title: "World-Class Dental Care for Your Confident Smile",
    hero_subtitle:
      "Experience comfortable, pain-free dentistry with Kenya’s leading dental specialists. From routine hygiene and clear aligners to complex dental implants, we care for your smile with precision and warmth.",
    hero_image: "/img/clinic1.jpg",
    hero_stat_rating: "4.9 / 5.0 Rating",
    hero_stat_reviews: "Over 1,200+ happy smiles",
    hero_badge_reassurance: "KDA & ITI Accredited",
    why_us_eyebrow: "The Densmile Difference",
    why_us_title: "Modern Dentistry Built Around Your Comfort",
    why_us_subtitle: "We have eliminated the cold, clinical feel of traditional dental visits. Our practice combines warmth, cutting-edge technology, and compassionate specialist care.",
    facility_eyebrow: "Inside Our Clinic",
    facility_title: "Designed for Peace of Mind & Precision",
    facility_subtitle: "Take a tour inside our purpose-built Nairobi clinic. Designed with serene natural lighting, sterile surgical suites, and state-of-the-art diagnostic instruments.",
    insurance_banner_text: "Direct Cashless Settlement With Leading Insurance Providers",
    about:
      "At Densmile Dental Clinic, we believe a trip to the dentist should feel reassuring, painless, and empowering. Based in Nairobi, our clinic combines state-of-the-art 3D digital imaging, gentle micro-dentistry techniques, and a compassionate team committed to creating healthy, radiant smiles for adults and children alike.",
    about_stat_smiles: "15,000+",
    about_stat_years: "14+",
    about_stat_rating: "5.0★",
    cta_title: "Ready to Experience Pain-Free Dental Care?",
    cta_subtitle: "Book your comprehensive oral consultation online in seconds, or speak directly with our clinic coordinator to schedule an appointment for you and your family.",
    phone: "+254 712 345 678",
    emergency_helpline: "+254 712 345 678",
    whatsapp: "254712345678",
    email: "care@densmiledental.co.ke",
    address: "4th Floor, The Pavilion, Westlands\nNairobi, Kenya",
    map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.825867975416!2d36.8041838749666!3d-1.2783852987094255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173849767355%3A0xe8447d24d9c02ff5!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske",
    hours: "Mon – Fri: 8:00 AM – 6:00 PM\nSat: 9:00 AM – 4:00 PM\nSunday & Public Holidays: By Emergency Appointment",
    topbar_notice: "Accepting New Patients",
    instagram: "https://instagram.com/densmiledental",
    facebook: "https://facebook.com/densmiledental",
  },
  services: [
    {
      id: 1,
      slug: "general-checkups",
      title: "Check-ups & Cleaning",
      summary: "Comprehensive oral exam, digital X-rays, ultrasonic scaling, and gentle polishing.",
      description: "Our preventative check-ups go beyond basic cleaning. We utilize low-radiation digital imaging and intraoral cameras to inspect tooth structure, evaluate gum health, and remove stubborn plaque using gentle ultrasonic airflow technology.",
      icon: "checkup",
      price_from: "KES 2,500",
      image_url: "/img/exam.jpg",
    },
    {
      id: 2,
      slug: "teeth-whitening",
      title: "Teeth Whitening",
      summary: "In-office professional LED laser whitening achieving up to 8 shades brighter in 60 minutes.",
      description: "Lift deep stains from coffee, tea, and everyday aging safely. Our clinic-grade dental whitening uses enamel-safe hydrogen peroxide activated by targeted cool-light LED technology, ensuring minimal to zero tooth sensitivity while delivering vibrant results.",
      icon: "whitening",
      price_from: "KES 12,000",
      image_url: "/img/aligner.jpg",
    },
    {
      id: 3,
      slug: "braces-aligners",
      title: "Braces & Clear Aligners",
      summary: "Custom clear aligners and modern ceramic braces to straighten teeth discreetly.",
      description: "Achieve the straight smile you have always wanted without bulky metal brackets. Through 3D digital smile simulation, you can see your projected before-and-after results before treatment even begins.",
      icon: "ortho",
      price_from: "Consultation",
      image_url: "/img/aligner.jpg",
    },
    {
      id: 4,
      slug: "dental-implants",
      title: "Dental Implants",
      summary: "Permanent, titanium-rooted tooth replacements that look, feel, and function like natural teeth.",
      description: "The gold standard in restoring missing teeth. Our implantology team utilizes computer-guided 3D surgical placement for maximum precision, painless healing, and natural aesthetics that preserve your jawbone and facial structure.",
      icon: "implant",
      price_from: "Consultation",
      image_url: "/img/xray.jpg",
    },
    {
      id: 5,
      slug: "root-canal",
      title: "Root Canal Therapy",
      summary: "Gentle, microscope-assisted endodontic therapy designed to relieve pain and save natural teeth.",
      description: "Root canals at Densmile are virtually pain-free. Modern rotary instruments and localized micro-anaesthesia allow us to thoroughly cleanse infected pulp tissue and seal canals in comfortable visits.",
      icon: "root-canal",
      price_from: "KES 8,000",
      image_url: "/img/clinic2.jpg",
    },
    {
      id: 6,
      slug: "kids-dentistry",
      title: "Children’s Dentistry",
      summary: "Warm, patient-centred dentistry created to make kids feel confident, excited, and safe.",
      description: "Our friendly pediatric protocol focuses on positive experiences, preventive fluoride varnishes, fissure sealants, and gentle dental education that sets your child up for a lifetime of fearless dental care.",
      icon: "pediatric",
      price_from: "KES 2,000",
      image_url: "/img/consult.jpg",
    },
  ],
  team: [
    {
      id: 1,
      name: "Dr. Jane Wanjiru",
      role: "BDS, MSc (London) — Clinical Director & Lead Dentist",
      bio: "Over 14 years of advanced clinical practice in aesthetic smile design, restorative dentistry, and patient anxiety management. Member of KDA and ITI.",
      image_url: "/img/team.jpg",
    },
    {
      id: 2,
      name: "Dr. Peter Otieno",
      role: "BDS, MOrth RCSEd — Specialist Orthodontist & Aligner Provider",
      bio: "Board-certified orthodontic specialist with over a decade of experience crafting balanced smiles using clear aligners and modern braces.",
      image_url: "/img/consult.jpg",
    },
    {
      id: 3,
      name: "Dr. Faith Mutua",
      role: "BDS, Dip. Paed — Pediatric Dental Surgeon",
      bio: "Passionate about gentle childhood dentistry, preventive treatments, and creating stress-free dental visits for young families.",
      image_url: "/img/clinic1.jpg",
    },
  ],
  testimonials: [
    {
      id: 1,
      author: "Amina K. (Westlands, Nairobi)",
      quote: "I had avoided the dentist for over 4 years because of dental phobia. Dr. Jane and the nurse were remarkably calm, explained every step, and the treatment was 100% painless. Densmile changed my life!",
      rating: 5,
    },
    {
      id: 2,
      author: "Brian M. (Kilimani)",
      quote: "Our entire family receives care here, from our 6-year-old twin daughters to my mother. The pediatric room is fantastic, and scheduling appointments around work has never been easier.",
      rating: 5,
    },
    {
      id: 3,
      author: "Grace N. (Lavington)",
      quote: "Did in-office laser whitening before my wedding reception. The results exceeded all my expectations — lifted 7 shades in 50 minutes without any sensitivity. Highly recommended!",
      rating: 5,
    },
    {
      id: 4,
      author: "David O. (Karen)",
      quote: "Getting my single tooth implant done here was seamless. From the 3D CBCT scan to the final crown fitting, everything was digital, precise, and transparent with my insurance coverage.",
      rating: 5,
    },
  ],
  faqs: [
    {
      id: 1,
      question: "How often should I visit the dentist?",
      answer: "We recommend a routine dental examination and professional scaling every 6 months. For patients undergoing orthodontic treatment or with a history of periodontal gum concerns, our clinicians may recommend 3 to 4-month maintenance visits.",
    },
    {
      id: 2,
      question: "Is teeth whitening safe?",
      answer: "Absolutely. In-office laser whitening at Densmile is conducted under direct clinical supervision with gum barrier protection. Our high-grade whitening agents hydrate the enamel, keeping treatment safe and virtually sensitivity-free.",
    },
    {
      id: 3,
      question: "Do you accept insurance?",
      answer: "Yes! We offer direct cashless settlement for leading insurance providers in Kenya, including AAR, CIC Insurance, KCB, MAKL, MUA, and UAP Old Mutual. Our desk assists with pre-authorization before your procedure.",
    },
    {
      id: 4,
      question: "What should I do in a dental emergency?",
      answer: "If you experience severe toothache, a broken crown, or a knocked-out tooth, contact our emergency helpline immediately at +254 712 345 678. We provide prioritized same-day emergency slots to relieve pain promptly.",
    },
    {
      id: 5,
      question: "Are dental treatments painful at Densmile?",
      answer: "No. We pride ourselves on painless dental care. We use topical numbing gels prior to gentle computer-assisted local anaesthesia, ensuring you feel completely numb and relaxed throughout your visit.",
    },
  ],
  partners: [
    { id: 1, name: "AAR Insurance", logo_url: "/partners/AAR.png" },
    { id: 2, name: "CIC Group", logo_url: "/partners/CIC-800x450.webp" },
    { id: 3, name: "KCB Healthcare", logo_url: "/partners/KCB.png" },
    { id: 4, name: "MAKL", logo_url: "/partners/makl.png" },
    { id: 5, name: "MUA Insurance", logo_url: "/partners/MUA.webp" },
    { id: 6, name: "UAP Old Mutual", logo_url: "/partners/uap.png" },
  ],
  gallery: [
    { id: 1, title: "Modern Ergonomic Operatory", image_url: "/img/clinic1.jpg", is_featured: 1 },
    { id: 2, title: "3D Digital Panoramic & CBCT Imaging", image_url: "/img/xray.jpg", is_featured: 0 },
    { id: 3, title: "Serene & Relaxing Patient Lounge", image_url: "/img/room.jpg", is_featured: 0 },
    { id: 4, title: "Private Treatment Planning Suite", image_url: "/img/consult.jpg", is_featured: 1 },
  ],
    branches: [
    {
      id: 1,
      name: "Kitengela",
      building: "Orok Business Centre",
      room: "1st Floor, Room 1 & 2",
      phone: "0790 330 294",
      whatsapp: "254790330294",
      map_url: "https://maps.google.com/?q=Orok+Business+Centre+Kitengela",
    },
    {
      id: 2,
      name: "Roysambu",
      building: "Jewel Complex",
      room: "1st Floor, Room 108",
      phone: "0714 518 185",
      whatsapp: "254714518185",
      map_url: "https://maps.google.com/?q=Jewel+Complex+Roysambu",
    },
  ],
  pillars: [
    {
      id: 1,
      title: "100% Pain-Free Philosophy",
      description: "Computer-regulated local anaesthesia, gentle topical numbing gels, and calming amenities ensure your visit is completely anxiety-free.",
      icon: "zap",
      color: "primary",
    },
    {
      id: 2,
      title: "Advanced 3D Digital Dentistry",
      description: "High-definition digital intraoral scanners eliminate messy impression trays, paired with ultra-low radiation 3D CBCT imaging.",
      icon: "microscope",
      color: "teal",
    },
    {
      id: 3,
      title: "Direct Insurance Billing",
      description: "Seamless cashless pre-authorizations with leading Kenyan healthcare insurers so you can focus entirely on your wellness.",
      icon: "shield",
      color: "primary",
    },
    {
      id: 4,
      title: "Hospital-Grade Sterilization",
      description: "Class-B autoclave sterilization exceeding CDC and Kenya Dental Association clinical infection control guidelines.",
      icon: "heart",
      color: "teal",
    },
  ],
};

export async function getContent(): Promise<Content> {
  try {
    const res = await fetch(`${CMS_URL}/api/public/content`, {
      
      cache: "no-store",
    });
    if (!res.ok) {
      console.warn(`CMS responded ${res.status}, using default content`);
      return DEFAULT_CONTENT;
    }
    const data = await res.json();
    return {
      settings: { ...DEFAULT_CONTENT.settings, ...(data.settings || {}) },
      services: data.services && data.services.length > 0 ? data.services : DEFAULT_CONTENT.services,
      team: data.team && data.team.length > 0 ? data.team : DEFAULT_CONTENT.team,
      testimonials:
        data.testimonials && data.testimonials.length > 0 ? data.testimonials : DEFAULT_CONTENT.testimonials,
      faqs: data.faqs && data.faqs.length > 0 ? data.faqs : DEFAULT_CONTENT.faqs,
      partners: data.partners && data.partners.length > 0 ? data.partners : DEFAULT_CONTENT.partners,
      gallery: data.gallery && data.gallery.length > 0 ? data.gallery : DEFAULT_CONTENT.gallery,
      pillars: data.pillars && data.pillars.length > 0 ? data.pillars : DEFAULT_CONTENT.pillars,
      branches: data.branches && data.branches.length > 0 ? data.branches : DEFAULT_CONTENT.branches,
    };
  } catch (err: any) {
    if (err?.digest === "DYNAMIC_SERVER_USAGE") throw err;
    console.warn("Could not fetch CMS, falling back to default content:", err);
    return DEFAULT_CONTENT;
  }
}
