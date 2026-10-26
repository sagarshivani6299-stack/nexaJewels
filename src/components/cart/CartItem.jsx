
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";
import QuantitySelector from "./QuantitySelector";

export default function CartItem({ item }) {
  const {
    removeItem,
    changeQuantity,
  } = useCart();

  const stock = Number.isFinite(item.stock)
    ? Math.max(0, item.stock)
    : Infinity;

  const handleQuantityChange = (quantity) => {
    if (quantity < 1 || quantity > stock) return;

    changeQuantity(item.id, quantity);
  };

  return (
    <article className="flex gap-4 border-b border-stone-200 py-5 sm:gap-6">
      <Link
        to={`/product/${item.slug ?? item.id}`}
        className="h-32 w-24 shrink-0 overflow-hidden bg-[#F0E8DA] sm:h-40 sm:w-32"
      >
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to={`/product/${item.slug ?? item.id}`}
              className="font-serif text-lg text-[#173F35] transition hover:text-[#A9854D] sm:text-xl"
            >
              {item.name}
            </Link>

            {item.material && (
              <p className="mt-1 text-xs text-stone-500">
                {item.material}
              </p>
            )}

            <p className="mt-2 text-sm font-semibold text-[#173F35]">
              {formatPrice(item.price)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name} from cart`}
            className="shrink-0 rounded p-2 text-stone-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <FiTrash2 size={18} />
          </button>
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
          <div>
            <p className="mb-2 text-xs text-stone-500">Quantity</p>
            <QuantitySelector
              quantity={item.quantity}
              onChange={handleQuantityChange}
              min={1}
              max={stock}
              disabled={stock === 0}
            />
          </div>

          <div className="text-right">
            <p className="text-xs text-stone-500">Item total</p>
            <p className="mt-1 font-semibold text-[#173F35]">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        </div>

        {stock === 0 && (
          <p className="mt-3 text-xs text-red-600">
            This item is currently out of stock.
          </p>
        )}
      </div>
    </article>
  );
}
