
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
    refetch,
  } = useProduct(id);

  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();

  const [quantity, setQuantity] = useState(1);

  // Guest users must log in before using cart or wishlist.
  const requireLogin = () => {
    if (isLoggedIn) {
      return true;
    }

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
    return <PageLoader message="Finding your perfect piece..." />;
  }

  if (isError || !product) {
    return (
      <ErrorState
        title="We couldn't find this piece"
        message="The product may have moved or is temporarily unavailable."
        onRetry={refetch}
        showHomeLink
      />
    );
  }

  const available = Number(product.stock ?? 0) > 0;
  const saved = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!requireLogin()) {
      return;
    }

    if (!available) {
      toast.error("This piece is currently out of stock.");
      return;
    }

    try {
      addItem(product, quantity);
      toast.success(`${product.name} added to your bag.`);
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("Unable to add this item. Please try again.");
    }
  };

  const handleWishlist = () => {
    if (!requireLogin()) {
      return;
    }

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
    <main className="min-h-screen bg-[#FFFEFA] text-[#173F35]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-stone-500 transition hover:text-[#A17C3C]"
        >
          <FiArrowLeft />
          Back to collection
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery product={product} />

          <div className="py-2 lg:py-8">
            <p className="text-xs uppercase tracking-[0.25em] text-[#A17C3C]">
              {product.category}
            </p>

            <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-2xl font-semibold">
                {formatPrice(product.price)}
              </span>

              {Number(product.originalPrice) > Number(product.price) && (
                <>
                  <span className="text-stone-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>

                  <span className="bg-[#E9F0E8] px-2 py-1 text-xs font-semibold text-[#245B4D]">
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

            <div className="mt-5 flex items-center gap-2 text-sm text-stone-500">
              <span className="text-[#B18B4B]">★★★★★</span>
              <span>{product.rating ?? "New"}</span>

              {product.reviews != null && (
                <span>({product.reviews} reviews)</span>
              )}
            </div>

            <p className="mt-7 text-sm leading-8 text-stone-600">
              {product.description}
            </p>

            {product.material && (
              <div className="mt-6 border-y border-[#E9E0D1] py-4">
                <p className="text-xs uppercase tracking-wider text-stone-500">
                  Material &amp; Finish
                </p>

                <p className="mt-2 text-sm font-medium">
                  {product.material}
                </p>
              </div>
            )}

            <div className="mt-5 flex items-center gap-2 text-sm">
              <FiCheck
                className={
                  available ? "text-emerald-700" : "text-red-600"
                }
              />

              <span
                className={
                  available ? "text-emerald-800" : "text-red-600"
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
                  className="min-h-12 flex-1 bg-[#173F35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#245647]"
                >
                  Add to Bag ·{" "}
                  {formatPrice(Number(product.price) * quantity)}
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleWishlist}
              className="mt-4 flex w-full items-center justify-center gap-2 border border-[#D8CFBF] px-5 py-3 text-sm transition hover:border-[#173F35]"
            >
              <FiHeart
                className={saved ? "fill-red-500 text-red-500" : ""}
              />

              {saved ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>

            <div className="mt-8 grid gap-5 border-t border-[#E9E0D1] pt-6 sm:grid-cols-2">
              <div className="flex gap-3">
                <FiTruck
                  className="mt-1 shrink-0 text-[#A17C3C]"
                  size={20}
                />

                <div>
                  <p className="text-sm font-medium">
                    Thoughtful Delivery
                  </p>

                  <p className="mt-1 text-xs leading-5 text-stone-500">
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
                  <p className="text-sm font-medium">
                    Made for Keeps
                  </p>

                  <p className="mt-1 text-xs leading-5 text-stone-500">
                    Refer to our care guide to help preserve your jewellery.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/shipping-returns"
              className="mt-6 inline-block text-xs text-stone-500 underline underline-offset-4 hover:text-[#A17C3C]"
            >
              Shipping, returns and care information
            </Link>
          </div>
        </div>

        <section className="my-20 border-t border-[#E9E0D1] py-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#A17C3C]">
            Complete your look
          </p>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
            Find another favourite
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-stone-500">
            Explore more timeless pieces and discover something special
            for yourself or someone you love.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-3 bg-[#173F35] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#245647]"
          >
            Explore collection
            <FiArrowRight />
          </Link>
        </section>
      </div>
    </main>
  );
}
