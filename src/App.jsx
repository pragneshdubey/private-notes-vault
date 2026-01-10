import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NewNote from "./pages/NewNote";
import EditNote from "./pages/EditNote";

import AuthGuard from "./components/AuthGuard";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        }
      />

      <Route
        path="/new"
        element={
          <AuthGuard>
            <NewNote />
          </AuthGuard>
        }
      />

      <Route
        path="/edit/:id"
        element={
          <AuthGuard>
            <EditNote />
          </AuthGuard>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}