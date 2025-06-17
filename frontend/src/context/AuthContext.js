//AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Token decode error:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    if (
      credentials.email === "admin@example.com" &&
      credentials.password === "admin123"
    ) {
      const mockUser = {
        id: 1,
        email: "admin@example.com",
        is_superadmin: true,
        token: "mock-token-for-frontend",
      };
      localStorage.setItem("token", mockUser.token);
      setUser(mockUser);
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isSuperAdmin: user?.is_superadmin || false,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
