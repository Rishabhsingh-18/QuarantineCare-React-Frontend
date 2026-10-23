import { useState } from "react";
import { Activity, HeartPulse, ShieldCheck, Stethoscope, Thermometer, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

const ROLES = [
  { id: "doctor", label: "Doctor", icon: Stethoscope },
  { id: "nurse", label: "Nurse", icon: Thermometer },
  { id: "admin", label: "Admin", icon: ShieldCheck },
  { id: "patient", label: "Patient", icon: HeartPulse },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("doctor");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      setError("Enter a valid email and a password with at least 4 characters.");
      return;
    }
    login({ email, role });
    navigate(`/${role}`);
  }

  function demoLogin(selectedRole) {
    const demoEmail = `${selectedRole}@facility.org`;
    setEmail(demoEmail);
    setPassword("demo1234");
    login({ email: demoEmail, role: selectedRole });
    navigate(`/${selectedRole}`);
  }

  return (
    <div className="login-layout">
      <section className="login-visual">
        <div className="brand login-brand"><span className="brand-mark">+</span><span>QuarantineCare</span></div>
        <div className="login-hero-copy">
          <div className="eyebrow">Care coordination, made clear</div>
          <h1>Every patient.<br />Every check.<br />Every day.</h1>
          <p>A shared workspace for temperature tracking, daily rounds, discharge readiness and facility operations.</p>
          <div className="visual-metrics">
            <div><strong>74</strong><span>Patient beds</span></div><div><strong>3 days</strong><span>Fever-free criterion</span></div><div><strong>24/7</strong><span>Care coordination</span></div>
          </div>
        </div>
        <div className="login-footer">FACILITY WORKSPACE · FRONTEND PROTOTYPE</div>
        <div className="visual-orb" />
      </section>
      <section className="login-panel">
        <div className="login-card">
          <div className="mobile-brand brand"><span className="brand-mark">+</span><span>QuarantineCare</span></div>
          <div className="login-icon"><Activity size={23} /></div>
          <h2>Welcome back</h2><p className="login-subtitle">Sign in to your facility workspace.</p>
          <form onSubmit={submit}>
            <label className="form-label" htmlFor="email">Email address</label>
            <input className="login-input" id="email" type="email" autoComplete="username" placeholder="you@facility.org" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label className="form-label" htmlFor="password">Password</label>
            <input className="login-input" id="password" type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label className="form-label" htmlFor="role">Sign in as</label>
            <select className="login-input" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="doctor">Doctor</option><option value="nurse">Nurse</option><option value="admin">Administrator</option><option value="patient">Patient</option>
            </select>
            {error && <p className="login-error">{error}</p>}
            <button className="primary-button login-submit" type="submit">Sign in securely <span>→</span></button>
          </form>
          <div className="demo-login"><strong>QUICK DEMO ACCESS</strong><p>Choose a role to preview its own dashboard.</p>
            <div className="role-buttons">{ROLES.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => demoLogin(id)}><Icon size={15} />{label}</button>)}</div>
          </div>
          <p className="prototype-note">Demo only: no real authentication or patient data is used.</p>
        </div>
      </section>
    </div>
  );
}