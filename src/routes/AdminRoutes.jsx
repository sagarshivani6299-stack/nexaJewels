
import { Routes, Route, Navigate } from "react-router-dom";

import AdminRoute from "./AdminRoute";
import AdminLayout from "../components/dashboard/AdminLayout";

import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import ManageProducts from "../pages/admin/ManageProducts";
import AddProduct from "../pages/admin/AddProduct";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageCustomers from "../pages/admin/ManageCustomers";
import AdminSettings from "../pages/admin/AdminSettings";
import Analytics from "../pages/admin/Analytics";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Admin login is public */}
      <Route path="/login" element={<AdminLogin />} />

      {/* All routes below require admin authentication */}
      <Route element={<AdminRoute />}>
        <Route path="/" element={<AdminLayout />}>
          <Route
            index
            element={<Navigate to="/admin/dashboard" replace />}
          />

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="products" element={<ManageProducts />} />

          <Route path="products/add" element={<AddProduct />} />

          <Route path="orders" element={<ManageOrders />} />

          <Route path="customers" element={<ManageCustomers />} />

          <Route path="analytics" element={<Analytics />} />

          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/* Unknown admin routes redirect to the admin dashboard */}
      <Route
        path="*"
        element={<Navigate to="/admin/dashboard" replace />}
      />
    </Routes>
  );
}
