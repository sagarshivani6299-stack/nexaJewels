
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import EmptyState from "../common/EmptyState";
import ErrorState from "../common/ErrorState";

export default function ProductGrid({
  products = [],
  isLoading = false,
  isError = false,
  onRetry,
  skeletonCount = 8,
  columns = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  emptyTitle = "No pieces found",
  emptyDescription = "Try adjusting your search or filters.",
  onClearFilters,
}) {
  if (isLoading) {
    return (
      <div className={`grid ${columns} gap-4 sm:gap-6`}>
        {Array.from({ length: skeletonCount }, (_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="We couldn't load the collection"
        message="Please check your connection and try again."
        onRetry={onRetry}
        showHomeLink={false}
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={onClearFilters ? "Clear Filters" : "Explore Collection"}
        actionTo="/shop"
        onAction={onClearFilters}
        icon="package"
      />
    );
  }

  return (
    <div className={`grid ${columns} gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
