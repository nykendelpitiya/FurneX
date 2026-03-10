import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

function ProtectedRoute({ children }) {

  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;