import React, { createContext, useContext, useState, useEffect } from "react";
import { AdminUser, ParentCredentials } from "@/data/authData";

interface AuthContextType {
  currentUser: AdminUser | ParentCredentials | null;
  userType: "admin" | "parent" | null;
  login: (user: AdminUser | ParentCredentials, type: "admin" | "parent") => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | ParentCredentials | null>(null);
  const [userType, setUserType] = useState<"admin" | "parent" | null>(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedUserType = localStorage.getItem("userType");
    
    if (savedUser && savedUserType) {
      setCurrentUser(JSON.parse(savedUser));
      setUserType(savedUserType as "admin" | "parent");
    }
  }, []);

  const login = (user: AdminUser | ParentCredentials, type: "admin" | "parent") => {
    setCurrentUser(user);
    setUserType(type);
    
    // Save to localStorage
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("userType", type);
  };

  const logout = () => {
    setCurrentUser(null);
    setUserType(null);
    
    // Clear localStorage
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userType");
  };

  const value: AuthContextType = {
    currentUser,
    userType,
    login,
    logout,
    isAuthenticated: currentUser !== null
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};