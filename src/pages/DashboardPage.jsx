import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFacility } from "../context/FacilityContext";
import { ROLE_LABELS } from "../data/demoData";
import StatCard from "../components/StatCard";
import PatientTable from "../components/PatientTable";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, Thermometer, Users } from "lucide-react";

function Panel({ title, subtitle, action, children }) {
  return <section className="panel"><div className="panel-header"><div><h3>{title}</h3><p>{subtitle}</p></div>{action}</div>{children}</section>;
}

function DoctorDashboard({ patients, navigate }) {
  const checked = patients.filter((p) => p.check === "Complete").length;
  const rounds = patients.filter((p) => p.doctor === "Complete").length;
  const ready = patients.filter((p) => p.feverFree >= 3 && p.status !== "Discharged");
  return <>
    <PageHeader title="Good morning, Doctor 👋" description="Review today's patient status and prepare for your daily rounds." action={<span className="date-pill"><CalendarDays size={15} /> {new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</span>} />
    <div className="stats-grid">
      <StatCard label="Occupied beds" value="74 / 74" note="Facility at full capacity" icon="Bed" />
      <StatCard label="Patients under care" value="74" note="All rooms occupied" icon="Users" tone="blue" />
      <StatCard label="Temperature checks" value={`${checked} / ${patients.length}`} note={`${patients.length - checked} sample records pending`} icon="Thermometer" tone="amber" />
      <StatCard label="Doctor rounds" value={`${rounds} / ${patients.length}`} note="Recorded visits in sample" icon="ClipboardCheck" tone="purple" />
    </div>
    <div className="dashboard-grid">
      <Panel title="Patient monitoring" subtitle="Sample records · Select a patient for details" action={<button className="text-action" onClick={() => navigate("/doctor/patients")}>View all <ArrowRight size={14} /></button>}>
        <PatientTable patients={patients.slice(0, 5)} onDetails={(p) => window.alert(`${p.name} (${p.id})\nTemperature: ${p.temp}°C\nNurse check: ${p.check}\nDoctor visit: ${p.doctor}\nFever-free days: ${p.feverFree}`)} />
      </Panel>
      <div className="stacked-panels">
        <Panel title="Discharge readiness" subtitle="Three fever-free days">
          <div className="compact-list">{ready.length ? ready.map((p) => <div className="compact-row" key={p.id}><div className="person-avatar">{p.name.split(" ").map((n) => n[0]).join("")}</div><div className="compact-person"><strong>{p.name}</strong><span>{p.id} · Room {p.room}</span></div><b className="success-text">3/3 days</b></div>) : <div className="empty-cell">No eligible sample patients.</div>}</div>
        </Panel>
        <Panel title="Quality benchmark" subtitle="Targets supplied in the project brief">
          <div className="benchmark-body"><div className="benchmark-label"><span>Expected mortality</span><strong>15%</strong></div><div className="progress-track danger"><span style={{ width: "15%" }} /></div><div className="benchmark-label"><span>Target success rate</span><strong>85%</strong></div><div className="progress-track"><span style={{ width: "85%" }} /></div><p className="muted-small">Targets only; no verified outcome data is connected.</p></div>
        </Panel>
      </div>
    </div>
  </>;
}

function NurseDashboard({ patients, navigate }) {
  const checked = patients.filter((p) => p.check === "Complete").length;
  const pending = patients.filter((p) => p.check !== "Complete");
  const fever = patients.filter((p) => p.temp >= 38);
  return <>
    <PageHeader title="Nurse workspace" description="Complete today's temperature checks and avoid duplicate readings." action={<button className="primary-button" onClick={() => navigate("/nurse/temperatures")}>Record temperature <ArrowRight size={15} /></button>} />
    <div className="stats-grid">
      <StatCard label="Patients assigned" value={patients.length} note="Current sample patient list" icon="Users" />
      <StatCard label="Checks completed" value={checked} note={`${patients.length - checked} checks still due`} icon="ClipboardCheck" tone="blue" />
      <StatCard label="Checks remaining" value={pending.length} note="Prioritize pending readings" icon="Thermometer" tone="amber" />
      <StatCard label="High temperatures" value={fever.length} note="Flag for clinical review" icon="Activity" tone="red" />
    </div>
    <Panel title="Today's temperature checklist" subtitle="Record a reading once per patient each day" action={<button className="text-action" onClick={() => navigate("/nurse/patients")}>Patient list <ArrowRight size={14} /></button>}>
      <PatientTable patients={patients} showActions={false} />
    </Panel>
  </>;
}

function AdminDashboard({ patients, navigate }) {
  const eligible = patients.filter((p) => p.feverFree >= 3 && p.status !== "Discharged");
  return <>
    <PageHeader title="Facility operations" description="Monitor occupancy, discharge processing and quality benchmarks." action={<span className="date-pill"><CalendarDays size={15} /> {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>} />
    <div className="stats-grid">
      <StatCard label="Occupied beds" value="74 / 74" note="Facility at full capacity" icon="Bed" />
      <StatCard label="Active patients" value="74" note="Across facility rooms" icon="Users" tone="blue" />
      <StatCard label="Awaiting discharge" value={eligible.length} note="In sample records" icon="ArrowRightLeft" tone="amber" />
      <StatCard label="Mortality benchmark" value="15%" note="Success target: 85%" icon="HeartPulse" tone="purple" />
    </div>
    <div className="dashboard-grid">
      <Panel title="Patient registry" subtitle="Sample patient records" action={<button className="text-action" onClick={() => navigate("/admin/patients")}>Manage patients <ArrowRight size={14} /></button>}><PatientTable patients={patients.slice(0, 5)} showActions={false} /></Panel>
      <Panel title="Discharge approvals" subtitle="Patients meeting the fever-free criterion" action={<button className="text-action" onClick={() => navigate("/admin/discharge")}>Review <ArrowRight size={14} /></button>}>
        <div className="compact-list">{eligible.map((p) => <div className="compact-row" key={p.id}><div className="person-avatar">{p.name.split(" ").map((n) => n[0]).join("")}</div><div className="compact-person"><strong>{p.name}</strong><span>{p.id} · {p.feverFree} fever-free days</span></div><StatusBadge>{p.doctor === "Complete" ? "Ready for review" : "Pending doctor"}</StatusBadge></div>)}</div>
      </Panel>
    </div>
  </>;
}

function PatientDashboard() {
  return <>
    <PageHeader title="Welcome to your health view" description="Review your sample temperature record and care workflow." />
    <div className="stats-grid patient-stats">
      <article className="stat-card"><div className="stat-card-top"><span>Latest temperature</span><span className="stat-icon"><Thermometer size={18} /></span></div><div className="stat-value">36.8°C</div><div className="stat-note">Sample reading · 08:35 AM</div></article>
      <article className="stat-card"><div className="stat-card-top"><span>Temperature check</span><span className="stat-icon blue"><CheckCircle2 size={18} /></span></div><div className="stat-value">Complete</div><div className="stat-note">Sample record for today</div></article>
      <article className="stat-card"><div className="stat-card-top"><span>Fever-free progress</span><span className="stat-icon purple"><Clock3 size={18} /></span></div><div className="stat-value">3 / 3 days</div><div className="progress-track"><span style={{ width: "100%" }} /></div><div className="stat-note">Sample status only</div></article>
    </div>
    <Panel title="Your care journey" subtitle="Typical daily facility workflow">
      <div className="care-steps"><div className="care-step"><span className="step-number done">1</span><div><strong>Temperature recorded</strong><p>Your care team records your temperature daily.</p></div><StatusBadge>Complete</StatusBadge></div><div className="care-step"><span className="step-number done">2</span><div><strong>Doctor visit</strong><p>The doctor reviews your recorded temperature during the daily visit.</p></div><StatusBadge>Complete</StatusBadge></div></div>
    </Panel>
  </>;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { patients } = useFacility();
  const navigate = useNavigate();
  if (user.role === "doctor") return <DoctorDashboard patients={patients} navigate={navigate} />;
  if (user.role === "nurse") return <NurseDashboard patients={patients} navigate={navigate} />;
  if (user.role === "admin") return <AdminDashboard patients={patients} navigate={navigate} />;
  return <PatientDashboard />;
}