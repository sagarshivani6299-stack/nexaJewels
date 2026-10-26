
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiCheck,
  FiPackage,
  FiArrowRight,
  FiShoppingBag,
  FiCalendar,
  FiShield,
  FiTruck,
  FiHeart,
  FiBox,
} from "react-icons/fi";
import { formatPrice } from "../../utils/formatPrice";

function getSavedOrders() {
  try {
    const saved = JSON.parse(localStorage.getItem("nj_orders") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function getOrderId(order) {
  return String(order?._id || order?.id || order?.orderNumber || "");
}

function formatDate(date) {
  if (!date) return "Just now";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Just now";

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function OrderSuccess() {
  const location = useLocation();
  const stateOrder = location.state?.order || null;
  const stateOrderId = getOrderId(stateOrder);

  const order = useMemo(() => {
    const orders = getSavedOrders();

    // Prefer the exact order received from Checkout.
    if (stateOrderId) {
      return (
        orders.find((item) => getOrderId(item) === stateOrderId) ||
        stateOrder
      );
    }

    // If the page is refreshed, find the latest saved order.
    return orders.length ? orders[orders.length - 1] : null;
  }, [stateOrderId, stateOrder]);

  const orderId = getOrderId(order);
  const orderNumber = order?.orderNumber || order?._id || order?.id || "";

  const items = Array.isArray(order?.items)
    ? order.items
    : Array.isArray(order?.orderItems)
      ? order.orderItems
      : [];

  const total = Number(
    order?.total ??
    order?.totalAmount ??
    order?.grandTotal ??
    0
  );

  const itemCount = items.reduce(
    (sum, item) => sum + Math.max(1, Number(item.quantity) || 1),
    0
  );

  const status = String(order?.status || "pending").toLowerCase();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFFEFA] text-[#173F35]">
      <style>{`
        .success-reveal {
          animation: successReveal .7s ease-out both;
        }

        .success-check {
          animation: checkPop .65s .15s ease-out both;
        }

        .success-orbit {
          animation: orbitPulse 4s ease-in-out infinite;
        }

        .success-float {
          animation: gentleFloat 5s ease-in-out infinite;
        }

        .success-button {
          transition: transform .25s ease, background-color .25s ease;
        }

        .success-button:hover {
          transform: translateY(-2px);
          background-color: #245647;
        }

        @keyframes successReveal {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes checkPop {
          from { opacity: 0; transform: scale(.5); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes orbitPulse {
          0%, 100% { transform: scale(1); opacity: .45; }
          50% { transform: scale(1.08); opacity: .9; }
        }

        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .success-reveal,
          .success-check,
          .success-orbit,
          .success-float {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full border border-[#B18B4B]/20" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full border border-[#B18B4B]/20" />

      <div className="relative mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <section className="success-reveal text-center">
          <div className="relative mx-auto flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40">
            <div className="success-orbit absolute inset-0 rounded-full border border-[#B18B4B]/40" />
            <div className="absolute inset-3 rounded-full border border-[#B18B4B]/30" />

            <div className="success-float flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#E5D0A4] bg-[#173F35] text-[#FFF8E8] shadow-xl sm:h-28 sm:w-28">
              <FiCheck className="success-check" size={48} />
            </div>
          </div>

          <p className="mt-7 text-xs uppercase tracking-[0.3em] text-[#A17C3C]">
            Thank you for choosing NexaJewels
          </p>

          <h1 className="mt-5 font-serif text-4xl sm:text-6xl">
            {order ? "Your Order Is" : "Order Confirmation"}
            <span className="mt-2 block italic text-[#B18B4B]">
              {order ? "Confirmed" : "Unavailable"}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-stone-500 sm:text-base">
            {order
              ? "Your order details have been saved. Thank you for shopping with NexaJewels."
              : "We could not find a saved order. Please check My Orders before placing another order."}
          </p>
        </section>

        {order && (
          <section className="success-reveal mt-10 overflow-hidden border border-[#DCC69C] bg-white/90 sm:mt-12">
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F5F1E9] text-[#A17C3C]">
                  <FiPackage size={26} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-stone-500">
                    Order reference
                  </p>
                  <h2 className="mt-2 break-all font-serif text-2xl sm:text-3xl">
                    #{orderNumber || "Saved order"}
                  </h2>
                </div>
              </div>

              <div className="sm:text-right">
                <p className="text-xs text-stone-500">Order total</p>
                <p className="mt-1 font-serif text-3xl">
                  {formatPrice(total)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-[#E9E0D1] bg-[#FFFEFA] sm:grid-cols-3">
              <div className="border-b border-r border-[#E9E0D1] p-5 sm:border-b-0 sm:px-7 sm:py-6">
                <FiCalendar className="text-[#A17C3C]" size={20} />
                <p className="mt-3 text-xs text-stone-500">Order date</p>
                <p className="mt-1 text-sm font-medium">
                  {formatDate(order.createdAt || order.date)}
                </p>
              </div>

              <div className="border-b border-[#E9E0D1] p-5 sm:border-b-0 sm:border-r sm:px-7 sm:py-6">
                <FiBox className="text-[#A17C3C]" size={20} />
                <p className="mt-3 text-xs text-stone-500">Items ordered</p>
                <p className="mt-1 text-sm font-medium">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>

              <div className="col-span-2 p-5 sm:col-span-1 sm:px-7 sm:py-6">
                <p className="text-xs text-stone-500">Order status</p>
                <span className="mt-2 inline-flex items-center gap-2 border border-[#DCE8D8] bg-[#EDF4EA] px-3 py-1.5 text-xs font-medium capitalize text-[#245647]">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {status}
                </span>
              </div>
            </div>
          </section>
        )}

        <section className="success-reveal mt-7 flex flex-col gap-5 border border-[#E9E0D1] bg-[#F5F1E9] p-5 sm:flex-row sm:items-center sm:p-7">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#173F35] text-[#F4E4BE]">
            <FiShield size={29} />
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl">
              What happens next?
            </h2>
            <p className="mt-2 text-sm leading-7 text-stone-500">
              You can review your order, ordered products and delivery
              information from your order details page.
            </p>
          </div>
        </section>

        <div className="success-reveal mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          {orderId && (
            <Link
              to={`/orders/${encodeURIComponent(orderId)}`}
              state={{ order }}
              className="success-button inline-flex items-center justify-center gap-3 bg-[#173F35] px-7 py-4 text-sm font-semibold text-white"
            >
              View Order Details
              <FiArrowRight />
            </Link>
          )}

          <Link
            to="/orders"
            className="inline-flex items-center justify-center gap-3 border border-[#173F35] px-7 py-4 text-sm font-semibold transition hover:bg-[#F5F1E9]"
          >
            <FiPackage />
            My Orders
          </Link>

          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 px-5 py-4 text-sm text-stone-600 transition hover:text-[#A17C3C]"
          >
            <FiShoppingBag />
            Continue Shopping
            <FiArrowRight />
          </Link>
        </div>

        {!order && (
          <p className="mt-6 text-center text-xs leading-6 text-stone-400">
            No order was found in the nj_orders localStorage entry.
            Check that Checkout saves the order before navigating here.
          </p>
        )}

        <footer className="mt-14 border-t border-[#E9E0D1] pt-8 text-center">
          <div className="mx-auto flex max-w-xs items-center gap-4 text-[#B18B4B]">
            <div className="h-px flex-1 bg-[#DCC69C]" />
            <span className="text-2xl">✿</span>
            <div className="h-px flex-1 bg-[#DCC69C]" />
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.4em] text-[#A17C3C]">
            NexaJewels
          </p>
          <p className="mt-2 text-xs text-stone-500">
            Made to be treasured
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-stone-500">
            <span className="flex items-center gap-2">
              <FiTruck className="text-[#A17C3C]" />
              Thoughtful service
            </span>
            <span className="flex items-center gap-2">
              <FiShield className="text-[#A17C3C]" />
              Secure experience
            </span>
            <span className="flex items-center gap-2">
              <FiHeart className="text-[#A17C3C]" />
              Timeless beauty
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}