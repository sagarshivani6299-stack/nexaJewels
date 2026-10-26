
export default function ProductSkeleton() {
  return (
    <div
      className="min-w-0 animate-pulse"
      aria-label="Loading product"
      role="status"
    >
      <div className="aspect-[4/5] bg-stone-200" />

      <div className="space-y-3 pt-4">
        <div className="h-4 w-4/5 bg-stone-200" />
        <div className="h-3 w-2/5 bg-stone-100" />

        <div className="flex items-center gap-3 pt-1">
          <div className="h-4 w-20 bg-stone-200" />
          <div className="h-3 w-14 bg-stone-100" />
        </div>

        <div className="h-9 w-full bg-stone-100" />
      </div>

      <span className="sr-only">Loading product details...</span>
    </div>
  );
}
