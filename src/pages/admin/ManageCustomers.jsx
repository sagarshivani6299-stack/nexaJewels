
import { useMemo, useState } from "react";
import {
  FiSearch,
  FiUsers,
  FiUserCheck,
  FiShoppingBag,
  FiTrendingUp,
  FiArrowUpRight,
  FiMail,
  FiDownload,
  FiSliders,
  FiX,
} from "react-icons/fi";

const demoCustomers = [
  { id: "CUS-101", name: "Aarohi Sharma", email: "aarohi@example.com", orders: 5, spent: 28499, joined: "Oct 2026" },
  { id: "CUS-102", name: "Ananya Verma", email: "ananya@example.com", orders: 3, spent: 12499, joined: "Sep 2026" },
  { id: "CUS-103", name: "Meera Singh", email: "meera@example.com", orders: 7, spent: 45200, joined: "Aug 2026" },
  { id: "CUS-104", name: "Riya Gupta", email: "riya@example.com", orders: 2, spent: 6999, joined: "Oct 2026" },
  { id: "CUS-105", name: "Ishita Das", email: "ishita@example.com", orders: 4, spent: 19899, joined: "Jul 2026" },
];

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const avatarColors = [
  "bg-[#E8E1D0] text-[#173F35]",
  "bg-[#E3EEE6] text-[#28644F]",
  "bg-[#F5E7E0] text-[#9B5B42]",
  "bg-[#E7E6F2] text-[#5C5688]",
  "bg-[#F4E9C9] text-[#8C6C28]",
];

export default function ManageCustomers() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = useMemo(() => {
    const filtered = demoCustomers.filter((customer) =>
      `${customer.name} ${customer.email} ${customer.id}`
        .toLowerCase()
        .includes(search.toLowerCase().trim())
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === "spent") return b.spent - a.spent;
      if (sortBy === "orders") return b.orders - a.orders;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return demoCustomers.indexOf(a) - demoCustomers.indexOf(b);
    });
  }, [search, sortBy]);

  const totalSpent = demoCustomers.reduce(
    (sum, customer) => sum + customer.spent,
    0
  );

  const totalOrders = demoCustomers.reduce(
    (sum, customer) => sum + customer.orders,
    0
  );

  const averageSpent = totalSpent / demoCustomers.length;

  const exportCSV = () => {
    const headers = ["Customer ID", "Name", "Email", "Orders", "Total Spent", "Joined"];
    const rows = customers.map((customer) => [
      customer.id,
      customer.name,
      customer.email,
      customer.orders,
      customer.spent,
      customer.joined,
    ]);

    const escapeCSV = (value) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "nexajewels-customers.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
      {/* Page heading */}
      <section className="relative overflow-hidden rounded-2xl bg-[#12372F] p-6 text-white shadow-sm sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-[#D9BD82]/20" />
        <div className="pointer-events-none absolute -right-2 -top-10 h-44 w-44 rounded-full border border-[#D9BD82]/20" />

        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-[#D9BD82]">
              <span className="h-px w-7 bg-[#D9BD82]" />
              Customer Relations
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl">
              Manage Customers
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
              Get a clear view of your customer community, purchasing
              activity and customer value.
            </p>
          </div>

          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[#D9BD82]/50 bg-[#D9BD82] px-5 py-3 text-sm font-semibold text-[#173F35] transition hover:bg-[#E8D3A5]"
          >
            <FiDownload size={17} />
            Export Customers
          </button>
        </div>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={FiUsers}
          label="Total Customers"
          value={demoCustomers.length.toString()}
          note="Customer accounts in demo"
          color="green"
        />
        <SummaryCard
          icon={FiShoppingBag}
          label="Orders Placed"
          value={totalOrders.toString()}
          note="Across all demo customers"
          color="gold"
        />
        <SummaryCard
          icon={FiTrendingUp}
          label="Total Purchase Value"
          value={formatINR(totalSpent)}
          note="Combined customer spending"
          color="green"
        />
        <SummaryCard
          icon={FiUserCheck}
          label="Average Customer Value"
          value={formatINR(averageSpent)}
          note="Average spend per customer"
          color="gold"
        />
      </section>

      {/* Customer table */}
      <section className="overflow-hidden rounded-2xl border border-[#EAE5D9] bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#F0ECE4] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-[#173F35]">
              Customer Directory
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Browse and review your customer records.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex min-w-0 items-center gap-2 rounded-lg border border-stone-200 bg-[#FFFEFA] px-3 sm:w-80">
              <FiSearch className="shrink-0 text-stone-400" size={18} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Name, email or customer ID..."
                aria-label="Search customers"
                className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#173F35] outline-none placeholder:text-stone-400"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="text-stone-400 hover:text-[#173F35]"
                >
                  <FiX size={17} />
                </button>
              )}
            </div>

            <label className="flex items-center gap-2 rounded-lg border border-stone-200 px-3">
              <FiSliders size={16} className="text-stone-500" />
              <span className="sr-only">Sort customers</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="h-11 bg-transparent text-sm text-stone-600 outline-none"
              >
                <option value="recent">Default order</option>
                <option value="name">Name A–Z</option>
                <option value="spent">Highest spend</option>
                <option value="orders">Most orders</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF9F6] px-5 py-3 sm:px-6">
          <p className="text-sm text-stone-500">
            Showing{" "}
            <span className="font-semibold text-[#173F35]">
              {customers.length}
            </span>{" "}
            of {demoCustomers.length} customers
          </p>
          <span className="rounded-full border border-[#E7E0D2] bg-white px-3 py-1 text-xs font-medium text-stone-500">
            Demo records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-white text-[11px] uppercase tracking-[0.13em] text-stone-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-5 py-4 font-semibold">Customer ID</th>
                <th className="px-5 py-4 font-semibold">Orders</th>
                <th className="px-5 py-4 font-semibold">Total Spent</th>
                <th className="px-5 py-4 font-semibold">Joined</th>
                <th className="px-5 py-4 text-right font-semibold">Details</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F0ECE4]">
              {customers.map((customer) => {
                const originalIndex = demoCustomers.findIndex(
                  (item) => item.id === customer.id
                );

                return (
                  <tr
                    key={customer.id}
                    className="transition hover:bg-[#FCFBF7]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif text-lg ${
                            avatarColors[originalIndex % avatarColors.length]
                          }`}
                        >
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#173F35]">
                            {customer.name}
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-400">
                            <FiMail size={12} />
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <span className="rounded-md bg-[#F7F5EF] px-2.5 py-1.5 text-xs font-medium text-stone-600">
                        {customer.id}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <span className="inline-flex items-center gap-2 text-stone-600">
                        <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#EAF1EB] px-1 text-xs font-semibold text-[#28644F]">
                          {customer.orders}
                        </span>
                        <span className="text-xs">orders</span>
                      </span>
                    </td>

                    <td className="px-5 py-5 font-semibold text-[#173F35]">
                      {formatINR(customer.spent)}
                    </td>

                    <td className="px-5 py-5 text-stone-500">
                      {customer.joined}
                    </td>

                    <td className="px-5 py-5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedCustomer(customer)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#E7E0D2] px-3 py-2 text-xs font-semibold text-[#173F35] transition hover:border-[#173F35] hover:bg-[#F7F5EF]"
                      >
                        View <FiArrowUpRight size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {customers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F5EF] text-stone-400">
                      <FiSearch size={21} />
                    </div>
                    <p className="mt-3 font-medium text-[#173F35]">
                      No customers found
                    </p>
                    <p className="mt-1 text-sm text-stone-500">
                      Try another name, email or customer ID.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="mt-4 text-sm font-semibold text-[#28644F] underline underline-offset-4"
                    >
                      Clear search
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-[#F0ECE4] px-5 py-4 sm:px-6">
          <p className="text-xs leading-5 text-stone-400">
            Demo data only. Connect your customer API to display real accounts,
            verified order history and live purchase totals.
          </p>
        </div>
      </section>

      {/* Customer details modal */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#102D26]/55 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedCustomer(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="customer-dialog-title"
            className="w-full max-w-md overflow-hidden rounded-2xl border border-[#EAE5D9] bg-[#FFFEFA] shadow-2xl"
          >
            <div className="flex items-start justify-between bg-[#12372F] p-6 text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#D9BD82]">
                  Customer Profile
                </p>
                <h2
                  id="customer-dialog-title"
                  className="mt-2 font-serif text-2xl"
                >
                  {selectedCustomer.name}
                </h2>
                <p className="mt-1 text-sm text-white/65">
                  {selectedCustomer.id}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                aria-label="Close customer details"
                className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <DetailRow label="Email" value={selectedCustomer.email} />
              <DetailRow label="Member since" value={selectedCustomer.joined} />
              <DetailRow
                label="Total orders"
                value={String(selectedCustomer.orders)}
              />
              <DetailRow
                label="Total purchase value"
                value={formatINR(selectedCustomer.spent)}
              />

              <div className="rounded-lg border border-[#E8E1D0] bg-[#F7F5EF] p-3 text-xs leading-5 text-stone-500">
                This is a demo profile. Actual order details will be available
                after connecting the backend.
              </div>

              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="w-full rounded-lg bg-[#173F35] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#245747]"
              >
                Close Profile
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, note, color }) {
  const isGold = color === "gold";

  return (
    <article className="rounded-2xl border border-[#EAE5D9] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            isGold
              ? "bg-[#F7EED9] text-[#9B7736]"
              : "bg-[#E3EEE6] text-[#28644F]"
          }`}
        >
          <Icon size={21} />
        </div>
        <span className="rounded-full bg-[#F7F5EF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-500">
          Demo
        </span>
      </div>

      <p className="mt-5 text-sm text-stone-500">{label}</p>
      <p className="mt-2 break-words font-serif text-2xl text-[#173F35] sm:text-3xl">
        {value}
      </p>
      <p className="mt-2 text-xs leading-5 text-stone-400">{note}</p>
    </article>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1 border-b border-[#EEE9DF] pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <span className="text-sm text-stone-500">{label}</span>
      <span className="break-all text-sm font-semibold text-[#173F35] sm:text-right">
        {value}
      </span>
    </div>
  );
}
