import { Activity, Bed, ClipboardCheck, HeartPulse, Thermometer, Users, ArrowRightLeft } from "lucide-react";

const ICONS = { Activity, Bed, ClipboardCheck, HeartPulse, Thermometer, Users, ArrowRightLeft };

export default function StatCard({ label, value, note, icon = "Activity", tone = "teal" }) {
  const Icon = ICONS[icon] || Activity;
  return (
    <article className="stat-card">
      <div className="stat-card-top"><span>{label}</span><span className={`stat-icon ${tone}`}><Icon size={18} /></span></div>
      <div className="stat-value">{value}</div>
      <div className="stat-note">{note}</div>
    </article>
  );
}