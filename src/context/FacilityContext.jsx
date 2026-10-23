import { createContext, useContext, useMemo, useState } from "react";
import { INITIAL_ACTIVITY, INITIAL_PATIENTS, INITIAL_TEMPERATURE_LOGS } from "../data/demoData";

const FacilityContext = createContext(null);

export function FacilityProvider({ children }) {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [temperatureLogs, setTemperatureLogs] = useState(INITIAL_TEMPERATURE_LOGS);
  const [activity, setActivity] = useState(INITIAL_ACTIVITY);

  function logActivity(message) {
    const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    setActivity((items) => [`${time} · ${message}`, ...items]);
  }

  function addPatient(patient) {
    const newPatient = {
      ...patient,
      id: `QC-${1032 + patients.length - INITIAL_PATIENTS.length}`,
      check: "Pending",
      doctor: "Pending",
      feverFree: 0,
      status: "Stable",
      notes: "New patient",
    };
    setPatients((items) => [...items, newPatient]);
    logActivity(`New patient registered: ${newPatient.id}`);
  }

  function recordTemperature({ patientId, temp, note, recordedBy }) {
    const patient = patients.find((item) => item.id === patientId);
    if (!patient) return { ok: false, message: "Patient not found." };
    if (patient.check === "Complete") return { ok: false, message: "A reading is already recorded today for this patient." };

    const feverFree = temp >= 38 ? 0 : Math.min(3, patient.feverFree + 1);
    const status = temp >= 38 ? "Fever" : feverFree >= 3 ? "Ready for review" : "Stable";
    setPatients((items) => items.map((item) => item.id === patientId
      ? { ...item, temp, check: "Complete", feverFree, status }
      : item));
    const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    setTemperatureLogs((items) => [{ patientId, name: patient.name, temp, time, by: recordedBy, note: note || (temp >= 38 ? "Fever" : "Normal") }, ...items]);
    logActivity(`${recordedBy} recorded ${patientId} temperature`);
    return { ok: true, message: "Temperature saved for this session." };
  }

  function completeDoctorRound(patientId) {
    const patient = patients.find((item) => item.id === patientId);
    if (!patient) return { ok: false, message: "Patient not found." };
    if (patient.check !== "Complete") return { ok: false, message: "Record the temperature before completing a doctor visit." };
    setPatients((items) => items.map((item) => item.id === patientId ? { ...item, doctor: "Complete" } : item));
    logActivity(`Doctor visit completed for ${patientId}`);
    return { ok: true, message: "Doctor visit marked complete." };
  }

  function dischargePatient(patientId) {
    const patient = patients.find((item) => item.id === patientId);
    if (!patient) return { ok: false, message: "Patient not found." };
    if (patient.feverFree < 3 || patient.doctor !== "Complete") {
      return { ok: false, message: "Patient must meet the 3-day criterion and have a completed doctor visit." };
    }
    setPatients((items) => items.map((item) => item.id === patientId ? { ...item, status: "Discharged" } : item));
    logActivity(`Admin marked ${patientId} discharged`);
    return { ok: true, message: "Discharge marked in this session." };
  }

  const value = useMemo(() => ({
    patients, temperatureLogs, activity, addPatient, recordTemperature, completeDoctorRound, dischargePatient,
  }), [patients, temperatureLogs, activity]);

  return <FacilityContext.Provider value={value}>{children}</FacilityContext.Provider>;
}

export function useFacility() {
  const context = useContext(FacilityContext);
  if (!context) throw new Error("useFacility must be used inside FacilityProvider");
  return context;
}