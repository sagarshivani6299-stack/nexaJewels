
import { FiMinus, FiPlus } from "react-icons/fi";

export default function QuantitySelector({
  quantity = 1,
  onChange,
  min = 1,
  max = Infinity,
  disabled = false,
}) {
  const decrease = () => {
    if (!disabled && quantity > min) {
      onChange(quantity - 1);
    }
  };

  const increase = () => {
    if (!disabled && quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div
      className={`inline-flex h-10 items-center border border-stone-200 bg-white ${
        disabled ? "opacity-50" : ""
      }`}
      aria-label="Product quantity selector"
    >
      <button
        type="button"
        onClick={decrease}
        disabled={disabled || quantity <= min}
        aria-label="Decrease quantity"
        className="flex h-full w-10 items-center justify-center text-[#173F35] transition hover:bg-[#F5F0E7] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <FiMinus size={14} />
      </button>

      <span
        aria-live="polite"
        className="min-w-9 px-2 text-center text-sm font-semibold text-[#173F35]"
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={increase}
        disabled={disabled || quantity >= max}
        aria-label="Increase quantity"
        className="flex h-full w-10 items-center justify-center text-[#173F35] transition hover:bg-[#F5F0E7] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <FiPlus size={14} />
      </button>
    </div>
  );
}
