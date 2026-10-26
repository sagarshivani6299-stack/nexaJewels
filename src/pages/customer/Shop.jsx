
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useSearchParams } from "react-router-dom";
import {
  FiSliders,
  FiX,
  FiRefreshCw,
  FiSearch,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";

import ProductFilters from "../../components/products/ProductFilters";
import ProductSort from "../../components/products/ProductSort";
import InfiniteProductLoader from "../../components/products/InfiniteProductLoader";
import categories from "../../data/categories";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "all",
    minPrice: "",
    maxPrice: "",
    sort: "featured",
  });

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: "easeOut" };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition,
    },
  };

  useEffect(() => {
    setFilters((current) => ({
      ...current,
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "all",
    }));
  }, [searchParams]);

  const updateFilters = (nextFilters) => {
    const normalized = {
      ...nextFilters,
      search: nextFilters.search ?? "",
      category: nextFilters.category || "all",
    };

    setFilters(normalized);

    const params = new URLSearchParams();

    if (normalized.search.trim()) {
      params.set("search", normalized.search.trim());
    }

    if (normalized.category !== "all") {
      params.set("category", normalized.category);
    }

    setSearchParams(params, { replace: true });
  };

  const clearFilters = () => {
    const resetFilters = {
      search: "",
      category: "all",
      minPrice: "",
      maxPrice: "",
      sort: "featured",
    };

    setFilters(resetFilters);
    setSearchParams({}, { replace: true });
  };

  const activeCategory = useMemo(
    () =>
      categories.find(
        (category) =>
          (category.slug ?? category.id) === filters.category
      ),
    [filters.category]
  );

  const hasFilters = Boolean(
    filters.search ||
      filters.category !== "all" ||
      filters.minPrice !== "" ||
      filters.maxPrice !== ""
  );

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : 0.05,
          },
        },
      }}
      className="relative min-h-screen overflow-x-clip bg-gradient-to-br from-[#061C18] via-[#0B2922] to-[#071E19] text-[#F5EBDD] selection:bg-[#D9BD82]/40"
    >
      {/* Animated emerald background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, 15, 0], y: [0, 20, 0] }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 top-32 h-96 w-96 rounded-full border border-[#D9BD82]/20"
        />

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, -12, 0], y: [0, -18, 0] }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-[650px] h-80 w-80 rounded-full border border-[#D9BD82]/10"
        />

        <div className="absolute left-1/2 top-[35%] h-72 w-72 -translate-x-1/2 rounded-full bg-[#D9BD82]/[0.07] blur-3xl" />

        <div className="absolute right-[10%] top-[75%] h-64 w-64 rounded-full bg-[#174A3D]/20 blur-3xl" />
      </div>

      <motion.section
        id="shop-collection"
        variants={fadeUp}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-10 pt-5 sm:px-6 sm:pt-7 lg:px-8"
      >
        {/* Collection heading */}
        <motion.div
          variants={fadeUp}
          className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#D9BD82]/25 pb-5"
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { rotate: -6, scale: 1.05 }
              }
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D9BD82]/50 bg-gradient-to-br from-[#174A3D] to-[#23614D] text-[#E9D19C] shadow-lg shadow-black/20"
            >
              <FiShoppingBag size={20} />
            </motion.div>

            <div>
              <h1 className="font-serif text-2xl text-[#F5EBDD] sm:text-3xl">
                {activeCategory?.name || "Shop All Jewellery"}
              </h1>

              <p className="mt-1 text-xs text-[#B9B0A1] sm:text-sm">
                Discover jewellery made to be treasured.
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-[#D9BD82]/25 bg-[#102F27]/90 px-4 py-2.5 sm:flex">
            <FiStar size={15} className="text-[#D9BD82]" />
            <span className="text-xs font-medium text-[#F5EBDD]">
              Timeless designs
            </span>
          </div>
        </motion.div>

        {/* Sticky search bar */}
        <motion.div
          variants={fadeUp}
          className="sticky top-16 z-40 -mx-4 mb-5 flex flex-col gap-3 border-b border-[#D9BD82]/25 bg-[#081F1A]/95 px-4 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:-mx-6 sm:flex-row sm:px-6 lg:-mx-8 lg:px-8"
        >
          <div className="group flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-[#D9BD82]/30 bg-[#102F27] px-4 transition-all duration-300 focus-within:border-[#D9BD82] focus-within:shadow-[0_0_0_4px_rgba(217,189,130,0.10)]">
            <FiSearch
              size={18}
              className="shrink-0 text-[#D9BD82] transition-transform duration-300 group-focus-within:scale-110"
            />

            <input
              type="search"
              value={filters.search}
              onChange={(event) =>
                updateFilters({
                  ...filters,
                  search: event.target.value,
                })
              }
              placeholder="Search rings, necklaces, bracelets..."
              aria-label="Search jewellery"
              className="h-12 min-w-0 w-full bg-transparent text-sm text-[#F5EBDD] outline-none placeholder:text-[#9CADA5]"
            />

            {filters.search && (
              <button
                type="button"
                onClick={() =>
                  updateFilters({ ...filters, search: "" })
                }
                aria-label="Clear search"
                className="shrink-0 text-[#B9B0A1] transition-colors hover:text-[#D9BD82]"
              >
                <FiX size={17} />
              </button>
            )}
          </div>

          <motion.button
            type="button"
            onClick={() => setShowFilters((previous) => !previous)}
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            aria-expanded={showFilters}
            aria-controls="shop-filters"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D9BD82]/40 bg-gradient-to-r from-[#174A3D] to-[#23614D] px-5 text-sm font-semibold text-[#FFFDF7] shadow-md shadow-black/20 transition-all duration-300 hover:border-[#D9BD82] hover:from-[#D9BD82] hover:to-[#E9D19C] hover:text-[#123C32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9BD82] lg:hidden"
          >
            {showFilters ? <FiX size={17} /> : <FiSliders size={17} />}
            {showFilters ? "Close Filters" : "Filters"}
          </motion.button>
        </motion.div>

        {/* Shopping layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8">
          {/* Filters sidebar */}
          <motion.aside
            id="shop-filters"
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={transition}
            className={`min-w-0 ${
              showFilters ? "block" : "hidden"
            } lg:sticky lg:top-36 lg:block lg:self-start`}
          >
            <div className="rounded-2xl border border-[#D9BD82]/25 bg-gradient-to-br from-[#10352B] via-[#0B2922] to-[#081F1A] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.22)] sm:p-5">
              <div className="mb-5 flex items-center justify-between border-b border-[#D9BD82]/25 pb-4">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#E7CC91]">
                    Refine your search
                  </h2>

                  <p className="mt-1 text-xs text-[#B9B0A1]">
                    Find your perfect piece
                  </p>
                </div>

                <FiSliders size={18} className="text-[#D9BD82]" />
              </div>

              <ProductFilters
                filters={filters}
                onChange={updateFilters}
                onClear={clearFilters}
              />
            </div>
          </motion.aside>

          {/* Products area */}
          <motion.div variants={fadeUp} className="min-w-0">
            {/* Sorting toolbar */}
            <div className="sticky top-32 z-30 mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#D9BD82]/25 bg-[#0B2922]/95 px-4 py-3 shadow-[0_6px_22px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
              <div className="min-w-0">
                <p className="break-words text-sm font-medium text-[#F5EBDD]">
                  {filters.search
                    ? `Results for "${filters.search}"`
                    : filters.category !== "all"
                      ? `Browsing ${
                          activeCategory?.name || "selected category"
                        }`
                      : "Explore our collection"}
                </p>

                {hasFilters && (
                  <motion.button
                    type="button"
                    whileTap={
                      shouldReduceMotion ? undefined : { scale: 0.96 }
                    }
                    onClick={clearFilters}
                    className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-[#D9BD82] transition-colors hover:text-[#F5EBDD]"
                  >
                    <FiRefreshCw size={12} />
                    Clear all filters
                  </motion.button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden text-xs text-[#B9B0A1] sm:inline">
                  Sort by
                </span>

                <ProductSort
                  value={filters.sort}
                  onChange={(sort) =>
                    updateFilters({ ...filters, sort })
                  }
                />
              </div>
            </div>

            {/* Active filter chips */}
            {hasFilters && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 8,
                }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition}
                className="mb-5 flex flex-wrap gap-2"
              >
                {filters.search && (
                  <button
                    type="button"
                    onClick={() =>
                      updateFilters({ ...filters, search: "" })
                    }
                    className="inline-flex max-w-full items-center gap-2 break-all rounded-lg border border-[#D9BD82]/25 bg-[#12382D] px-3 py-2 text-xs text-[#F5EBDD] transition-colors hover:border-[#D9BD82]"
                  >
                    <span>Search: {filters.search}</span>
                    <FiX className="shrink-0" size={13} />
                  </button>
                )}

                {filters.category !== "all" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateFilters({
                        ...filters,
                        category: "all",
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-[#D9BD82]/25 bg-[#12382D] px-3 py-2 text-xs text-[#F5EBDD] transition-colors hover:border-[#D9BD82]"
                  >
                    {activeCategory?.name || filters.category}
                    <FiX size={13} />
                  </button>
                )}

                {(filters.minPrice !== "" ||
                  filters.maxPrice !== "") && (
                  <button
                    type="button"
                    onClick={() =>
                      updateFilters({
                        ...filters,
                        minPrice: "",
                        maxPrice: "",
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-[#D9BD82]/25 bg-[#12382D] px-3 py-2 text-xs text-[#F5EBDD] transition-colors hover:border-[#D9BD82]"
                  >
                    ₹{filters.minPrice || 0} – ₹
                    {filters.maxPrice || "∞"}
                    <FiX size={13} />
                  </button>
                )}
              </motion.div>
            )}

            {/* Product loader */}
            <motion.div
              key={`${filters.search}-${filters.category}-${filters.sort}-${filters.minPrice}-${filters.maxPrice}`}
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 10,
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
              className="min-w-0 rounded-2xl"
            >
              <InfiniteProductLoader filters={filters} />
            </motion.div>

            {/* Collection footer */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex items-center justify-center gap-3 border-t border-[#D9BD82]/25 pt-6 text-center"
            >
              <span className="h-px w-7 bg-[#D9BD82]/70" />

              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D9BD82] sm:text-xs">
                <FiStar size={14} />
                Made to be treasured
              </p>

              <span className="h-px w-7 bg-[#D9BD82]/70" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.main>
  );
}
