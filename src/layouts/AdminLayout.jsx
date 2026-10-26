import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import AdminNavbar from "../components/dashboard/AdminNavbar";

const titles = {
  "/dashboard": ["Overview", "A clear view of your store at a glance."],
  "/dashboard/products": ["Products", "Manage catalogue details and inventory."],
  "/dashboard/orders": ["Orders", "Review recorded customer orders."],
  "/dashboard/customers": ["Customers", "View customer records associated with orders."],
  "/dashboard/categories": ["Categories", "Organise the store collection."],
  "/dashboard/settings": ["Settings", "Review store configuration and integration status."],
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [title, subtitle] = titles[location.pathname] || ["Store workspace", "Manage NexaJewels."];

  return (
    <div className="admin-shell">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="admin-main">
        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="admin-page-heading">
          <div>
            <span className="eyebrow">NEXAJEWELS / MANAGEMENT</span>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <span className="admin-environment-label">DEMO WORKSPACE</span>
        </div>

        <main className="admin-content">
          <Outlet />
        </main>

        <footer className="admin-footer">
          <span>© {new Date().getFullYear()} NexaJewels</span>
          <span>Store management workspace · Demo data</span>
        </footer>
      </div>
    </div>
  );
}