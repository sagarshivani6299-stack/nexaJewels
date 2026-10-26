
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiHome,
  FiLogOut,
  FiTrendingUp,
} from "react-icons/fi";

const menu = [
  { label: "Overview", to: "/admin/dashboard", icon: FiGrid },
  { label: "Products", to: "/admin/products", icon: FiPackage },
  { label: "Orders", to: "/admin/orders", icon: FiShoppingBag },
  { label: "Customers", to: "/admin/customers", icon: FiUsers },
  {
    label: "Analytics & Profit",
    to: "/admin/analytics",
    icon: FiTrendingUp,
  },
  { label: "Settings", to: "/admin/settings", icon: FiSettings },
];

export default function AdminSidebar({ onLogout }) {
  return (
    <aside className="flex h-full min-h-screen w-64 flex-col bg-[#12372F] px-4 py-6 text-white">
      <div className="border-b border-white/15 px-3 pb-6">
        <p className="font-serif text-2xl tracking-widest">NEXA</p>
        <p className="mt-1 text-[10px] tracking-[0.3em] text-[#D9BD82]">
          JEWELS ADMIN
        </p>
      </div>

      <nav className="mt-7 flex-1 space-y-2">
        {menu.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-white/15 text-[#E6CC94]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-2 border-t border-white/15 pt-5">
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white"
        >
          <FiHome size={18} />
          View Store
        </NavLink>

        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded px-4 py-3 text-sm text-white/70 transition hover:bg-red-500/15 hover:text-red-200"
        >
          <FiLogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
