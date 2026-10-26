
import {
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
} from "react-icons/fi";

export default function StatsCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  format = "text",
}) {
  const trend =
    typeof change === "number"
      ? change > 0
        ? "up"
        : change < 0
          ? "down"
          : "flat"
      : "flat";

  const formattedValue =
    format === "currency" && typeof value === "number"
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(value)
      : value;

  const TrendIcon =
    trend === "up"
      ? FiTrendingUp
      : trend === "down"
        ? FiTrendingDown
        : FiMinus;

  return (
    <article className="border border-stone-200 bg-white p-5 transition hover:border-[#D9BD82] hover:shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-stone-500">{title}</p>
          <p className="mt-3 break-words font-serif text-2xl text-[#173F35] sm:text-3xl">
            {formattedValue ?? "—"}
          </p>
        </div>

        {Icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F5F0E7] text-[#A9854D]">
            <Icon size={21} />
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
        {typeof change === "number" && (
          <span
            className={`inline-flex items-center gap-1 font-semibold ${
              trend === "up"
                ? "text-emerald-700"
                : trend === "down"
                  ? "text-red-600"
                  : "text-stone-500"
            }`}
          >
            <TrendIcon size={14} />
            {Math.abs(change)}%
          </span>
        )}

        {description && (
          <span className="text-stone-500">{description}</span>
        )}
      </div>
    </article>
  );
}
