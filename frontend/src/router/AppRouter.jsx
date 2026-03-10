import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicHome from "../pages/PublicHome";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<PublicHome />} />
        <Route path="/features" element={<PublicHome />} />
        <Route path="/gallery" element={<PublicHome />} />
        <Route path="/contact" element={<PublicHome />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;