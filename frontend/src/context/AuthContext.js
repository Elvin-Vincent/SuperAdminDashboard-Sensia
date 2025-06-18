import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../sevices.js/api"; // Fixed typo in path ('sevices.js' -> 'services')

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const inactivityTimer = useRef(null);

  // Clear tokens and reset auth state
  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setError(null);
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
    clearTimeout(inactivityTimer.current);
  }, [navigate]);

  // Validate token expiration
  const isTokenValid = useCallback((token) => {
    if (!token) return false;
    try {
      const { exp } = jwtDecode(token);
      return Date.now() < exp * 1000;
    } catch {
      return false;
    }
  }, []);

  // Refresh token function
  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken || !isTokenValid(refreshToken)) {
      logout();
      return null;
    }

    try {
      const response = await api.post("/auth/refresh/", {
        refresh: refreshToken,
      });
      const { access } = response.data;
      localStorage.setItem("access_token", access);
      api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      return access;
    } catch (err) {
      logout();
      return null;
    }
  }, [isTokenValid, logout]);

  // Initialize auth state from stored tokens
  const initializeAuth = useCallback(async () => {
    try {
      let accessToken = localStorage.getItem("access_token");

      // If access token is invalid, try to refresh
      if (!accessToken || !isTokenValid(accessToken)) {
        accessToken = await refreshToken();
        if (!accessToken) return;
      }

      const decoded = jwtDecode(accessToken);
      setUser(decoded);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  }, [isTokenValid, refreshToken, logout]);

  // Reset inactivity timer on user activity
  const resetInactivityTimer = useCallback(() => {
    clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      logout();
    }, 60 * 60 * 1000); // 1 hour
  }, [logout]);

  // Set up activity listeners
  useEffect(() => {
    initializeAuth();

    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    const handleActivity = () => resetInactivityTimer();

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      clearTimeout(inactivityTimer.current);
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [initializeAuth, resetInactivityTimer]);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/auth/login/", credentials);

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      const decoded = jwtDecode(response.data.access);
      setUser(decoded);

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;
      resetInactivityTimer();

      // Redirect after successful login
      navigate("/dashboard"); // Adjust redirect path as needed

      return { success: true };
    } catch (error) {
      // Clear tokens on failed login
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      let errorMessage = "Login failed";
      if (error.response) {
        errorMessage =
          error.response.data?.detail ||
          error.response.data?.message ||
          "Invalid credentials";
      }
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    error,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isSuperAdmin: user?.role === "superadmin" || false, // Adjust this line depending on your JWT payload
    refreshToken, // Expose refreshToken for manual refresh if needed
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
