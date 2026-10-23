import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFacility } from "../context/FacilityContext";
import StatCard from "../components/StatCard";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";

export default function DischargePage() {
  const { user } = useAuth();
  const { patients, dischargePatient } = useFacility();
  const [message, setMessage] = useState("");
  const candidates = patients.filter((p) => p.feverFree >= 3 && p.status !== "Discharged");
  function markDischarged(id) {
    const result = dischargePatient(id);
    setMessage(result.message);
  }
  return <>
    <PageHeader title={user.role === "admin" ? "Discharge approvals" : "Discharge queue"} description="Track patients who meet the provided three-full-days-without-fever criterion." />
    <div className="notice"><strong>Prototype rule:</strong> this page uses the criterion in the project brief. The demo is not a clinical decision system.</div>
    {message && <div className="notice notice-success">{message}</div>}
    <div className="stats-grid three-stats"><StatCard label="Eligible in sample" value={candidates.length} note="3+ fever-free days" icon="ClipboardCheck" /><StatCard label="Awaiting doctor visit" value={candidates.filter((p) => p.doctor !== "Complete").length} note="Doctor workflow incomplete" icon="Activity" tone="amber" /><StatCard label="Capacity" value="74 beds" note="Facility capacity" icon="Bed" tone="blue" /></div>
    <section className="panel"><div className="panel-header"><div><h3>Discharge candidates</h3><p>Fever-free progress and workflow status</p></div></div>
      <div className="table-scroll"><table className="data-table"><thead><tr><th>Patient</th><th>Room</th><th>Fever-free days</th><th>Doctor visit</th><th>Status</th><th>Action</th></tr></thead><tbody>
        {candidates.map((p) => <tr key={p.id}><td><strong>{p.name}</strong><small className="table-subtext">{p.id}</small></td><td>{p.room}</td><td><StatusBadge>{p.feverFree} days</StatusBadge></td><td><StatusBadge>{p.doctor}</StatusBadge></td><td><StatusBadge>{p.status}</StatusBadge></td><td>{user.role === "admin" && p.doctor === "Complete" ? <button className="text-action" onClick={() => markDischarged(p.id)}>Mark discharged</button> : <span className="muted-small">Awaiting authorized processing</span>}</td></tr>)}
        {!candidates.length && <tr><td colSpan="6" className="empty-cell">No discharge candidates in the sample records.</td></tr>}
      </tbody></table></div>
    </section>
  </>;
}