import { useState } from "react";
import { useFacility } from "../context/FacilityContext";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";

export default function RoundsPage() {
  const { patients, completeDoctorRound } = useFacility();
  const [message, setMessage] = useState("");
  function markVisited(id) {
    const result = completeDoctorRound(id);
    setMessage(result.message);
  }
  return <>
    <PageHeader title="Doctor rounds" description="Review recorded temperatures before completing the daily doctor visit." />
    <div className="notice"><strong>Workflow rule:</strong> the temperature check should be recorded before the doctor visit is marked complete.</div>
    {message && <div className="notice notice-success">{message}</div>}
    <section className="panel"><div className="panel-header"><div><h3>Daily round checklist</h3><p>Sample patient records and session changes</p></div></div>
      <div className="table-scroll"><table className="data-table"><thead><tr><th>Patient</th><th>Latest temperature</th><th>Nurse check</th><th>Doctor visit</th><th>Action</th></tr></thead><tbody>
        {patients.map((p) => <tr key={p.id}><td><strong>{p.name}</strong><small className="table-subtext">{p.id} · Room {p.room}</small></td><td>{p.temp.toFixed(1)}°C</td><td><StatusBadge>{p.check}</StatusBadge></td><td><StatusBadge>{p.doctor}</StatusBadge></td><td>{p.doctor === "Complete" ? <StatusBadge>Complete</StatusBadge> : p.check !== "Complete" ? <StatusBadge>Awaiting temperature</StatusBadge> : <button className="text-action" onClick={() => markVisited(p.id)}>Mark visited</button>}</td></tr>)}
      </tbody></table></div>
    </section>
  </>;
}