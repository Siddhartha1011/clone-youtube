import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    const t = localStorage.getItem("token");
    if (raw && t) {
      try {
        setUserState(JSON.parse(raw));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const setUser = (userData, token) => {
    if (userData && token) {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      setUserState(userData);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUserState(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
