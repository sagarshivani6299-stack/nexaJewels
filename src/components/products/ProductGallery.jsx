
import { useEffect, useState } from "react";

export default function ProductGallery({ product }) {
  const images = [
    product?.image,
    ...(Array.isArray(product?.images) ? product.images : []),
  ].filter(Boolean);

  const uniqueImages = [...new Set(images)];
  const [activeImage, setActiveImage] = useState(uniqueImages[0] ?? "");

  useEffect(() => {
    setActiveImage(uniqueImages[0] ?? "");
  }, [product?.id]);

  if (!product || uniqueImages.length === 0) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center bg-[#F0E8DA] text-sm text-stone-500">
        Product image unavailable
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-4">
      <div className="flex flex-col gap-3">
        {uniqueImages.map((image, index) => (
          <button
            type="button"
            key={`${image}-${index}`}
            onClick={() => setActiveImage(image)}
            aria-label={`View product image ${index + 1}`}
            aria-pressed={activeImage === image}
            className={`aspect-[3/4] overflow-hidden border-2 ${
              activeImage === image
                ? "border-[#173F35]"
                : "border-transparent hover:border-[#D9BD82]"
            }`}
          >
            <img
              src={image}
              alt={`${product.name} view ${index + 1}`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="aspect-[4/5] overflow-hidden bg-[#F0E8DA]">
        <img
          src={activeImage}
          alt={product.name}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
