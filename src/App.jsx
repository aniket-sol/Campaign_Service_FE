import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel"; // Assuming this is the admin page component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin }) => {
  const { isAuthenticated, is_super_admin } = useSelector(
    (state) => state.auth
  );

  // Redirect to home if not authenticated or unauthorized
  if (!isAuthenticated || (requireAdmin && !is_super_admin)) {
    return <Navigate to="/" />;
  }

  return children;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { isAuthenticated, is_super_admin } = useSelector(
    (state) => state.auth
  );

  // Redirect authenticated users to the appropriate route based on admin status
  if (isAuthenticated) {
    return is_super_admin ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/dashboard" replace />
    );
  }

  return children;
};

const App = () => {
  const { isAuthenticated, is_super_admin } = useSelector(
    (state) => state.auth
  );

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requireAdmin={false}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          {/* Catch all route - redirect to appropriate page based on auth status */}
          <Route
            path="*"
            element={
              isAuthenticated ? (
                is_super_admin ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
