
import { useMemo, useState } from "react";
import {
  FiSearch,
  FiRefreshCw,
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiDownload,
  FiSliders,
  FiX,
  FiArrowUpRight,
  FiMail,
  FiCalendar,
  FiCreditCard,
} from "react-icons/fi";
import { toast } from "sonner";
import { formatPrice } from "../../utils/formatPrice";

const initialOrders = [
  { id: "NX-1024", customer: "Aarohi Sharma", email: "aarohi@example.com", date: "2026-10-22", total: 12499, status: "Processing" },
  { id: "NX-1023", customer: "Ananya Verma", email: "ananya@example.com", date: "2026-10-21", total: 3499, status: "Delivered" },
  { id: "NX-1022", customer: "Meera Singh", email: "meera@example.com", date: "2026-10-20", total: 5999, status: "Shipped" },
  { id: "NX-1021", customer: "Riya Gupta", email: "riya@example.com", date: "2026-10-19", total: 2199, status: "Pending" },
  { id: "NX-1020", customer: "Ishita Das", email: "ishita@example.com", date: "2026-10-18", total: 8999, status: "Cancelled" },
];

const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const statusStyles = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Processing: "bg-blue-50 text-blue-700 border-blue-200",
  Shipped: "bg-violet-50 text-violet-700 border-violet-200",
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

const avatarColors = [
  "bg-[#E8E1D0] text-[#173F35]",
  "bg-[#E3EEE6] text-[#28644F]",
  "bg-[#F5E7E0] text-[#9B5B42]",
  "bg-[#E7E6F2] text-[#5C5688]",
  "bg-[#F4E9C9] text-[#8C6C28]",
];

export default function ManageOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + order.total, 0);

  const inProgress = orders.filter((order) =>
    ["Pending", "Processing", "Shipped"].includes(order.status)
  ).length;

  const delivered = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  function updateStatus(orderId, newStatus) {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    setSelectedOrder((current) =>
      current?.id === orderId ? { ...current, status: newStatus } : current
    );

    toast.success(`Demo order ${orderId} updated to ${newStatus}.`);
  }

  function exportCSV() {
    const headers = ["Order ID", "Customer", "Email", "Date", "Total", "Status"];
    const rows = filteredOrders.map((order) => [
      order.id,
      order.customer,
      order.email,
      order.date,
      order.total,
      order.status,
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
    link.download = "nexajewels-orders.csv";
    link.click();
    URL.revokeObjectURL(url);

    toast.success("Orders exported successfully.");
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl bg-[#12372F] p-6 text-white shadow-sm sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-[#D9BD82]/20" />
        <div className="pointer-events-none absolute -right-2 -top-10 h-44 w-44 rounded-full border border-[#D9BD82]/20" />

        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-[#D9BD82]">
              <span className="h-px w-7 bg-[#D9BD82]" />
              Order Management
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl">
              Manage Orders
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
              Track customer purchases, monitor order progress and manage
              fulfilment from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#D9BD82] px-5 py-3 text-sm font-semibold text-[#173F35] transition hover:bg-[#E8D3A5]"
          >
            <FiDownload size={17} />
            Export Orders
          </button>
        </div>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={FiShoppingBag}
          label="Total Orders"
          value={orders.length}
          note="All demo orders"
          color="green"
        />
        <SummaryCard
          icon={FiClock}
          label="In Progress"
          value={inProgress}
          note="Pending, processing or shipped"
          color="gold"
        />
        <SummaryCard
          icon={FiCheckCircle}
          label="Delivered"
          value={delivered}
          note="Successfully delivered demo orders"
          color="green"
        />
        <SummaryCard
          icon={FiCreditCard}
          label="Order Value"
          value={formatPrice(totalRevenue)}
          note="Excludes cancelled orders"
          color="gold"
        />
      </section>

      {/* Orders table */}
      <section className="overflow-hidden rounded-2xl border border-[#EAE5D9] bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#F0ECE4] p-5 sm:p-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-[#173F35]">
              Order Directory
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Search orders and update their current status.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex min-w-0 items-center gap-2 rounded-lg border border-stone-200 bg-[#FFFEFA] px-3 sm:w-80">
              <FiSearch size={18} className="shrink-0 text-stone-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Order ID, customer or email..."
                aria-label="Search orders"
                className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-stone-400"
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
              <span className="sr-only">Filter by status</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-11 bg-transparent text-sm text-stone-600 outline-none"
              >
                <option value="All">All statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF9F6] px-5 py-3 sm:px-6">
          <p className="text-sm text-stone-500">
            Showing{" "}
            <span className="font-semibold text-[#173F35]">
              {filteredOrders.length}
            </span>{" "}
            of {orders.length} orders
          </p>
          <span className="rounded-full border border-[#E7E0D2] bg-white px-3 py-1 text-xs font-medium text-stone-500">
            Demo records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-sm">
            <thead className="bg-white text-[11px] uppercase tracking-[0.13em] text-stone-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Order</th>
                <th className="px-5 py-4 font-semibold">Customer</th>
                <th className="px-5 py-4 font-semibold">Order Date</th>
                <th className="px-5 py-4 font-semibold">Total</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Update Status</th>
                <th className="px-5 py-4 text-right font-semibold">Details</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F0ECE4]">
              {filteredOrders.map((order) => {
                const originalIndex = initialOrders.findIndex(
                  (item) => item.id === order.id
                );

                return (
                  <tr
                    key={order.id}
                    className="transition hover:bg-[#FCFBF7]"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-[#173F35]">
                        {order.id}
                      </p>
                      <p className="mt-1 text-xs text-stone-400">
                        Jewellery order
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-base ${
                            avatarColors[
                              (originalIndex < 0 ? 0 : originalIndex) %
                                avatarColors.length
                            ]
                          }`}
                        >
                          {order.customer.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-[#173F35]">
                            {order.customer}
                          </p>
                          <p className="mt-1 text-xs text-stone-400">
                            {order.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5 text-stone-500">
                      <span className="inline-flex items-center gap-2">
                        <FiCalendar size={14} className="text-stone-400" />
                        {order.date}
                      </span>
                    </td>

                    <td className="px-5 py-5 font-semibold text-[#173F35]">
                      {formatPrice(order.total)}
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
                          statusStyles[order.status]
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {order.status}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <select
                        value={order.status}
                        onChange={(event) =>
                          updateStatus(order.id, event.target.value)
                        }
                        className="max-w-36 rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs text-stone-600 outline-none transition focus:border-[#A17C3C]"
                        aria-label={`Update status for ${order.id}`}
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-5 py-5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#E7E0D2] px-3 py-2 text-xs font-semibold text-[#173F35] transition hover:border-[#173F35] hover:bg-[#F7F5EF]"
                      >
                        View <FiArrowUpRight size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F5EF] text-stone-400">
                      <FiSearch size={21} />
                    </div>
                    <p className="mt-3 font-medium text-[#173F35]">
                      No matching orders found
                    </p>
                    <p className="mt-1 text-sm text-stone-500">
                      Try a different search or status filter.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setStatusFilter("All");
                      }}
                      className="mt-4 text-sm font-semibold text-[#28644F] underline underline-offset-4"
                    >
                      Clear filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-[#F0ECE4] px-5 py-4 text-xs text-stone-400 sm:px-6">
          <FiRefreshCw />
          Demo order data. Status changes are temporary and reset when the page reloads.
        </div>
      </section>

      {/* Order details modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#102D26]/55 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedOrder(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-dialog-title"
            className="w-full max-w-md overflow-hidden rounded-2xl border border-[#EAE5D9] bg-[#FFFEFA] shadow-2xl"
          >
            <div className="flex items-start justify-between bg-[#12372F] p-6 text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#D9BD82]">
                  Order Details
                </p>
                <h2
                  id="order-dialog-title"
                  className="mt-2 font-serif text-2xl"
                >
                  {selectedOrder.id}
                </h2>
                <p className="mt-1 text-sm text-white/65">
                  Customer purchase summary
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                aria-label="Close order details"
                className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <DetailRow
                label="Customer"
                value={selectedOrder.customer}
              />
              <DetailRow label="Email" value={selectedOrder.email} />
              <DetailRow label="Order date" value={selectedOrder.date} />
              <DetailRow
                label="Order total"
                value={formatPrice(selectedOrder.total)}
              />

              <div className="flex items-center justify-between gap-3 border-b border-[#EEE9DF] pb-4">
                <span className="text-sm text-stone-500">Current status</span>
                <span
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                    statusStyles[selectedOrder.status]
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </div>

              <div>
                <label
                  htmlFor="modal-order-status"
                  className="mb-2 block text-sm font-medium text-[#173F35]"
                >
                  Change order status
                </label>
                <select
                  id="modal-order-status"
                  value={selectedOrder.status}
                  onChange={(event) =>
                    updateStatus(selectedOrder.id, event.target.value)
                  }
                  className="h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus:border-[#A17C3C]"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-full rounded-lg bg-[#173F35] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#245747]"
              >
                Close Details
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
