
import { FiBell, FiSearch } from "react-icons/fi";

export default function AdminHeader({
  title = "Dashboard Overview",
  adminName = "Administrator",
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-stone-200 bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[#A9854D]">
          NexaJewels Management
        </p>
        <h1 className="mt-1 font-serif text-2xl text-[#173F35] sm:text-3xl">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 border-b border-stone-300 px-2 py-2">
          <FiSearch className="text-stone-400" />
          <input
            type="search"
            placeholder="Search dashboard"
            aria-label="Search dashboard"
            className="w-36 bg-transparent text-sm outline-none sm:w-48"
          />
        </label>

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full border border-stone-200 p-2.5 text-[#173F35] hover:bg-stone-50"
        >
          <FiBell size={19} />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E9DFD0] font-semibold text-[#173F35]">
          {adminName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
