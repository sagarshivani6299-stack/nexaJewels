
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AdminRoute() {
  const location = useLocation();

  let admin = null;

  try {
    admin = JSON.parse(
      localStorage.getItem("nexajewels_admin") || "null"
    );
  } catch {
    admin = null;
  }

  const token = localStorage.getItem(
    "nexajewels_admin_token"
  );

  let validDemoToken = false;

  try {
    const payload = JSON.parse(atob(token || ""));

    validDemoToken =
      payload.role === "admin" &&
      payload.email === admin?.email &&
      payload.exp > Date.now();
  } catch {
    validDemoToken = false;
  }

  const isAdmin =
    Boolean(token) &&
    admin?.role === "admin" &&
    validDemoToken;

  if (!isAdmin) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}
