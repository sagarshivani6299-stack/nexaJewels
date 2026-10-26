
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiPackage,
  FiShoppingBag,
  FiArrowRight,
  FiCalendar,
  FiBox,
  FiRefreshCw,
  FiClock,
  FiChevronRight,
} from "react-icons/fi";
import { formatPrice } from "../../utils/formatPrice";

const STATUS_STYLES = {
  pending: "border-amber-200 bg-amber-50 text-amber-800",
  processing: "border-blue-200 bg-blue-50 text-blue-800",
  shipped: "border-violet-200 bg-violet-50 text-violet-800",
  delivered: "border-emerald-200 bg-emerald-50 text-emerald-800",
  cancelled: "border-red-200 bg-red-50 text-red-800",
};

function getSavedOrders() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("nj_orders") || "[]"
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Date unavailable";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getOrderId(order) {
  return String(order._id || order.id || order.orderNumber || "");
}

function getItems(order) {
  return Array.isArray(order.items)
    ? order.items
    : Array.isArray(order.orderItems)
      ? order.orderItems
      : [];
}

function getItemCount(order) {
  return getItems(order).reduce(
    (total, item) => total + Math.max(0, Number(item.quantity) || 1),
    0
  );
}

function getOrderTotal(order) {
  return Number(
    order.total ?? order.totalAmount ?? order.grandTotal ?? 0
  );
}

export default function Orders() {
  const [orders, setOrders] = useState(getSavedOrders);
  const [refreshing, setRefreshing] = useState(false);

  function refreshOrders() {
    setRefreshing(true);
    setOrders(getSavedOrders());
    setRefreshing(false);
  }

  return (
    <main className="min-h-screen bg-[#FFFEFA] text-[#173F35]">
      {/* Luxury header */}
      <section className="relative overflow-hidden border-b border-[#E9E0D1] bg-[#F5F1E9]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#B18B4B]/20 sm:h-96 sm:w-96" />
        <div className="pointer-events-none absolute -right-5 top-5 h-52 w-52 rounded-full border border-[#B18B4B]/20 sm:h-72 sm:w-72" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:py-16 lg:px-8">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-sm text-stone-500 transition hover:text-[#A17C3C]"
          >
            My Account <FiChevronRight />
          </Link>

          <div className="mt-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#A17C3C]">
                Your personal collection
              </p>

              <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl">
                My Orders
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-7 text-stone-500">
                Every special piece, all in one place. Revisit your
                purchases and keep track of each order.
              </p>
            </div>

            <button
              type="button"
              onClick={refreshOrders}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 self-start border border-[#D8CFBF] bg-white px-5 py-3 text-sm transition hover:border-[#A17C3C] disabled:opacity-60 sm:self-auto"
            >
              <FiRefreshCw className={refreshing ? "animate-spin" : ""} />
              Refresh orders
            </button>
          </div>

          <div className="mt-9 grid max-w-2xl grid-cols-2 gap-3 sm:gap-5">
            <div className="border border-[#E9E0D1] bg-white/90 p-4 sm:p-5">
              <FiPackage size={23} className="text-[#A17C3C]" />
              <p className="mt-4 text-xs text-stone-500">Total orders</p>
              <p className="mt-1 font-serif text-3xl">{orders.length}</p>
            </div>

            <div className="border border-[#E9E0D1] bg-white/90 p-4 sm:p-5">
              <FiBox size={23} className="text-[#A17C3C]" />
              <p className="mt-4 text-xs text-stone-500">Items ordered</p>
              <p className="mt-1 font-serif text-3xl">
                {orders.reduce((sum, order) => sum + getItemCount(order), 0)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Orders list */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:py-14 lg:px-8">
        {orders.length === 0 ? (
          <div className="border border-[#E9E0D1] bg-white px-5 py-14 text-center sm:px-10 sm:py-20">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F1E9]">
              <FiShoppingBag size={30} className="text-[#A17C3C]" />
            </div>

            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#A17C3C]">
              A little something awaits
            </p>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Your story starts here
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-stone-500">
              You haven't placed an order yet. Discover timeless jewellery
              and find a piece that feels uniquely yours.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex items-center justify-center gap-3 bg-[#173F35] px-7 py-4 text-sm font-medium text-white transition hover:bg-[#245647]"
            >
              Explore the collection <FiArrowRight />
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-serif text-2xl">Your purchases</p>
                <p className="mt-1 text-sm text-stone-500">
                  {orders.length} {orders.length === 1 ? "order" : "orders"} saved
                  on this device
                </p>
              </div>
            </div>

            {orders.map((order, index) => {
              const orderId = getOrderId(order);
              const status = String(order.status || "pending").toLowerCase();
              const orderNumber =
                order.orderNumber || orderId || `Order ${index + 1}`;
              const count = getItemCount(order);
              const total = getOrderTotal(order);

              return (
                <article
                  key={orderId || index}
                  className="group overflow-hidden border border-[#E9E0D1] bg-white transition duration-300 hover:border-[#B18B4B]/60 hover:shadow-xl hover:shadow-[#173F35]/5"
                >
                  <div className="flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-7">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-[#A17C3C]">
                        Order reference
                      </p>

                      <h2 className="mt-2 break-all font-serif text-xl sm:text-2xl">
                        #{orderNumber}
                      </h2>

                      <p className="mt-3 flex items-center gap-2 text-xs text-stone-500">
                        <FiCalendar className="shrink-0 text-[#A17C3C]" />
                        Placed on {formatDate(order.createdAt || order.date)}
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit shrink-0 items-center gap-2 border px-3 py-2 text-xs font-semibold capitalize ${
                        STATUS_STYLES[status] ||
                        "border-stone-200 bg-stone-50 text-stone-600"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {status}
                    </span>
                  </div>

                  <div className="grid gap-5 border-t border-[#E9E0D1] bg-[#FFFEFA] px-5 py-5 sm:grid-cols-3 sm:items-center sm:px-7">
                    <div>
                      <p className="text-xs text-stone-500">Order total</p>
                      <p className="mt-2 font-serif text-2xl">
                        {formatPrice(total)}
                      </p>
                    </div>

                    <div>
                      <p className="flex items-center gap-2 text-xs text-stone-500">
                        <FiBox className="text-[#A17C3C]" />
                        Items in this order
                      </p>
                      <p className="mt-2 text-base font-medium">
                        {count} {count === 1 ? "item" : "items"}
                      </p>
                    </div>

                    <div className="sm:justify-self-end">
                      {orderId ? (
                        <Link
                          to={`/orders/${encodeURIComponent(orderId)}`}
                          className="inline-flex w-full items-center justify-center gap-2 bg-[#173F35] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#245647] sm:w-auto"
                        >
                          View order
                          <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                        </Link>
                      ) : (
                        <p className="text-xs text-stone-500">
                          Order reference unavailable
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#E9E0D1] pt-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium transition hover:text-[#A17C3C]"
          >
            <FiShoppingBag /> Continue shopping <FiArrowRight />
          </Link>

          <p className="flex items-center gap-2 text-xs text-stone-400">
            <FiClock /> Orders are saved in this browser
          </p>
        </div>
      </section>
    </main>
  );
}
