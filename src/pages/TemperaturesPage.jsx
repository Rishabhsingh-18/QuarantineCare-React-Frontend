import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFacility } from "../context/FacilityContext";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { Thermometer } from "lucide-react";

export default function TemperaturesPage() {
  const { user } = useAuth();
  const { patients, temperatureLogs, recordTemperature } = useFacility();
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const canRecord = user.role === "nurse" || user.role === "doctor";
  const patientLogs = user.role === "patient" ? temperatureLogs.filter((l) => l.patientId === "QC-1025") : temperatureLogs;

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = recordTemperature({
      patientId: data.get("patientId"),
      temp: Number(data.get("temp")),
      note: data.get("note"),
      recordedBy: user.name,
    });
    setMessage(result.message);
    if (result.ok) {
      event.currentTarget.reset();
      setShowForm(false);
    }
  }

  return <>
    <PageHeader title={user.role === "patient" ? "My temperature history" : "Temperature logs"}
      description={user.role === "patient" ? "Read-only view of your sample temperature readings." : "Record daily readings and see which patient checks are pending."}
      action={canRecord ? <button className="primary-button" onClick={() => setShowForm((v) => !v)}><Thermometer size={16} /> Record temperature</button> : null} />
    {user.role !== "patient" && <div className="notice"><strong>Daily check rule:</strong> one temperature reading per patient per day. This demo blocks repeat entries for patients already marked complete in the current session.</div>}
    {message && <div className={`notice ${message.includes("saved") ? "notice-success" : "notice-warning"}`}>{message}</div>}
    {showForm && canRecord && <section className="panel form-panel"><div className="panel-header"><div><h3>Record a temperature</h3><p>Enter the reading taken by the nurse.</p></div></div>
      <form className="form-grid" onSubmit={submit}>
        <div className="form-field"><label>Patient</label><select name="patientId" className="control" required>{patients.filter((p) => p.check !== "Complete").map((p) => <option key={p.id} value={p.id}>{p.id} · {p.name}</option>)}</select></div>
        <div className="form-field"><label>Temperature (°C)</label><input name="temp" className="control" type="number" min="30" max="45" step="0.1" placeholder="e.g. 36.8" required /></div>
        <div className="form-field full-width"><label>Notes (optional)</label><input name="note" className="control" placeholder="Observation" /></div>
        <div className="form-submit"><button className="primary-button">Save reading</button></div>
      </form>
    </section>}
    <section className="panel"><div className="panel-header"><div><h3>{user.role === "patient" ? "My readings" : "Today's readings"}</h3><p>{patientLogs.length} entries · Sample and session records</p></div></div>
      <div className="table-scroll"><table className="data-table"><thead><tr><th>Patient</th><th>Temperature</th><th>Time recorded</th><th>Recorded by</th><th>Observation</th></tr></thead><tbody>
        {patientLogs.map((log, index) => <tr key={`${log.patientId}-${log.time}-${index}`}><td><strong>{log.name}</strong><small className="table-subtext">{log.patientId}</small></td><td><strong className={log.temp >= 38 ? "temperature-hot" : ""}>{Number(log.temp).toFixed(1)}°C</strong></td><td>{log.time}</td><td>{log.by}</td><td><StatusBadge>{log.note}</StatusBadge></td></tr>)}
        {!patientLogs.length && <tr><td colSpan="5" className="empty-cell">No readings available.</td></tr>}
      </tbody></table></div>
    </section>
  </>;
}