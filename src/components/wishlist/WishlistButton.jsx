
import { FiHeart } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { useWishlist } from "../../hooks/useWishlist";
import { selectIsCustomerLoggedIn } from "../../features/auth/authSlice";

export default function WishlistButton({
  product,
  className = "",
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useSelector(selectIsCustomerLoggedIn);
  const { toggleItem, isWishlisted } = useWishlist();

  if (!product) return null;

  const saved = isWishlisted(product.id);

  const handleWishlistClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isLoggedIn) {
      toast("Please log in to use your wishlist.", {
        action: {
          label: "Log in",
          onClick: () => {
            navigate("/login", {
              state: {
                from: location,
                message: "Please log in to use your wishlist.",
              },
            });
          },
        },
      });

      return;
    }

    toggleItem(product);

    toast.success(
      saved
        ? "Removed from your wishlist."
        : "Added to your wishlist."
    );
  };

  return (
    <button
      type="button"
      onClick={handleWishlistClick}
      aria-label={
        saved
          ? `Remove ${product.name} from wishlist`
          : `Add ${product.name} to wishlist`
      }
      aria-pressed={saved}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white shadow-sm transition hover:scale-105 ${
        saved
          ? "text-red-500"
          : "text-[#173F35] hover:text-red-500"
      } ${className}`}
    >
      <FiHeart
        size={19}
        fill={saved ? "currentColor" : "none"}
      />
    </button>
  );
}
