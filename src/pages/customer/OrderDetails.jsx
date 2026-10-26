
import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiPackage,
  FiMapPin,
  FiCreditCard,
  FiTruck,
  FiShoppingBag,
  FiArrowRight,
  FiCalendar,
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

function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Date unavailable";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getAddress(order) {
  return order.shippingAddress || order.address || {};
}

function getProduct(item) {
  return item.product || item;
}

function getImage(product) {
  const image =
    product.image ??
    product.Image ??
    product.imageUrl ??
    product.image_url ??
    product.thumbnail ??
    product.images?.[0]?.url ??
    product.images?.[0];

  return typeof image === "string" ? image : "";
}

function getNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

export default function OrderDetails() {
  const { orderId } = useParams();
  const decodedId = decodeURIComponent(orderId || "");

  const order = getSavedOrders().find(
    (item) => getOrderId(item) === decodedId
  );

  if (!order) {
    return (
      <main className="min-h-screen bg-[#FFFEFA] px-5 py-16 text-[#173F35]">
        <div className="mx-auto max-w-2xl border border-[#E9E0D1] bg-white px-6 py-14 text-center sm:px-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F1E9]">
            <FiPackage size={30} className="text-[#A17C3C]" />
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#A17C3C]">
            Order not found
          </p>

          <h1 className="mt-3 font-serif text-3xl sm:text-4xl">
            We couldn't find this order
          </h1>

          <p className="mt-4 text-sm leading-7 text-stone-500">
            This order may not be saved in this browser, or its reference
            may have changed.
          </p>

          <Link
            to="/orders"
            className="mt-8 inline-flex items-center gap-2 bg-[#173F35] px-6 py-3.5 text-sm text-white transition hover:bg-[#245647]"
          >
            <FiArrowLeft /> Back to My Orders
          </Link>
        </div>
      </main>
    );
  }

  const items = getItems(order);
  const address = getAddress(order);
  const status = String(order.status || "pending").toLowerCase();
  const orderNumber =
    order.orderNumber || order._id || order.id || "Unavailable";

  const subtotal = getNumber(
    order.subtotal ?? order.itemsPrice
  ) || items.reduce((sum, item) => {
    const product = getProduct(item);
    const price = getNumber(item.price ?? product.price);
    const quantity = Math.max(0, getNumber(item.quantity) || 1);
    return sum + price * quantity;
  }, 0);

  const shipping = getNumber(order.shippingCost ?? order.shippingPrice);
  const tax = getNumber(order.tax ?? order.taxPrice);
  const discount = getNumber(order.discount);

  const calculatedTotal = Math.max(
    0,
    subtotal + shipping + tax - discount
  );

  const total = getNumber(
    order.total ?? order.totalAmount ?? order.grandTotal
  ) || calculatedTotal;

  const paymentMethod =
    order.paymentMethod || order.payment?.method || "Not provided";

  const paymentStatus =
    order.paymentStatus || order.payment?.status || "Not provided";

  return (
    <main className="min-h-screen bg-[#FFFEFA] text-[#173F35]">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-[#E9E0D1] bg-[#F5F1E9]">
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border border-[#B18B4B]/20 sm:h-96 sm:w-96" />

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:py-14 lg:px-8">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-sm text-stone-500 transition hover:text-[#173F35]"
          >
            <FiArrowLeft /> Back to My Orders
          </Link>

          <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#A17C3C]">
                Your purchase, beautifully kept
              </p>

              <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
                Order Details
              </h1>

              <p className="mt-4 break-all text-sm text-stone-500">
                Order #{orderNumber}
              </p>

              <p className="mt-2 flex items-center gap-2 text-xs text-stone-500">
                <FiCalendar className="text-[#A17C3C]" />
                Placed on {formatDate(order.createdAt || order.date)}
              </p>
            </div>

            <span
              className={`inline-flex w-fit items-center gap-2 border px-4 py-2 text-xs font-semibold capitalize ${
                STATUS_STYLES[status] ||
                "border-stone-200 bg-stone-50 text-stone-600"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {status}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:py-14 lg:px-8">
        <div className="grid items-start gap-7 lg:grid-cols-[1.45fr_0.8fr]">
          {/* Main column */}
          <div className="space-y-7">
            {/* Products */}
            <section className="border border-[#E9E0D1] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[#E9E0D1] pb-5">
                <FiPackage size={22} className="text-[#A17C3C]" />
                <div>
                  <h2 className="font-serif text-2xl">
                    Items in Your Order
                  </h2>
                  <p className="mt-1 text-xs text-stone-500">
                    {items.length} {items.length === 1 ? "product" : "products"}
                  </p>
                </div>
              </div>

              {items.length === 0 ? (
                <p className="py-8 text-sm text-stone-500">
                  Product details are not available for this order.
                </p>
              ) : (
                <div className="divide-y divide-[#E9E0D1]">
                  {items.map((item, index) => {
                    const product = getProduct(item);
                    const quantity = Math.max(
                      1,
                      getNumber(item.quantity) || 1
                    );
                    const price = getNumber(item.price ?? product.price);
                    const image = getImage(product);

                    return (
                      <div
                        key={
                          item._id ||
                          item.id ||
                          product._id ||
                          product.id ||
                          index
                        }
                        className="flex gap-4 py-5 sm:gap-5"
                      >
                        <div className="flex h-28 w-24 shrink-0 items-center justify-center overflow-hidden border border-[#E9E0D1] bg-[#F5F1E9] sm:h-32 sm:w-28">
                          {image ? (
                            <img
                              src={image}
                              alt={product.name || "Ordered jewellery"}
                              className="h-full w-full object-cover"
                              loading="lazy"
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <FiShoppingBag
                              size={28}
                              className="text-[#B18B4B]"
                            />
                          )}
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <h3 className="font-serif text-lg leading-snug sm:text-xl">
                            {product.name || product.title || "Jewellery item"}
                          </h3>

                          {product.category && (
                            <p className="mt-1 text-xs text-stone-500">
                              {product.category}
                            </p>
                          )}

                          <p className="mt-3 text-sm text-stone-500">
                            Quantity: {quantity}
                          </p>

                          <p className="mt-2 font-semibold">
                            {formatPrice(price * quantity)}
                          </p>

                          <p className="mt-1 text-xs text-stone-400">
                            {formatPrice(price)} per item
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Shipping address */}
            <section className="border border-[#E9E0D1] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[#E9E0D1] pb-5">
                <FiMapPin size={22} className="text-[#A17C3C]" />
                <h2 className="font-serif text-2xl">Shipping Address</h2>
              </div>

              {Object.keys(address).length > 0 ? (
                <div className="mt-5 space-y-2 text-sm leading-6 text-stone-600">
                  {(address.name || address.fullName) && (
                    <p className="font-semibold text-[#173F35]">
                      {address.name || address.fullName}
                    </p>
                  )}

                  {address.phone && <p>{address.phone}</p>}
                  {address.email && <p>{address.email}</p>}

                  {address.address && <p>{address.address}</p>}
                  {address.street && <p>{address.street}</p>}
                  {address.addressLine && <p>{address.addressLine}</p>}

                  <p>
                    {[
                      address.city,
                      address.state,
                      address.postalCode || address.zipCode || address.pincode,
                      address.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              ) : (
                <p className="mt-5 text-sm leading-6 text-stone-500">
                  No shipping address was saved with this order.
                </p>
              )}
            </section>

            {/* Payment */}
            <section className="border border-[#E9E0D1] bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[#E9E0D1] pb-5">
                <FiCreditCard size={22} className="text-[#A17C3C]" />
                <h2 className="font-serif text-2xl">Payment Information</h2>
              </div>

              <div className="mt-5 space-y-4 text-sm">
                <div className="flex flex-wrap justify-between gap-3">
                  <span className="text-stone-500">Payment method</span>
                  <span className="font-medium capitalize">
                    {String(paymentMethod).replaceAll("_", " ")}
                  </span>
                </div>

                <div className="flex flex-wrap justify-between gap-3">
                  <span className="text-stone-500">Payment status</span>
                  <span className="font-medium capitalize">
                    {String(paymentStatus).replaceAll("_", " ")}
                  </span>
                </div>
              </div>

              <p className="mt-5 border-t border-[#E9E0D1] pt-4 text-xs leading-6 text-stone-400">
                Payment details reflect the information saved with this
                order. This frontend demo does not process real payments.
              </p>
            </section>
          </div>

          {/* Summary column */}
          <aside className="border border-[#E9E0D1] bg-white p-5 sm:p-7 lg:sticky lg:top-24">
            <div className="flex items-center gap-3 border-b border-[#E9E0D1] pb-5">
              <FiTruck size={22} className="text-[#A17C3C]" />
              <h2 className="font-serif text-2xl">Order Summary</h2>
            </div>

            <div className="mt-6 space-y-4 border-b border-[#E9E0D1] pb-5 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-stone-500">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-stone-500">Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-stone-500">Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between gap-3 text-emerald-700">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 py-5">
              <span className="font-serif text-xl">Total</span>
              <span className="text-xl font-semibold">
                {formatPrice(total)}
              </span>
            </div>

            <div className="border border-[#E9E0D1] bg-[#FFFEFA] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#A17C3C]">
                Thank you for choosing us
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-500">
                Your jewellery purchase is part of your personal order
                history on this device.
              </p>
            </div>

            <Link
              to="/contact"
              className="mt-5 flex items-center justify-center gap-2 border border-[#173F35] px-5 py-3.5 text-sm font-medium transition hover:bg-[#F5F1E9]"
            >
              Need help with this order? <FiArrowRight />
            </Link>

            <Link
              to="/orders"
              className="mt-3 flex items-center justify-center gap-2 bg-[#173F35] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#245647]"
            >
              <FiArrowLeft /> All orders
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
