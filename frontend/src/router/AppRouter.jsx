import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicHome from "../pages/PublicHome";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Designs from "../pages/Designs";
import DashboardLayout from "../components/dashboard/DashboardLayout";

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
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="designs" element={<Designs />} />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;