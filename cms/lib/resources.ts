export type FieldType = "text" | "textarea" | "number" | "checkbox" | "url" | "select";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  options?: { value: string; label: string }[];
  group?: string;
}

export interface Resource {
  key: string;
  table: string;
  label: string;
  singular: string;
  titleField: string;
  subtitleField?: string;
  iconName?: string;
  fields: Field[];
}

export const RESOURCES: Resource[] = [
  {
    key: "branches",
    table: "branches",
    label: "Clinic Branches",
    singular: "Branch",
    titleField: "name",
    subtitleField: "building",
    iconName: "MapPin",
    fields: [
      { name: "name", label: "Branch Name", type: "text", required: true, help: "e.g. Kitengela" },
      { name: "building", label: "Building / Landmark", type: "text", required: true, help: "e.g. Orok Business Centre" },
      { name: "room", label: "Floor & Room / Suite", type: "text", help: "e.g. 1st Floor, Room 1 & 2" },
      { name: "phone", label: "Contact Phone Number", type: "text", required: true, help: "e.g. 0790 330 294" },
      { name: "whatsapp", label: "WhatsApp Number (Digits only)", type: "text", help: "e.g. 254790330294" },
      { name: "map_url", label: "Directions / Google Maps URL", type: "text", help: "https://maps.google.com/..." },
      { name: "sort", label: "Sort Order", type: "number" },
      { name: "published", label: "Published on Website", type: "checkbox" },
    ],
  },
  {
    key: "services",
    table: "services",
    label: "Dental Services",
    singular: "Service",
    titleField: "title",
    subtitleField: "price_from",
    iconName: "Stethoscope",
    fields: [
      { name: "title", label: "Treatment Title", type: "text", required: true, help: "e.g. Teeth Whitening" },
      { name: "slug", label: "URL Slug", type: "text", required: true, help: "lowercase-with-dashes, e.g. teeth-whitening" },
      { name: "summary", label: "Short Summary", type: "textarea", required: true, help: "1-2 sentences shown on service card" },
      { name: "description", label: "Full Clinical Description", type: "textarea", help: "Comprehensive overview shown on the detail page" },
      {
        name: "icon",
        label: "Icon Key",
        type: "select",
        options: [
          { value: "checkup", label: "Check-up / Shield (Preventative & Hygiene)" },
          { value: "whitening", label: "Sparkles (Laser Teeth Whitening)" },
          { value: "ortho", label: "Smile (Braces & Clear Aligners)" },
          { value: "implant", label: "Implant / Surgery (Titanium Implants)" },
          { value: "root-canal", label: "Microscope (Root Canal Therapy)" },
          { value: "pediatric", label: "Heart Handshake (Children's Dentistry)" },
        ],
        help: "Clean vector icon rendered for this treatment",
      },
      { name: "price_from", label: "Starting Price or Fee", type: "text", help: "e.g. KES 2,500 or Consultation" },
      { name: "image_url", label: "Service Photo URL", type: "text", help: "e.g. /img/exam.jpg, /img/aligner.jpg, /img/xray.jpg" },
      { name: "sort", label: "Sort Order", type: "number" },
      { name: "published", label: "Published on Website", type: "checkbox" },
    ],
  },
  {
    key: "gallery",
    table: "gallery",
    label: "Facility Photos",
    singular: "Photo",
    titleField: "title",
    iconName: "Image",
    fields: [
      { name: "title", label: "Facility Photo Caption", type: "text", required: true, help: "e.g. Modern Ergonomic Operatory" },
      { name: "image_url", label: "Image URL", type: "text", required: true, help: "e.g. /img/clinic1.jpg, /img/room.jpg, /img/xray.jpg" },
      { name: "is_featured", label: "Featured Large Span (Wide Card)", type: "checkbox" },
      { name: "sort", label: "Sort Order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" },
    ],
  },
  {
    key: "partners",
    table: "partners",
    label: "Insurance Partners",
    singular: "Insurance Partner",
    titleField: "name",
    iconName: "ShieldCheck",
    fields: [
      { name: "name", label: "Partner / Insurer Name", type: "text", required: true, help: "e.g. AAR Insurance" },
      { name: "logo_url", label: "Logo URL", type: "text", required: true, help: "e.g. /partners/AAR.png, /partners/CIC-800x450.webp" },
      { name: "sort", label: "Sort Order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" },
    ],
  },
  {
    key: "testimonials",
    table: "testimonials",
    label: "Patient Testimonials",
    singular: "Testimonial",
    titleField: "author",
    iconName: "MessageSquareQuote",
    fields: [
      { name: "author", label: "Patient Name & Location", type: "text", required: true, help: "e.g. Amina K. (Westlands, Nairobi)" },
      { name: "quote", label: "Patient Review Quote", type: "textarea", required: true },
      { name: "rating", label: "Star Rating (1 to 5)", type: "number" },
      { name: "sort", label: "Sort Order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" },
    ],
  },
  {
    key: "faqs",
    table: "faqs",
    label: "Frequently Asked Questions",
    singular: "FAQ",
    titleField: "question",
    iconName: "HelpCircle",
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Detailed Clinical Answer", type: "textarea", required: true },
      { name: "sort", label: "Sort Order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" },
    ],
  },
];

export const getResource = (key: string) => RESOURCES.find((r) => r.key === key);

export interface SettingsSection {
  id: string;
  title: string;
  description: string;
  fields: Field[];
}

export const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    id: "general",
    title: "Clinic Identity & Contact",
    description: "Core clinic information shown in header, footer, and topbar.",
    fields: [
      { name: "clinic_name", label: "Clinic Name", type: "text" },
      { name: "tagline", label: "Tagline / Value Proposition", type: "text" },
      { name: "phone", label: "Main Telephone / Landline", type: "text" },
      { name: "emergency_helpline", label: "Emergency Line / Fast Track", type: "text" },
      { name: "whatsapp", label: "WhatsApp Number (Digits only, e.g. 254712345678)", type: "text" },
      { name: "email", label: "Public Contact Email", type: "text" },
      { name: "address", label: "Physical Address (One line or formatted)", type: "textarea" },
      { name: "hours", label: "Opening Hours (one line per schedule)", type: "textarea" },
      { name: "topbar_notice", label: "Top Notification Bar Text", type: "text" },
    ],
  },
  {
    id: "hero",
    title: "Hero Section & Trust Statistics",
    description: "Content displayed prominently at the top of the homepage.",
    fields: [
      { name: "hero_title", label: "Hero Main Headline", type: "text" },
      { name: "hero_subtitle", label: "Hero Subtitle / Description", type: "textarea" },
      { name: "hero_image", label: "Hero Primary Image URL", type: "text" },
      { name: "hero_stat_rating", label: "Floating Rating Badge Text (e.g. 4.9 / 5.0 Rating)", type: "text" },
      { name: "hero_stat_reviews", label: "Floating Review Subtext (e.g. Over 1,200+ happy smiles)", type: "text" },
      { name: "hero_badge_reassurance", label: "Floating Accreditation Badge Text (e.g. KDA & ITI Accredited)", type: "text" },
    ],
  },
  {
    id: "about",
    title: "About Clinic Story & Stats",
    description: "The clinic narrative, team photo, key accreditations, and practice metrics.",
    fields: [
      { name: "about_eyebrow", label: "Section Badge Tag", type: "text" },
      { name: "about_title", label: "Section Headline", type: "text" },
      { name: "about", label: "About Clinic Story / Bio", type: "textarea" },
      { name: "about_image", label: "About Photo (Upload or URL)", type: "text" },
      { name: "about_point_1", label: "Checklist Point 1", type: "text" },
      { name: "about_point_2", label: "Checklist Point 2", type: "text" },
      { name: "about_point_3", label: "Checklist Point 3", type: "text" },
      { name: "about_stat_1_val", label: "Stat 1 Number (e.g. 5+)", type: "text" },
      { name: "about_stat_1_lbl", label: "Stat 1 Label (e.g. Specialties)", type: "text" },
      { name: "about_stat_2_val", label: "Stat 2 Number (e.g. 3)", type: "text" },
      { name: "about_stat_2_lbl", label: "Stat 2 Label (e.g. Senior Dentists)", type: "text" },
      { name: "about_stat_3_val", label: "Stat 3 Number (e.g. 5.0★)", type: "text" },
      { name: "about_stat_3_lbl", label: "Stat 3 Label (e.g. Patient Rating)", type: "text" },
    ],
  },
  {
    id: "sections",
    title: "Section Headlines & Subtitles",
    description: "Customize additional section headers across the homepage.",
    fields: [
      { name: "insurance_banner_text", label: "Insurance Banner Header Text", type: "text" },
    ],
  },
  {
    id: "cta",
    title: "Call to Action (CTA) Banner",
    description: "The prominent bottom banner driving appointment requests.",
    fields: [
      { name: "cta_title", label: "CTA Banner Headline", type: "text" },
      { name: "cta_subtitle", label: "CTA Banner Description", type: "textarea" },
    ],
  },
  {
    id: "social_maps",
    title: "Location Map & Social Media",
    description: "Google Maps embed link and social accounts.",
    fields: [
      { name: "map_url", label: "Google Maps Embed URL (iframe src)", type: "text" },
      { name: "instagram", label: "Instagram Profile URL", type: "text" },
      { name: "facebook", label: "Facebook Profile URL", type: "text" },
    ],
  },
];

export const SETTINGS_FIELDS: Field[] = SETTINGS_SECTIONS.flatMap((s) => s.fields);

export const APPOINTMENT_STATUSES = ["new", "confirmed", "completed", "cancelled"] as const;
