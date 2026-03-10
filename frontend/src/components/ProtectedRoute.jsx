import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] sm:min-h-[60vh] items-center justify-center px-4 py-10">
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 sm:px-5 sm:py-4 shadow-sm">
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#1F5A2E]"
            aria-hidden="true"
          />
          <p className="text-sm sm:text-base font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;