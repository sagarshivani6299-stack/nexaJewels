import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ requiredRole = "customer" }) {
  const location = useLocation();

  let session = null;

  try {
    session = JSON.parse(localStorage.getItem("nj_customer") || "null");
  } catch {
    session = null;
  }

  if (!session) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location, requiredRole }}
      />
    );
  }

  if (requiredRole === "admin" && session.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}