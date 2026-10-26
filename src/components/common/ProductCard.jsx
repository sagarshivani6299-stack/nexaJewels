import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import { toast } from "sonner";
import { addToCart, getCurrentUser, getWishlist, toggleWishlist } from "../../utils/store";
import { formatPrice } from "../../data/products";

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(
    getWishlist().some((item) => item.id === product.id)
  );
  const navigate = useNavigate();

  const handleWishlist = () => {
    if (!getCurrentUser()) {
      toast.error("Please login to save your favourites");
      navigate("/login");
      return;
    }

    const added = toggleWishlist(product);
    setLiked(added);
    toast.success(added ? "Added to wishlist" : "Removed from wishlist");
  };

  const handleCart = () => {
    if (!getCurrentUser()) {
      toast.error("Please login before adding products");
      navigate("/login");
      return;
    }

    addToCart(product);
    toast.success("Added to your bag!");
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-2xl border border-[#31523D]/20 bg-[#FFF9EF] shadow-sm"
    >
      <div className="relative overflow-hidden bg-[#E9E0D0]">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
          />
        </Link>

        <button
          onClick={handleWishlist}
          aria-label="Toggle wishlist"
          className={`absolute right-3 top-3 rounded-full bg-[#FFF9EF] p-3 shadow transition ${
            liked ? "text-red-600" : "text-[#163B2B]"
          }`}
        >
          <FiHeart fill={liked ? "currentColor" : "none"} size={19} />
        </button>

        <span className="absolute bottom-3 left-3 rounded-full bg-[#163B2B] px-3 py-1 text-xs text-[#E3C77D]">
          {product.category}
        </span>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center gap-1 text-sm text-[#96743B]">
          <FiStar fill="currentColor" />
          <span>{product.rating}</span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-[#163B2B] transition hover:text-[#96743B]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            <span className="font-bold text-[#163B2B]">
              {formatPrice(product.price)}
            </span>
            <span className="ml-2 text-sm text-[#756F63] line-through">
              {formatPrice(product.oldPrice)}
            </span>
          </div>
          <button
            onClick={handleCart}
            aria-label="Add to cart"
            className="rounded-xl bg-[#163B2B] p-3 text-[#E3C77D] transition hover:bg-[#31523D]"
          >
            <FiShoppingBag size={19} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}