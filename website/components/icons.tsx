import React from "react";
import {
  Sparkles,
  ShieldCheck,
  Smile,
  Stethoscope,
  HeartHandshake,
  Activity,
  Award,
  Clock,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Star,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Zap,
  Microscope,
  UserCheck,
  Building2,
  Check,
  Menu,
  X,
  CreditCard,
  Shield,
  HelpCircle,
  Mail,
  AlertCircle,
  type LucideProps,
} from "lucide-react";

export {
  Sparkles,
  ShieldCheck,
  Smile,
  Stethoscope,
  HeartHandshake,
  Activity,
  Award,
  Clock,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Star,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Zap,
  Microscope,
  UserCheck,
  Building2,
  Check,
  Menu,
  X,
  CreditCard,
  Shield,
  HelpCircle,
  Mail,
  AlertCircle,
};

export function DentalServiceIcon({
  name,
  className = "w-6 h-6",
  size = 24,
  strokeWidth = 2,
}: {
  name?: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}) {
  const props: LucideProps = { size, className, strokeWidth };

  const key = (name || "").toLowerCase().trim();

  // Smart mapping matching slug, title or emoji keywords
  if (key.includes("whiten") || key === "✨" || key === "whitening") {
    return <Sparkles {...props} />;
  }
  if (
    key.includes("brace") ||
    key.includes("aligner") ||
    key.includes("ortho") ||
    key === "😁"
  ) {
    return <Smile {...props} />;
  }
  if (
    key.includes("implant") ||
    key.includes("screw") ||
    key === "🔩" ||
    key === "implant"
  ) {
    return <Activity {...props} />;
  }
  if (
    key.includes("root") ||
    key.includes("canal") ||
    key.includes("endo") ||
    key === "💉" ||
    key === "root-canal"
  ) {
    return <Microscope {...props} />;
  }
  if (
    key.includes("kid") ||
    key.includes("child") ||
    key.includes("pediatric") ||
    key === "🧒"
  ) {
    return <HeartHandshake {...props} />;
  }
  if (
    key.includes("check") ||
    key.includes("clean") ||
    key.includes("hygiene") ||
    key === "🦷" ||
    key === "checkup"
  ) {
    return <ShieldCheck {...props} />;
  }

  // General fallback
  return <Stethoscope {...props} />;
}
