
import { FiFilter } from "react-icons/fi";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ProductSort({
  value = "featured",
  onChange,
  count,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
      <p className="text-sm text-stone-500">
        {typeof count === "number" ? (
          <>
            <span className="font-semibold text-[#173F35]">{count}</span>{" "}
            {count === 1 ? "piece" : "pieces"} found
          </>
        ) : (
          "Discover the collection"
        )}
      </p>

      <label className="flex items-center gap-2">
        <FiFilter
          size={17}
          className="text-[#173F35]"
        />

        <span className="text-xs text-stone-500">Sort by</span>

        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="max-w-[190px] border border-stone-200 bg-white px-3 py-2.5 text-sm text-[#173F35] outline-none focus:border-[#173F35]"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
