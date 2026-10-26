
import { Routes, Route } from "react-router-dom";
import CustomerRoutes from "./CustomerRoutes";
import AdminRoutes from "./AdminRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/*" element={<CustomerRoutes />} />
    </Routes>
  );
}
