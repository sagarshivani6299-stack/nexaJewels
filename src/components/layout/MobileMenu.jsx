
import { Link } from "react-router-dom";
import { FiX, FiArrowRight } from "react-icons/fi";

export default function MobileMenu({ open, onClose, links = [] }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close menu overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <aside className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-[#FAF8F3] p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-200 pb-5">
          <Link
            to="/"
            onClick={onClose}
            className="font-serif text-2xl tracking-widest text-[#173F35]"
          >
            NEXA JEWELS
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="rounded p-2 text-[#173F35] hover:bg-stone-100"
          >
            <FiX size={22} />
          </button>
        </div>

        <nav className="mt-8 flex flex-col">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className="flex items-center justify-between border-b border-stone-200 py-4 text-base text-[#173F35] transition hover:text-[#B18B4B]"
            >
              {link.label}
              <FiArrowRight size={16} />
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-stone-200 pt-5">
          <p className="font-serif text-xl text-[#173F35]">
            Jewellery made for your moments.
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-500">
            Discover timeless pieces for everyday wear and special occasions.
          </p>
        </div>
      </aside>
    </div>
  );
}
