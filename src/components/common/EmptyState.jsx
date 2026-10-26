
import { Link } from "react-router-dom";
import { FiArrowRight, FiPackage, FiShoppingBag } from "react-icons/fi";

export default function EmptyState({
  title = "Nothing to see here yet",
  description = "Explore our collection and discover something you love.",
  actionLabel = "Explore Collection",
  actionTo = "/shop",
  icon = "shopping",
  onAction,
}) {
  const Icon = icon === "package" ? FiPackage : FiShoppingBag;

  return (
    <section className="flex min-h-[360px] flex-col items-center justify-center px-5 py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#E5D9C3] bg-[#F8F5EE] text-[#173F35]">
        <Icon size={31} strokeWidth={1.4} />
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#B18B4B]">
        A Little Something Is Missing
      </p>

      <h2 className="max-w-xl font-serif text-3xl text-[#173F35] sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 max-w-md text-sm leading-7 text-stone-500 sm:text-base">
        {description}
      </p>

      {onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-8 inline-flex items-center gap-2 bg-[#173F35] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#245B4D]"
        >
          {actionLabel}
          <FiArrowRight size={16} />
        </button>
      ) : (
        <Link
          to={actionTo}
          className="mt-8 inline-flex items-center gap-2 bg-[#173F35] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#245B4D]"
        >
          {actionLabel}
          <FiArrowRight size={16} />
        </Link>
      )}
    </section>
  );
}
