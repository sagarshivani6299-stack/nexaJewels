
import { useEffect, useRef } from "react";
import { useInfiniteProducts } from "../../hooks/useInfiniteProducts";
import ProductGrid from "./ProductGrid";
import ProductSkeleton from "./ProductSkeleton";

export default function InfiniteProductLoader({
  filters = {},
}) {
  const observerTarget = useRef(null);

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteProducts(filters);

  useEffect(() => {
    const target = observerTarget.current;

    if (!target || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {Array.from({ length: 8 }, (_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <section className="py-12 text-center">
        <p className="text-sm text-stone-600">
          {error?.message || "Unable to load products."}
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 bg-[#173F35] px-6 py-3 text-sm font-semibold text-white hover:bg-[#245B4D]"
        >
          Try Again
        </button>
      </section>
    );
  }

  const products =
    data?.pages.flatMap((page) => page.products) ?? [];

  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-stone-500">
        No jewellery matches these filters. Try another selection.
      </p>
    );
  }

  return (
    <div>
      <ProductGrid products={products} />

      {hasNextPage && (
        <div
          ref={observerTarget}
          className="flex min-h-24 items-center justify-center"
        >
          {isFetchingNextPage && (
            <p role="status" className="text-sm text-stone-500">
              Loading more jewellery...
            </p>
          )}
        </div>
      )}

      {!hasNextPage && (
        <p className="py-10 text-center text-sm text-stone-500">
          You have explored the entire collection.
        </p>
      )}
    </div>
  );
}
