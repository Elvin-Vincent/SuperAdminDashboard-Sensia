import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/auth/Login";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import { useAuth } from "./context/AuthContext";

const AppRoutes = () => {
  const { isAuthenticated, isSuperAdmin } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          isAuthenticated && isSuperAdmin ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? "/admin" : "/login"} replace />
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
