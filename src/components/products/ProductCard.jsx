
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiHeart, FiShoppingBag, FiEye } from "react-icons/fi";
import { toast } from "sonner";

import { selectIsCustomerLoggedIn } from "../../features/auth/authSlice";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { formatPrice } from "../../utils/formatPrice";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useSelector(selectIsCustomerLoggedIn);
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();

  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const productId = product.id ?? product._id;
  const productName = product.name ?? product.title ?? "Jewellery Piece";
  const price = Number(product.price ?? 0);
  const originalPrice = Number(
    product.originalPrice ?? product.original_price ?? 0
  );

  // Support common image field names.
  const rawImage =
    product.image ??
    product.Image ??
    product.images?.[0]?.url ??
    product.images?.[0] ??
    product.thumbnail ??
    product.imageUrl ??
    product.image_url ??
    "";

  const imageSrc =
    typeof rawImage === "string"
      ? rawImage
      : rawImage?.url ?? rawImage?.src ?? "";

  const saved = isWishlisted(productId);
  const available = Number(product.stock ?? 0) > 0;

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

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!requireLogin()) return;

    if (!available) {
      toast.error("This piece is currently out of stock.");
      return;
    }

    try {
      addItem(product, 1);
      toast.success(`${productName} added to your bag.`);
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("Unable to add this item. Please try again.");
    }
  };

  const handleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!requireLogin()) return;

    try {
      toggleItem(product);
      toast.success(
        saved ? "Removed from your wishlist." : "Saved to your wishlist."
      );
    } catch (error) {
      console.error("Wishlist update failed:", error);
      toast.error("Unable to update your wishlist.");
    }
  };

  return (
    <article className="group relative overflow-hidden border border-[#E9E0D1] bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#B18B4B]/60 hover:shadow-xl hover:shadow-[#173F35]/10">
      {/* Product image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F1E9]">
        <Link
          to={`/product/${productId}`}
          className="block h-full w-full"
          aria-label={`View ${productName}`}
        >
          {imageSrc && !imageError ? (
            <img
              src={imageSrc}
              alt={productName}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[#A17C3C]">
              <FiShoppingBag size={36} />
              <span className="px-4 text-center text-xs">
                Image unavailable
              </span>
            </div>
          )}
        </Link>

        {originalPrice > price && price > 0 && (
          <span className="absolute left-3 top-3 bg-[#173F35] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            {Math.round(((originalPrice - price) / originalPrice) * 100)}% Off
          </span>
        )}

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#173F35] shadow-sm transition hover:bg-white"
        >
          <FiHeart
            size={18}
            className={saved ? "fill-red-500 text-red-500" : ""}
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!available}
            className="flex w-full items-center justify-center gap-2 bg-[#173F35]/95 px-4 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#245647] disabled:cursor-not-allowed disabled:bg-stone-500"
          >
            <FiShoppingBag size={16} />
            {available ? "Add to Bag" : "Out of Stock"}
          </button>
        </div>

        <Link
          to={`/product/${productId}`}
          aria-label={`View details for ${productName}`}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#173F35] shadow transition hover:bg-[#E9F0E8] sm:opacity-0 sm:group-hover:opacity-100"
        >
          <FiEye size={17} />
        </Link>
      </div>

      {/* Product information */}
      <div className="p-4 sm:p-5">
        <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#A17C3C]">
          {product.category ?? "Collection"}
        </p>

        <Link to={`/product/${productId}`}>
          <h3 className="line-clamp-2 font-serif text-lg text-[#173F35] transition-colors hover:text-[#A17C3C]">
            {productName}
          </h3>
        </Link>

        {product.rating != null && (
          <p className="mt-2 text-xs text-[#A17C3C]">
            ★★★★★ <span className="text-stone-500">{product.rating}</span>
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-base font-semibold text-[#173F35]">
            {formatPrice(price)}
          </span>

          {originalPrice > price && (
            <span className="text-sm text-stone-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
