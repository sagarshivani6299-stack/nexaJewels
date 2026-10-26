
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiMapPin,
  FiPackage,
  FiShield,
  FiShoppingBag,
  FiTruck,
  FiUser,
} from "react-icons/fi";
import { toast } from "sonner";
import { getCustomer, readStorage, writeStorage } from "../../utils/storage";
import { useCart } from "../../hooks/useCart";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  payment: "cod",
};

export default function Checkout() {
  const navigate = useNavigate();

  const {
    items: cart,
    subtotal,
    emptyCart,
  } = useCart();

  const [customer, setCustomer] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const currentCustomer = getCustomer();

    setCustomer(currentCustomer || null);

    if (currentCustomer) {
      setForm((previous) => ({
        ...previous,
        name: currentCustomer.name || previous.name,
        email: currentCustomer.email || previous.email,
        phone: currentCustomer.phone || previous.phone,
      }));
    }
  }, []);

  const shipping = subtotal === 0 || subtotal >= 5000 ? 0 : 199;
  const total = subtotal + shipping;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!cart.length) {
      toast.error("Your cart is empty.");
      navigate("/shop");
      return;
    }

    const requiredFields = [
      "name",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
    ];

    const missingField = requiredFields.find(
      (field) => !String(form[field] || "").trim()
    );

    if (missingField) {
      toast.error("Please fill in all delivery address fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/^[0-9]{6}$/.test(form.pincode)) {
      toast.error("Please enter a valid 6-digit PIN code.");
      return;
    }

    setSubmitting(true);

    try {
      const orderId = `NJ-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 7)
        .toUpperCase()}`;

      const order = {
        id: orderId,
        _id: orderId,
        orderNumber: orderId,
        createdAt: new Date().toISOString(),
        customerId: customer?.id ?? null,
        customerEmail: form.email.trim(),
        customerName: form.name.trim(),
        items: cart.map((item) => ({ ...item })),
        shippingAddress: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          pincode: form.pincode.trim(),
        },
        subtotal,
        shipping,
        total,
        paymentMethod: form.payment,
        paymentStatus: "pending",
        status: "pending",
      };

      const existingOrders = readStorage("nj_orders", []);
      const orders = Array.isArray(existingOrders) ? existingOrders : [];
      const updatedOrders = [order, ...orders];

      const saved = writeStorage("nj_orders", updatedOrders);

      if (!saved) {
        toast.error("Could not save your order. Please try again.");
        return;
      }

      // Verify that the order was saved before clearing the cart.
      const savedOrders = readStorage("nj_orders", []);
      const savedOrder = Array.isArray(savedOrders)
        ? savedOrders.find((item) => item.id === orderId)
        : null;

      if (!savedOrder) {
        toast.error("Order could not be verified. Please try again.");
        return;
      }

      emptyCart();

      toast.success("Your order has been placed successfully!");

      navigate("/order-success", {
        replace: true,
        state: { order: savedOrder },
      });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong while placing your order.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!cart.length) {
    return (
      <main className="min-h-[70vh] bg-[#FFFEFA] px-4 py-20 text-[#173F35]">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#173F35]/5">
            <FiShoppingBag className="text-3xl text-[#173F35]" />
          </div>

          <h1 className="font-serif text-3xl font-semibold">
            Your bag is empty
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#173F35]/65">
            Add your favourite pieces to your bag before proceeding to checkout.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#173F35] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#24594B]"
          >
            Explore Collection <FiArrowRight />
          </Link>

          <div className="mt-5">
            <Link
              to="/cart"
              className="text-sm text-[#173F35]/70 underline underline-offset-4"
            >
              Return to cart
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFEFA] px-4 py-10 text-[#173F35] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm text-[#173F35]/70 transition hover:text-[#A17C3C]"
        >
          <FiArrowLeft /> Back to cart
        </Link>

        <div className="mb-10 mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A17C3C]">
            NexaJewels
          </p>

          <h1 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
            Secure Checkout
          </h1>

          <p className="mt-3 text-sm text-[#173F35]/65">
            Complete your delivery details to place your order.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[#173F35]/70">
            <span className="flex items-center gap-2">
              <FiCheckCircle className="text-[#A17C3C]" />
              Shopping Bag
            </span>
            <span className="h-px w-8 bg-[#A17C3C]/40" />
            <span className="flex items-center gap-2 font-semibold text-[#173F35]">
              <FiMapPin className="text-[#A17C3C]" />
              Delivery
            </span>
            <span className="h-px w-8 bg-[#A17C3C]/40" />
            <span className="flex items-center gap-2">
              <FiPackage />
              Confirmation
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_390px]">
            <div className="space-y-6">
              <section className="rounded-2xl border border-[#173F35]/10 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#173F35]/5">
                    <FiUser className="text-xl" />
                  </div>

                  <div>
                    <h2 className="font-serif text-xl font-semibold">
                      Contact Information
                    </h2>
                    <p className="mt-1 text-xs text-[#173F35]/60">
                      Where we can reach you about your order.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />

                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />

                  <FormField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-[#173F35]/10 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#173F35]/5">
                    <FiMapPin className="text-xl" />
                  </div>

                  <div>
                    <h2 className="font-serif text-xl font-semibold">
                      Delivery Address
                    </h2>
                    <p className="mt-1 text-xs text-[#173F35]/60">
                      Enter the address where your order should arrive.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <FormField
                      label="Street Address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House number, street, area"
                    />
                  </div>

                  <FormField
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Your city"
                  />

                  <FormField
                    label="State"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="Your state"
                  />

                  <FormField
                    label="PIN Code"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="6-digit PIN code"
                    inputMode="numeric"
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-[#173F35]/10 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#173F35]/5">
                    <FiShield className="text-xl" />
                  </div>

                  <div>
                    <h2 className="font-serif text-xl font-semibold">
                      Payment Method
                    </h2>
                    <p className="mt-1 text-xs text-[#173F35]/60">
                      Choose how you would like to pay.
                    </p>
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#A17C3C]/50 bg-[#A17C3C]/5 p-4">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={form.payment === "cod"}
                    onChange={handleChange}
                    className="mt-1 accent-[#173F35]"
                  />

                  <span>
                    <span className="block text-sm font-semibold">
                      Cash on Delivery
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-[#173F35]/60">
                      Pay when your order arrives. Online payment is not
                      enabled in this frontend-only checkout.
                    </span>
                  </span>
                </label>
              </section>
            </div>

            <aside className="rounded-2xl border border-[#173F35]/10 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-24">
              <div className="mb-5 flex items-center gap-3">
                <FiShoppingBag className="text-xl" />
                <h2 className="font-serif text-xl font-semibold">
                  Order Summary
                </h2>
              </div>

              <p className="mb-5 text-sm text-[#173F35]/65">
                {cart.reduce(
                  (sum, item) => sum + (Number(item.quantity) || 1),
                  0
                )}{" "}
                item(s) in your bag
              </p>

              <div className="max-h-72 space-y-4 overflow-y-auto pr-1">
                {cart.map((item, index) => {
                  const quantity = Number(item.quantity) || 1;
                  const price = Number(item.price) || 0;
                  const name = item.name || item.title || "Jewellery Item";
                  const image =
                    item.image ||
                    item.Image ||
                    item.thumbnail ||
                    item.images?.[0];

                  return (
                    <div
                      key={item.id ?? item._id ?? `${name}-${index}`}
                      className="flex gap-3 border-b border-[#173F35]/10 pb-4"
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          className="h-20 w-16 rounded-lg bg-[#F6F2EA] object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-16 items-center justify-center rounded-lg bg-[#F6F2EA]">
                          <FiShoppingBag className="text-xl text-[#173F35]/50" />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium">
                          {name}
                        </p>

                        <p className="mt-1 text-xs text-[#173F35]/60">
                          Qty: {quantity}
                        </p>

                        <p className="mt-2 text-sm font-semibold">
                          {formatPrice(price * quantity)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-[#173F35]/65">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="flex items-center gap-2 text-[#173F35]/65">
                    <FiTruck /> Shipping
                  </span>
                  <span>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>

                {subtotal > 0 && subtotal < 5000 && (
                  <p className="text-xs leading-5 text-[#173F35]/60">
                    Add {formatPrice(5000 - subtotal)} more to unlock free
                    shipping.
                  </p>
                )}
              </div>

              <div className="my-5 border-t border-[#173F35]/15" />

              <div className="flex items-center justify-between gap-3">
                <span className="font-serif text-lg font-semibold">
                  Total
                </span>
                <span className="text-xl font-semibold">
                  {formatPrice(total)}
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting || !cart.length}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#173F35] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#24594B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Placing Order..." : "Place Order"}
                {!submitting && <FiArrowRight />}
              </button>

              <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-[#173F35]/60">
                <FiShield className="shrink-0" />
                Your order details are saved in this browser.
              </p>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-[#173F35]/80">
        {label} <span className="text-[#A17C3C]">*</span>
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
        required
        className="w-full rounded-xl border border-[#173F35]/15 bg-[#FFFEFA] px-4 py-3 text-sm outline-none transition placeholder:text-[#173F35]/35 focus:border-[#A17C3C] focus:ring-2 focus:ring-[#A17C3C]/10"
      />
    </label>
  );
}
