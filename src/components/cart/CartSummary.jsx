
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiTag } from "react-icons/fi";
import { toast } from "sonner";
import { formatPrice } from "../../utils/formatPrice";

const FREE_SHIPPING_THRESHOLD = 5000;
const STANDARD_SHIPPING = 199;

export default function CartSummary({
  subtotal = 0,
  onCheckout,
  checkoutDisabled = false,
}) {
  const [coupon, setCoupon] = useState("");

  const shipping =
    subtotal <= 0 || subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING;

  const total = subtotal + shipping;

  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );

  const handleCoupon = (event) => {
    event.preventDefault();

    if (!coupon.trim()) {
      toast.error("Please enter a discount code.");
      return;
    }

    toast.info(
      "Discount code verification is not available yet."
    );
  };

  const handleCheckout = () => {
    if (subtotal <= 0) {
      toast.error("Your shopping bag is empty.");
      return;
    }

    if (typeof onCheckout !== "function") {
      toast.error("Checkout is currently unavailable.");
      return;
    }

    onCheckout();
  };

  return (
    <aside className="border border-[#DED7C9] bg-[#FFFEFA] p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A17C3C]">
        Almost yours
      </p>

      <h2 className="mt-2 font-serif text-2xl text-[#173F35]">
        Order Summary
      </h2>

      {subtotal > 0 && remainingForFreeShipping > 0 && (
        <div className="mt-5 bg-[#F0EEE6] p-4">
          <p className="text-sm leading-6 text-[#173F35]">
            Add{" "}
            <span className="font-semibold">
              {formatPrice(remainingForFreeShipping)}
            </span>{" "}
            more for complimentary shipping.
          </p>

          <div
            className="mt-3 h-1.5 overflow-hidden bg-stone-200"
            role="progressbar"
            aria-label="Progress towards free shipping"
            aria-valuemin={0}
            aria-valuemax={FREE_SHIPPING_THRESHOLD}
            aria-valuenow={Math.min(
              subtotal,
              FREE_SHIPPING_THRESHOLD
            )}
          >
            <div
              className="h-full bg-[#A17C3C] transition-all duration-500"
              style={{
                width: `${Math.min(
                  100,
                  (subtotal / FREE_SHIPPING_THRESHOLD) * 100
                )}%`,
              }}
            />
          </div>
        </div>
      )}

      <form onSubmit={handleCoupon} className="mt-6">
        <label
          htmlFor="cart-coupon"
          className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-600"
        >
          Discount Code
        </label>

        <div className="flex">
          <div className="flex min-w-0 flex-1 items-center gap-2 border border-[#DED7C9] px-3">
            <FiTag className="shrink-0 text-stone-400" />

            <input
              id="cart-coupon"
              type="text"
              value={coupon}
              onChange={(event) => setCoupon(event.target.value)}
              placeholder="Enter code"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#173F35] outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-[#173F35] px-4 text-xs font-semibold text-white transition hover:bg-[#245647]"
          >
            Apply
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-4 border-b border-[#E9E0D1] pb-5 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-stone-500">Subtotal</span>
          <span className="font-medium text-[#173F35]">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-stone-500">Shipping</span>
          <span className="font-medium text-[#173F35]">
            {subtotal <= 0
              ? "—"
              : shipping === 0
                ? "Complimentary"
                : formatPrice(shipping)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 py-5">
        <span className="font-serif text-xl text-[#173F35]">
          Estimated Total
        </span>

        <span className="text-xl font-semibold text-[#173F35]">
          {formatPrice(total)}
        </span>
      </div>

      <button
        type="button"
        onClick={handleCheckout}
        disabled={
          checkoutDisabled ||
          subtotal <= 0 ||
          typeof onCheckout !== "function"
        }
        className="flex w-full items-center justify-center gap-3 bg-[#173F35] px-5 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#245647] disabled:cursor-not-allowed disabled:bg-stone-300"
      >
        Continue to Checkout
        <FiArrowRight size={17} />
      </button>

      <p className="mt-4 text-center text-xs leading-6 text-stone-500">
        Your delivery address will be collected on the next page.
      </p>

      <Link
        to="/shop"
        className="mt-5 block text-center text-sm font-medium text-[#173F35] underline underline-offset-4 transition hover:text-[#A17C3C]"
      >
        Continue Shopping
      </Link>
    </aside>
  );
}