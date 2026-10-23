import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Activity, ChartNoAxesCombined, ClipboardCheck, ClipboardList, HeartPulse, LayoutDashboard,
  LogOut, Menu, Thermometer, Users, X, HelpCircle
} from "lucide-react";
import { NAV_ITEMS, ROLE_LABELS } from "../data/demoData";
import { useAuth } from "../context/AuthContext";

const ICONS = { Activity, ChartNoAxesCombined, ClipboardCheck, ClipboardList, HeartPulse, LayoutDashboard, LogOut, Thermometer, Users };

export function AppShell({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = NAV_ITEMS[user.role] || [];
  const active = links.find((link) => link.path === location.pathname);
  const title = active?.label || "Dashboard";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="app-layout">
      {mobileOpen && <button className="mobile-overlay" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand"><span className="brand-mark">+</span><span>QuarantineCare</span></div>
        <div className="nav-label">Workspace</div>
        <nav className="nav-list">
          {links.map((link) => {
            const Icon = ICONS[link.icon] || LayoutDashboard;
            return (
              <button key={link.path} className={`nav-item ${location.pathname === link.path ? "active" : ""}`}
                onClick={() => { navigate(link.path); setMobileOpen(false); }}>
                <Icon size={18} strokeWidth={1.8} /><span>{link.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="sidebar-bottom">Facility operations<br /><span>Frontend demo · No backend</span></div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMobileOpen(true)}><Menu size={19} /></button>
            <div><div className="breadcrumb">Facility / {ROLE_LABELS[user.role]}</div><h2>{title}</h2></div>
          </div>
          <div className="topbar-actions">
            <button className="icon-button" title="Help" onClick={() => window.alert("This is a frontend-only prototype with sample records.")}><HelpCircle size={18} /></button>
            <div className="profile">
              <div className="avatar">{user.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</div>
              <div className="profile-copy"><strong>{user.name}</strong><span>{ROLE_LABELS[user.role]}</span></div>
            </div>
            <button className="secondary-button logout-button" onClick={handleLogout}><LogOut size={15} /> Log out</button>
          </div>
        </header>
        <section className="page-content">{children}</section>
      </main>
    </div>
  );
}