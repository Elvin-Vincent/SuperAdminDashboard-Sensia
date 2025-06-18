import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../sevices.js/api";

const AuthContext = createContext();

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
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        logout();
      }
    }
    setLoading(false);

    // Set up inactivity timer (1 hour)
    const inactivityTimeout = setTimeout(() => {
      logout();
    }, 60 * 60 * 1000); // 1 hour

    return () => clearTimeout(inactivityTimeout);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      localStorage.setItem("token", response.data.access);
      const decoded = jwtDecode(response.data.access);
      setUser(decoded);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.detail || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
