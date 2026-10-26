
import { Link } from "react-router-dom";
import { FiArrowRight, FiX } from "react-icons/fi";
import { useState } from "react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-[#173F35] px-8 py-2.5 text-center text-xs tracking-wide text-white sm:text-sm">
      <p className="inline-flex flex-wrap items-center justify-center gap-2 pr-5">
        <span className="font-semibold tracking-widest text-[#E5C68A]">
          THE NEXA PRIVILEGE
        </span>

        <span className="hidden text-white/50 sm:inline">|</span>

        <span>
          Complimentary shipping on orders above ₹2,999
        </span>

        <Link
          to="/shop"
          className="inline-flex items-center gap-1 font-semibold text-[#E5C68A] underline-offset-4 hover:underline"
        >
          Explore
          <FiArrowRight size={13} />
        </Link>
      </p>

      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/80 transition hover:bg-white/10 hover:text-white sm:right-5"
      >
        <FiX size={16} />
      </button>
    </div>
  );
}
