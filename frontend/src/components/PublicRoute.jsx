import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default PublicRoute;