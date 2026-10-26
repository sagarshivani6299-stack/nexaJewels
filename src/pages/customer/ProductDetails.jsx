
import { useState } from "react";
import {
  Link,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiHeart,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import { toast } from "sonner";

import { selectIsCustomerLoggedIn } from "../../features/auth/authSlice";
import { useProduct } from "../../hooks/useProduct";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { formatPrice } from "../../utils/formatPrice";
import ProductGallery from "../../components/products/ProductGallery";
import PageLoader from "../../components/common/PageLoader";
import ErrorState from "../../components/common/ErrorState";
import QuantitySelector from "../../components/cart/QuantitySelector";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useSelector(selectIsCustomerLoggedIn);

  const {
    product,
    isLoading,
    isError,
    error,
    refetch,
  } = useProduct(id);

  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();

  const [quantity, setQuantity] = useState(1);

  const requireLogin = () => {
    if (isLoggedIn) return true;

    toast("Please log in to continue.", {
      action: {
        label: "Log in",
        onClick: () => {
          navigate("/login", {
            state: {
              from: location,
              message: "Please log in to continue.",
            },
          });
        },
      },
    });

    return false;
  };

  if (isLoading) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#FFFEFA] via-[#FAF7EF] to-[#F0E7D7] text-[#173F35]">
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#D9BD82]/15 blur-3xl" />
        <div className="relative">
          <PageLoader message="Finding your perfect piece..." />
        </div>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#FFFEFA] via-[#FAF7EF] to-[#F0E7D7] px-5 py-16 text-[#173F35]">
        <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#174A3D]/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#A17C3C]">
            Product details
          </p>

          <ErrorState
            title="We couldn't find this piece"
            message={
              error?.message ||
              `Product not found. Requested ID: ${id ?? "missing"}`
            }
            onRetry={refetch}
            showHomeLink
          />
        </div>
      </main>
    );
  }

  const productId = product.id ?? product._id ?? product.productId;
  const productName = product.name ?? product.title ?? "Jewellery Piece";
  const available = Number(product.stock ?? 0) > 0;
  const saved = isWishlisted(productId);

  const handleAddToCart = () => {
    if (!requireLogin()) return;

    if (!available) {
      toast.error("This piece is currently out of stock.");
      return;
    }

    try {
      addItem(product, quantity);
      toast.success(`${productName} added to your bag.`);
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("Unable to add this item. Please try again.");
    }
  };

  const handleWishlist = () => {
    if (!requireLogin()) return;

    try {
      toggleItem(product);

      toast.success(
        saved
          ? "Removed from your wishlist."
          : "Saved to your wishlist."
      );
    } catch (error) {
      console.error("Wishlist update failed:", error);
      toast.error("Unable to update your wishlist. Please try again.");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#FFFEFA] via-[#FAF7EF] to-[#F0E7D7] text-[#173F35]">
      {/* Ambient emerald and champagne background */}
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full border border-[#B89552]/15" />
      <div className="pointer-events-none absolute -right-40 top-[35%] h-96 w-96 rounded-full bg-[#174A3D]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-[65%] h-80 w-80 -translate-x-1/2 rounded-full bg-[#D9BD82]/[0.08] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-[#756F63] transition hover:text-[#A17C3C]"
        >
          <FiArrowLeft />
          Back to collection
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0 overflow-hidden rounded-2xl border border-[#D9BD82]/35 bg-white/50 p-3 shadow-xl shadow-[#173F35]/[0.06] sm:p-5">
            <ProductGallery product={product} />
          </div>

          <div className="py-2 lg:py-8">
            <p className="text-xs uppercase tracking-[0.25em] text-[#A17C3C]">
              {product.category}
            </p>

            <h1 className="mt-4 font-serif text-4xl leading-tight text-[#123D31] sm:text-5xl">
              {productName}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-2xl font-semibold text-[#173F35]">
                {formatPrice(product.price)}
              </span>

              {Number(product.originalPrice) > Number(product.price) && (
                <>
                  <span className="text-[#9A9182] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>

                  <span className="rounded-md border border-[#B89552]/40 bg-[#D9BD82]/15 px-2 py-1 text-xs font-semibold text-[#8A682E]">
                    {Math.round(
                      ((Number(product.originalPrice) -
                        Number(product.price)) /
                        Number(product.originalPrice)) *
                        100
                    )}
                    % OFF
                  </span>
                </>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-[#756F63]">
              <span className="text-[#B89552]">★★★★★</span>
              <span>{product.rating ?? "New"}</span>

              {product.reviews != null && (
                <span>({product.reviews} reviews)</span>
              )}
            </div>

            <p className="mt-7 text-sm leading-8 text-[#756F63]">
              {product.description ||
                "Discover the details of this timeless piece."}
            </p>

            {product.material && (
              <div className="mt-6 border-y border-[#B89552]/25 py-4">
                <p className="text-xs uppercase tracking-wider text-[#8C806B]">
                  Material &amp; Finish
                </p>

                <p className="mt-2 text-sm font-medium text-[#173F35]">
                  {product.material}
                </p>
              </div>
            )}

            <div className="mt-5 flex items-center gap-2 text-sm">
              <FiCheck
                className={
                  available ? "text-[#28714F]" : "text-red-600"
                }
              />

              <span
                className={
                  available ? "text-[#28714F]" : "text-red-600"
                }
              >
                {available
                  ? "Available to order"
                  : "Currently out of stock"}
              </span>
            </div>

            {available && (
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <QuantitySelector
                  quantity={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={Number(product.stock)}
                />

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="min-h-12 flex-1 rounded-xl border border-[#174A3D] bg-gradient-to-r from-[#123D31] to-[#174A3D] px-6 py-3 text-sm font-semibold text-[#FFFDF7] shadow-[0_8px_25px_rgba(18,61,49,0.12)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(18,61,49,0.2)] focus:outline-none focus:ring-2 focus:ring-[#B89552] focus:ring-offset-2 focus:ring-offset-[#FFFEFA]"
                >
                  Add to Bag ·{" "}
                  {formatPrice(Number(product.price) * quantity)}
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleWishlist}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#B89552]/40 bg-white/50 px-5 py-3 text-sm text-[#173F35] transition duration-300 hover:border-[#B89552] hover:bg-[#D9BD82]/10"
            >
              <FiHeart
                className={
                  saved ? "fill-rose-500 text-rose-600" : "text-[#8C806B]"
                }
              />
              {saved ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>

            <div className="mt-8 grid gap-5 border-t border-[#B89552]/25 pt-6 sm:grid-cols-2">
              <div className="flex gap-3">
                <FiTruck
                  className="mt-1 shrink-0 text-[#A17C3C]"
                  size={20}
                />

                <div>
                  <p className="text-sm font-medium text-[#173F35]">
                    Thoughtful Delivery
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#8C806B]">
                    Shipping options are confirmed at checkout.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <FiShield
                  className="mt-1 shrink-0 text-[#A17C3C]"
                  size={20}
                />

                <div>
                  <p className="text-sm font-medium text-[#173F35]">
                    Made for Keeps
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#8C806B]">
                    Refer to our care guide to help preserve your jewellery.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/shipping-returns"
              className="mt-6 inline-block text-xs text-[#756F63] underline underline-offset-4 transition hover:text-[#A17C3C]"
            >
              Shipping, returns and care information
            </Link>
          </div>
        </div>

        <section className="my-20 overflow-hidden rounded-3xl border border-[#D9BD82]/25 bg-gradient-to-br from-[#0B2C23] via-[#123D31] to-[#09251E] px-5 py-14 text-center text-[#FFFDF7] sm:px-10 sm:py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#E4C989]">
            Complete your look
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#FFFDF7] sm:text-4xl">
            Find another favourite
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/65">
            Explore more timeless pieces and discover something special
            for yourself or someone you love.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-3 border border-[#E4C989] bg-gradient-to-r from-[#D9BD82] to-[#EBD8A5] px-7 py-4 text-sm font-semibold text-[#12372F] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(217,189,130,0.18)]"
          >
            Explore collection
            <FiArrowRight />
          </Link>
        </section>
      </div>
    </main>
  );
}
