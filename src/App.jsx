import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { FacilityProvider } from "./context/FacilityContext";
import { useAuth } from "./context/AuthContext";
import { AppShell } from "./components/AppShell";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/PatientsPage";
import TemperaturesPage from "./pages/TemperaturesPage";
import RoundsPage from "./pages/RoundsPage";
import DischargePage from "./pages/DischargePage";
import ReportsPage from "./pages/ReportsPage";
import ActivityPage from "./pages/ActivityPage";
import CarePlanPage from "./pages/CarePlanPage";
import "./styles/app.css";

function ProtectedRoute({ roles, children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!roles.includes(user.role)) return <Navigate to={`/${user.role}`} replace />;
  return children;
}

function RoleHome() {
  const { user } = useAuth();
  return user ? <Navigate to={`/${user.role}`} replace /> : <Navigate to="/login" replace />;
}

function PageRoute({ roles, children }) {
  return <ProtectedRoute roles={roles}><AppShell>{children}</AppShell></ProtectedRoute>;
}

export default function App() {
  const { user } = useAuth();
  return (
    <FacilityProvider>
      <Routes>
        <Route path="/login" element={user ? <RoleHome /> : <LoginPage />} />
        <Route path="/" element={<RoleHome />} />
        <Route path="/doctor" element={<PageRoute roles={["doctor"]}><DashboardPage /></PageRoute>} />
        <Route path="/doctor/patients" element={<PageRoute roles={["doctor"]}><PatientsPage /></PageRoute>} />
        <Route path="/doctor/temperatures" element={<PageRoute roles={["doctor"]}><TemperaturesPage /></PageRoute>} />
        <Route path="/doctor/rounds" element={<PageRoute roles={["doctor"]}><RoundsPage /></PageRoute>} />
        <Route path="/doctor/discharge" element={<PageRoute roles={["doctor"]}><DischargePage /></PageRoute>} />
        <Route path="/doctor/reports" element={<PageRoute roles={["doctor"]}><ReportsPage /></PageRoute>} />
        <Route path="/nurse" element={<PageRoute roles={["nurse"]}><DashboardPage /></PageRoute>} />
        <Route path="/nurse/patients" element={<PageRoute roles={["nurse"]}><PatientsPage /></PageRoute>} />
        <Route path="/nurse/temperatures" element={<PageRoute roles={["nurse"]}><TemperaturesPage /></PageRoute>} />
        <Route path="/admin" element={<PageRoute roles={["admin"]}><DashboardPage /></PageRoute>} />
        <Route path="/admin/patients" element={<PageRoute roles={["admin"]}><PatientsPage /></PageRoute>} />
        <Route path="/admin/discharge" element={<PageRoute roles={["admin"]}><DischargePage /></PageRoute>} />
        <Route path="/admin/activity" element={<PageRoute roles={["admin"]}><ActivityPage /></PageRoute>} />
        <Route path="/admin/reports" element={<PageRoute roles={["admin"]}><ReportsPage /></PageRoute>} />
        <Route path="/patient" element={<PageRoute roles={["patient"]}><DashboardPage /></PageRoute>} />
        <Route path="/patient/temperatures" element={<PageRoute roles={["patient"]}><TemperaturesPage /></PageRoute>} />
        <Route path="/patient/care-plan" element={<PageRoute roles={["patient"]}><CarePlanPage /></PageRoute>} />
        <Route path="*" element={<RoleHome />} />
      </Routes>
    </FacilityProvider>
  );
}