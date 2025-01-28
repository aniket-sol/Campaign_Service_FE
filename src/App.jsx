import React from "react";
import {
  BrowserRouter as Router,
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

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Navbar from "./components/layout/Navbar";
// import HomePage from "./pages/HomePage";
// import Dashboard from "./pages/Dashboard";
// import AdminPanel from "./pages/AdminPanel"; // Assuming this is the admin page component
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Protected Route Component
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { isAuthenticated, is_super_admin } = useSelector((state) => state.auth);

//   // Redirect to home if not authenticated or unauthorized
//   if (!isAuthenticated || !allowedRoles.includes(roleType)) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// // Public Route Component
// const PublicRoute = ({ children }) => {
//   const { isAuthenticated, roleType } = useSelector((state) => state.auth);
//   const location = useLocation();

//   // Redirect authenticated users to the appropriate route based on their role
//   if (isAuthenticated) {
//     if (roleType === "Super Admin") {
//       return <Navigate to="/admin" replace />;
//     }
//     if (roleType === "Practice Admin" || roleType === "Practice User") {
//       return <Navigate to="/dashboard" replace />;
//     }
//   }

//   return children;
// };

// const App = () => {
//   const { isAuthenticated, roleType } = useSelector((state) => state.auth);

//   return (
//     <Router>
//       <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//         <Navbar />
//         <Routes>
//           {/* Public routes */}
//           <Route
//             path="/"
//             element={
//               <PublicRoute>
//                 <HomePage />
//               </PublicRoute>
//             }
//           />

//           {/* Protected routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute
//                 allowedRoles={["Practice Admin", "Practice User"]}
//               >
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute allowedRoles={["Super Admin"]}>
//                 <AdminPanel />
//               </ProtectedRoute>
//             }
//           />

//           {/* Catch all route - redirect to appropriate page based on auth status and role */}
//           <Route
//             path="*"
//             element={
//               isAuthenticated ? (
//                 roleType === "Super Admin" ? (
//                   <Navigate to="/admin" replace />
//                 ) : (
//                   <Navigate to="/dashboard" replace />
//                 )
//               ) : (
//                 <Navigate to="/" replace />
//               )
//             }
//           />
//         </Routes>
//       </div>
//       <ToastContainer />
//     </Router>
//   );
// };

// export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Navbar from "./components/layout/Navbar";
// import HomePage from "./pages/HomePage";
// import Dashboard from "./pages/Dashboard";

// // Protected Route Component (for authenticated users only)
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   if (!isAuthenticated) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// // Public Route Component (redirect to dashboard if authenticated)
// const PublicRoute = ({ children }) => {
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const location = useLocation();

//   if (isAuthenticated && location.pathname === "/") {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };

// const App = () => {
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   return (
//     <Router>
//       <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//         <Navbar />
//         <Routes>
//           {/* Public routes */}
//           <Route
//             path="/"
//             element={
//               <PublicRoute>
//                 <HomePage />
//               </PublicRoute>
//             }
//           />

//           {/* Protected routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />

//           {/* Catch all route - redirect to appropriate page based on auth status */}
//           <Route
//             path="*"
//             element={
//               isAuthenticated ? (
//                 <Navigate to="/dashboard" replace />
//               ) : (
//                 <Navigate to="/" replace />
//               )
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
