import { useState } from "react";
import { useFacility } from "../context/FacilityContext";
import { useAuth } from "../context/AuthContext";
import PageHeader from "../components/PageHeader";
import PatientTable from "../components/PatientTable";

export default function PatientsPage() {
  const { patients, addPatient } = useFacility();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const canAdd = user.role === "admin" || user.role === "doctor";

  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    addPatient({ name: form.get("name").trim(), room: form.get("room").trim(), age: Number(form.get("age")), temp: Number(form.get("temp")) });
    event.currentTarget.reset();
    setShowForm(false);
    setError("");
  }

  return <>
    <PageHeader title="Patient registry" description="Search patient records and review daily monitoring status."
      action={canAdd ? <button className="primary-button" onClick={() => setShowForm((v) => !v)}>{showForm ? "Cancel" : "+ Add patient"}</button> : null} />
    {showForm && <section className="panel form-panel"><div className="panel-header"><div><h3>Register a patient</h3><p>Add a sample record to this browser session.</p></div></div>
      <form onSubmit={submit} className="form-grid">
        <div className="form-field"><label>Patient full name</label><input name="name" className="control" required placeholder="Full name" /></div>
        <div className="form-field"><label>Room</label><input name="room" className="control" required placeholder="B-01" /></div>
        <div className="form-field"><label>Age</label><input name="age" className="control" type="number" min="0" max="120" required /></div>
        <div className="form-field"><label>Initial temperature (°C)</label><input name="temp" className="control" type="number" min="30" max="45" step="0.1" defaultValue="36.8" required /></div>
        {error && <p className="form-error">{error}</p>}<div className="form-submit"><button className="primary-button">Save patient</button></div>
      </form>
    </section>}
    <section className="panel"><div className="panel-header"><div><h3>All patients</h3><p>{patients.length} sample records in this browser session</p></div></div><PatientTable patients={patients} showActions={false} /></section>
  </>;
}