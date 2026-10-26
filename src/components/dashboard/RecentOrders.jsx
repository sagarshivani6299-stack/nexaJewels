
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { formatPrice } from "../../utils/formatPrice";

const statusStyles = {
  pending: "bg-amber-50 text-amber-700",
  processing: "bg-blue-50 text-blue-700",
  shipped: "bg-violet-50 text-violet-700",
  delivered: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-700",
};

export default function RecentOrders({ orders = [] }) {
  return (
    <section className="border border-stone-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-stone-200 px-5 py-5 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A9854D]">
            Store Activity
          </p>
          <h2 className="mt-2 font-serif text-2xl text-[#173F35]">
            Recent Orders
          </h2>
        </div>

        <Link
          to="/admin/orders"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#173F35] hover:text-[#A9854D]"
        >
          View all <FiArrowUpRight />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="px-5 py-14 text-center text-sm text-stone-500">
          No orders are available yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-[#FAF8F3] text-xs uppercase tracking-wider text-stone-500">
              <tr>
                <th className="px-5 py-4 font-medium">Order</th>
                <th className="px-5 py-4 font-medium">Customer</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Amount</th>
                <th className="px-5 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100">
              {orders.map((order) => {
                const status = String(order.status ?? "pending").toLowerCase();

                return (
                  <tr key={order.id} className="hover:bg-[#FAF8F3]">
                    <td className="px-5 py-4 font-semibold text-[#173F35]">
                      {order.orderNumber ?? order.id}
                    </td>
                    <td className="px-5 py-4 text-stone-600">
                      {order.customer?.name ?? order.customerName ?? "Customer"}
                    </td>
                    <td className="px-5 py-4 text-stone-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("en-IN")
                        : "—"}
                    </td>
                    <td className="px-5 py-4 font-medium text-[#173F35]">
                      {formatPrice(Number(order.total ?? 0))}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          statusStyles[status] ?? "bg-stone-100 text-stone-600"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
