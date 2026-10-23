import { ClipboardCheck, HeartPulse, Thermometer } from "lucide-react";
import PageHeader from "../components/PageHeader";

const steps = [
  { title: "Daily temperature", text: "Your care team records your temperature each day. Ask your nurse if you are unsure whether today's check is complete.", Icon: Thermometer },
  { title: "Doctor rounds", text: "The doctor reviews your recorded temperature during the daily visit.", Icon: ClipboardCheck },
  { title: "Fever-free progress", text: "The project brief defines discharge readiness as three full days without fever.", Icon: HeartPulse },
];

export default function CarePlanPage() {
  return <>
    <PageHeader title="My care plan" description="A simple overview of the daily care workflow." />
    <div className="care-plan-grid">{steps.map(({ title, text, Icon }) => <article className="panel care-plan-card" key={title}><span className="care-plan-icon"><Icon size={22} /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
    <div className="notice">This is sample information for the frontend prototype. It does not replace advice from your care team.</div>
  </>;
}