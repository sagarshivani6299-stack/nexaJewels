
import { useEffect, useState } from "react";

export default function ProductGallery({ product }) {
  const images = [
    product?.image,
    product?.Image,
    product?.imageUrl,
    ...(Array.isArray(product?.images) ? product.images : []),
  ].filter(
    (image) => typeof image === "string" && image.trim() !== ""
  );

  const uniqueImages = [...new Set(images)];
  const [activeImage, setActiveImage] = useState("");

  const [failedImages, setFailedImages] = useState([]);

  useEffect(() => {
    setActiveImage(uniqueImages[0] ?? "");
    setFailedImages([]);
  }, [product?.id]);

  const handleImageError = (image) => {
    setFailedImages((previous) =>
      previous.includes(image) ? previous : [...previous, image]
    );

    if (activeImage === image) {
      const nextImage = uniqueImages.find(
        (item) => item !== image && !failedImages.includes(item)
      );

      setActiveImage(nextImage ?? "");
    }
  };

  const availableImages = uniqueImages.filter(
    (image) => !failedImages.includes(image)
  );

  if (!product || availableImages.length === 0) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center bg-[#F0E8DA] p-6 text-center text-sm text-stone-500">
        Product image unavailable. Please check the product image URL.
      </div>
    );
  }

  const displayedImage = availableImages.includes(activeImage)
    ? activeImage
    : availableImages[0];

  return (
    <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-4">
      <div className="flex flex-col gap-3">
        {availableImages.map((image, index) => (
          <button
            type="button"
            key={`${image}-${index}`}
            onClick={() => setActiveImage(image)}
            aria-label={`View product image ${index + 1}`}
            aria-pressed={displayedImage === image}
            className={`aspect-[3/4] overflow-hidden border-2 ${
              displayedImage === image
                ? "border-[#173F35]"
                : "border-transparent hover:border-[#D9BD82]"
            }`}
          >
            <img
              src={image}
              alt={`${product.name} view ${index + 1}`}
              loading="lazy"
              onError={() => handleImageError(image)}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="aspect-[4/5] overflow-hidden bg-[#F0E8DA]">
        <img
          key={displayedImage}
          src={displayedImage}
          alt={product.name}
          onError={() => handleImageError(displayedImage)}
          fetchPriority="high"
          className="h-full w-full object-cover transition duration-300"
        />
      </div>
    </div>
  );
}
