
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("nexajewels_admin_token");
    localStorage.removeItem("nexajewels_admin");

    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#FFFEFA]">
      {/* Fixed sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 lg:block">
        <AdminSidebar onLogout={handleLogout} />
      </aside>

      {/* Only right-side content scrolls */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AdminHeader />

        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
