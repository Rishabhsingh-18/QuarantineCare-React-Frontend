export const ROLE_LABELS = {
  doctor: "Doctor",
  nurse: "Nurse",
  admin: "Administrator",
  patient: "Patient",
};

export const NAV_ITEMS = {
  doctor: [
    { label: "Overview", icon: "LayoutDashboard", path: "/doctor" },
    { label: "Patients", icon: "Users", path: "/doctor/patients" },
    { label: "Temperature logs", icon: "Thermometer", path: "/doctor/temperatures" },
    { label: "Doctor rounds", icon: "ClipboardCheck", path: "/doctor/rounds" },
    { label: "Discharge queue", icon: "LogOut", path: "/doctor/discharge" },
    { label: "Quality & outcomes", icon: "ChartNoAxesCombined", path: "/doctor/reports" },
  ],
  nurse: [
    { label: "Overview", icon: "LayoutDashboard", path: "/nurse" },
    { label: "My patient checks", icon: "Thermometer", path: "/nurse/temperatures" },
    { label: "Patient list", icon: "Users", path: "/nurse/patients" },
  ],
  admin: [
    { label: "Overview", icon: "LayoutDashboard", path: "/admin" },
    { label: "Patient registry", icon: "Users", path: "/admin/patients" },
    { label: "Discharge approvals", icon: "LogOut", path: "/admin/discharge" },
    { label: "Staff activity", icon: "Activity", path: "/admin/activity" },
    { label: "Quality & outcomes", icon: "ChartNoAxesCombined", path: "/admin/reports" },
  ],
  patient: [
    { label: "My health", icon: "HeartPulse", path: "/patient" },
    { label: "My temperature history", icon: "Thermometer", path: "/patient/temperatures" },
    { label: "My care plan", icon: "ClipboardList", path: "/patient/care-plan" },
  ],
};

export const INITIAL_PATIENTS = [
  { id: "QC-1024", name: "Aarav Mehta", room: "A-01", age: 42, temp: 38.4, check: "Pending", doctor: "Pending", feverFree: 0, status: "Fever", notes: "Fever reported this morning" },
  { id: "QC-1025", name: "Priya Shah", room: "A-02", age: 35, temp: 36.8, check: "Complete", doctor: "Complete", feverFree: 3, status: "Ready for review", notes: "Three full days without fever" },
  { id: "QC-1026", name: "Kabir Rao", room: "A-03", age: 51, temp: 37.1, check: "Complete", doctor: "Pending", feverFree: 1, status: "Stable", notes: "Doctor round pending" },
  { id: "QC-1027", name: "Anaya Patel", room: "A-04", age: 28, temp: 36.6, check: "Pending", doctor: "Pending", feverFree: 2, status: "Stable", notes: "Temperature check due" },
  { id: "QC-1028", name: "Ishaan Das", room: "A-05", age: 63, temp: 39.0, check: "Complete", doctor: "Complete", feverFree: 0, status: "Fever", notes: "Escalate to doctor" },
  { id: "QC-1029", name: "Mira Joshi", room: "A-06", age: 46, temp: 36.7, check: "Complete", doctor: "Pending", feverFree: 3, status: "Discharge review", notes: "Awaiting administrative processing" },
  { id: "QC-1030", name: "Dev Kumar", room: "A-07", age: 31, temp: 37.0, check: "Pending", doctor: "Complete", feverFree: 1, status: "Stable", notes: "Temperature check due" },
  { id: "QC-1031", name: "Sara Khan", room: "A-08", age: 39, temp: 36.5, check: "Complete", doctor: "Complete", feverFree: 3, status: "Ready for review", notes: "Meets fever-free criterion" },
];

export const INITIAL_TEMPERATURE_LOGS = [
  { patientId: "QC-1024", name: "Aarav Mehta", temp: 38.4, time: "08:42 AM", by: "Nurse A. Lee", note: "Fever" },
  { patientId: "QC-1025", name: "Priya Shah", temp: 36.8, time: "08:35 AM", by: "Nurse J. Roy", note: "Normal" },
  { patientId: "QC-1026", name: "Kabir Rao", temp: 37.1, time: "08:27 AM", by: "Nurse A. Lee", note: "Normal" },
  { patientId: "QC-1028", name: "Ishaan Das", temp: 39.0, time: "08:12 AM", by: "Nurse J. Roy", note: "High fever" },
];

export const INITIAL_ACTIVITY = [
  "08:42 AM · Nurse A. Lee recorded QC-1024 temperature",
  "08:35 AM · Nurse J. Roy recorded QC-1025 temperature",
  "08:10 AM · Doctor round completed for QC-1025",
];