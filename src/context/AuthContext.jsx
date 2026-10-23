import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login({ email, role }) {
    const displayName = email
      .split("@")[0]
      .replace(/[._-]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    setUser({ email, role, name: displayName || "Demo User" });
  }

  function logout() {
    setUser(null);
  }

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}