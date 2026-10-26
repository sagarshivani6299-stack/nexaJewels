
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";

import { useCart } from "../../hooks/useCart";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

export default function Cart() {
  const navigate = useNavigate();
  const { items, subtotal, isEmpty } = useCart();

  const money = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const shipping = subtotal >= 5000 ? 0 : 199;
  const total = subtotal + shipping;

  const remainingForFreeShipping = Math.max(0, 5000 - subtotal);
  const shippingProgress = Math.min((subtotal / 5000) * 100, 100);

  return (
    <main className="cart-page min-h-screen overflow-hidden bg-[#F0EEE6] text-[#173F35]">
      <style>{`
        @keyframes cartReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cartFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        .cart-reveal {
          animation: cartReveal .65s ease-out both;
        }

        .cart-delay-1 {
          animation-delay: .12s;
        }

        .cart-delay-2 {
          animation-delay: .22s;
        }

        .cart-float {
          animation: cartFloat 4s ease-in-out infinite;
        }

        .cart-action {
          transition:
            background .25s ease,
            color .25s ease,
            transform .25s ease;
        }

        .cart-action:hover {
          transform: translateY(-2px);
        }

        .cart-progress {
          transition: width .6s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .cart-reveal,
          .cart-float {
            animation: none !important;
          }

          .cart-action,
          .cart-progress {
            transition: none !important;
          }
        }
      `}</style>

      {/* Empty Cart */}
      {isEmpty ? (
        <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-5 py-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full border border-[#B18B4B]/20" />

          <div className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-[#DDE6DA]/70 blur-3xl" />

          <div className="cart-reveal relative w-full max-w-xl border border-[#DED7C9] bg-[#FFFEFA] px-6 py-14 text-center shadow-sm sm:px-12">
            <div className="cart-float mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#173F35] text-[#E6C990]">
              <FiShoppingBag size={30} />
            </div>

            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A17C3C]">
              Your collection awaits
            </p>

            <h1 className="mt-4 font-serif text-3xl leading-tight sm:text-5xl">
              A little space for something beautiful.
            </h1>

            <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-stone-500">
              Your bag is empty for now. Discover thoughtfully selected
              jewellery made to become part of your story.
            </p>

            <Link
              to="/shop"
              className="cart-action mt-8 inline-flex items-center justify-center gap-3 bg-[#173F35] px-7 py-4 text-sm font-semibold text-white hover:bg-[#245647]"
            >
              <FiShoppingBag size={17} />
              Explore the collection
              <FiArrowRight size={16} />
            </Link>

            <div className="mt-10 border-t border-[#E9E0D1] pt-6">
              <Link
                to="/"
                className="text-xs text-stone-500 underline underline-offset-4 transition hover:text-[#A17C3C]"
              >
                Return to homepage
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Cart Hero */}
          <section className="relative overflow-hidden border-b border-[#DCD7C9] bg-[#173F35] text-[#FFFEFA]">
            <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-[#D9BD82]/20 sm:h-96 sm:w-96" />

            <div className="pointer-events-none absolute -right-4 -top-16 h-60 w-60 rounded-full border border-[#D9BD82]/15" />

            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#2D5A49]/70 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 py-12 sm:py-16 lg:px-8 lg:py-20">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-[#E6C990]"
              >
                <FiArrowLeft size={16} />
                Continue shopping
              </Link>

              <div className="cart-reveal mt-9 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D9BD82] sm:text-xs">
                    Thoughtfully chosen, beautifully yours
                  </p>

                  <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                    Your Shopping Bag
                  </h1>

                  <p className="mt-4 max-w-lg text-sm leading-7 text-white/65">
                    Every piece tells a story. Review your selection before
                    making it a part of yours.
                  </p>
                </div>

                <div className="flex items-center gap-3 text-sm text-white/75">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D9BD82]/30 bg-white/5 text-[#E6C990]">
                    <FiShoppingBag size={19} />
                  </span>

                  <span>
                    {items.length}{" "}
                    {items.length === 1 ? "piece" : "pieces"} selected
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Cart Body */}
          <section className="mx-auto max-w-7xl px-5 py-9 sm:py-12 lg:px-8 lg:py-14">
            {/* Free Shipping Progress */}
            <div className="cart-reveal mb-8 border border-[#DED7C9] bg-[#FFFEFA] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <FiTruck
                  className="mt-1 shrink-0 text-[#A17C3C]"
                  size={22}
                />

                <div className="flex-1">
                  <p className="text-sm font-medium text-[#173F35]">
                    {remainingForFreeShipping === 0
                      ? "You've unlocked complimentary shipping!"
                      : `You're ${money(remainingForFreeShipping)} away from complimentary shipping.`}
                  </p>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#E9E3D8]">
                    <div
                      className="cart-progress h-full rounded-full bg-[#A17C3C]"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>

                  <p className="mt-2 text-xs leading-5 text-stone-500">
                    Complimentary shipping on orders of ₹5,000 or more.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-[1.5fr_0.8fr] lg:gap-10">
              {/* Cart Items */}
              <div className="cart-reveal min-w-0">
                <div className="mb-5 flex items-end justify-between gap-3 border-b border-[#DCD7C9] pb-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A17C3C]">
                      Your favourites
                    </p>

                    <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                      Shopping Bag
                    </h2>
                  </div>

                  <span className="text-xs text-stone-500">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="divide-y divide-[#E9E0D1] border-y border-[#DED7C9] bg-[#FFFEFA]">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>

                <Link
                  to="/shop"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#173F35] transition hover:text-[#A17C3C]"
                >
                  <FiArrowLeft size={16} />
                  Discover more jewellery
                </Link>
              </div>

              {/* Order Summary */}
              <aside className="cart-reveal cart-delay-1 border border-[#DED7C9] bg-[#FFFEFA] p-5 shadow-sm sm:p-7 lg:sticky lg:top-24">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A17C3C]">
                  Almost yours
                </p>

                <h2 className="mt-3 font-serif text-3xl text-[#173F35]">
                  Order Summary
                </h2>

                <p className="mt-2 text-sm leading-6 text-stone-500">
                  A final look at your selected pieces.
                </p>

                <div className="mt-7 space-y-4 border-b border-[#E9E0D1] pb-5">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-stone-500">Subtotal</span>
                    <span className="font-medium text-[#173F35]">
                      {money(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-stone-500">Shipping</span>

                    <span className="font-medium text-[#173F35]">
                      {shipping === 0 ? "Complimentary" : money(shipping)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 py-5">
                  <span className="font-serif text-xl">Estimated total</span>

                  <span className="text-xl font-semibold text-[#173F35]">
                    {money(total)}
                  </span>
                </div>

                <CartSummary
                  subtotal={subtotal}
                  onCheckout={() => navigate("/checkout")}
                />

                <p className="mt-5 border-t border-[#E9E0D1] pt-5 text-xs leading-6 text-stone-500">
                  Your order details and delivery address will be confirmed
                  during checkout.
                </p>
              </aside>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
