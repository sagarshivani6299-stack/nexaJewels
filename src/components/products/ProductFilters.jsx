
import { FiSearch, FiX } from "react-icons/fi";
import categories from "../../data/categories";

export default function ProductFilters({
  filters,
  onChange,
  onClear,
}) {
  const updateFilter = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <section className="shop-filter-card border border-[#E6DCCB] bg-[#FFFEFA] p-4 sm:p-5 lg:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-serif text-xl text-[#173F35]">
          Refine Your Selection
        </h2>

        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-[#173F35]"
        >
          <FiX size={14} /> Clear all
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="product-search"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-600"
          >
            Search
          </label>

          <div className="flex items-center gap-2 border border-stone-200 px-3">
            <FiSearch className="shrink-0 text-stone-400" />
            <input
              id="product-search"
              type="search"
              value={filters.search ?? ""}
              onChange={(event) =>
                updateFilter("search", event.target.value)
              }
              placeholder="Find your favourite..."
              className="min-w-0 flex-1 py-3 text-sm outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="product-category"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-600"
          >
            Category
          </label>

          <select
            id="product-category"
            value={filters.category ?? "all"}
            onChange={(event) =>
              updateFilter("category", event.target.value)
            }
            className="w-full border border-stone-200 bg-white px-3 py-3 text-sm text-stone-700 outline-none focus:border-[#173F35]"
          >
            <option value="all">All Jewellery</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.slug ?? category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-600">
            Price Range (₹)
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="minimum-price"
                className="mb-1 block text-xs text-stone-500"
              >
                Minimum
              </label>
              <input
                id="minimum-price"
                type="number"
                min="0"
                value={filters.minPrice ?? ""}
                onChange={(event) =>
                  updateFilter("minPrice", event.target.value)
                }
                placeholder="₹ 0"
                className="w-full border border-stone-200 px-3 py-3 text-sm outline-none focus:border-[#173F35]"
              />
            </div>

            <div>
              <label
                htmlFor="maximum-price"
                className="mb-1 block text-xs text-stone-500"
              >
                Maximum
              </label>
              <input
                id="maximum-price"
                type="number"
                min="0"
                value={filters.maxPrice ?? ""}
                onChange={(event) =>
                  updateFilter("maxPrice", event.target.value)
                }
                placeholder="No limit"
                className="w-full border border-stone-200 px-3 py-3 text-sm outline-none focus:border-[#173F35]"
              />
            </div>
          </div>

          {filters.minPrice !== "" &&
            filters.minPrice != null &&
            filters.maxPrice !== "" &&
            filters.maxPrice != null &&
            Number(filters.minPrice) > Number(filters.maxPrice) && (
              <p role="alert" className="mt-2 text-xs text-red-600">
                Minimum price cannot exceed maximum price.
              </p>
            )}
        </div>

        <button
          type="button"
          onClick={onClear}
          className="w-full bg-[#173F35] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#245B4D]"
        >
          Reset Filters
        </button>
      </div>
    </section>
  );
}
