import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions?: {
    studentCreate?: boolean;
    studentRead?: boolean;
    studentUpdate?: boolean;
    studentDelete?: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isSuperAdmin: boolean;
  isAuthInitialized: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false); 

  const login = (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      setToken(token);
      setUser({
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        permissions: decoded.permissions || {},
      });
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Invalid token", error);
      logout();
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      login(savedToken);
    }
    setIsAuthInitialized(true);
  }, []);

  const isSuperAdmin = user?.role === "SuperAdmin";

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isSuperAdmin, isAuthInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};
