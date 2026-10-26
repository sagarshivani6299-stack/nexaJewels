
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../api/products.api";
import products from "../data/products";

const USE_API = import.meta.env.VITE_USE_API === "true";

const getLocalProducts = (params = {}) => {
  const {
    category = "all",
    search = "",
    minPrice,
    maxPrice,
    sort = "featured",
  } = params;

  let result = [...products];

  // 1. Category filter
  if (category && category !== "all") {
    const selectedCategory = String(category)
      .trim()
      .toLowerCase();

    const selectedSlug = selectedCategory
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    result = result.filter((product) => {
      const productCategory = String(product.category ?? "")
        .trim()
        .toLowerCase();

      const productSlug = productCategory
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      return (
        productCategory === selectedCategory ||
        productSlug === selectedSlug
      );
    });
  }

  // 2. Search filter
  if (String(search).trim()) {
    const term = String(search).trim().toLowerCase();

    result = result.filter((product) => {
      const searchableFields = [
        product.name,
        product.category,
        product.description,
        product.material,
      ];

      return searchableFields.some((value) =>
        String(value ?? "").toLowerCase().includes(term)
      );
    });
  }

  // 3. Minimum price
  if (minPrice !== undefined && minPrice !== "") {
    const minimum = Number(minPrice);

    if (Number.isFinite(minimum)) {
      result = result.filter(
        (product) => Number(product.price) >= minimum
      );
    }
  }

  // 4. Maximum price
  if (maxPrice !== undefined && maxPrice !== "") {
    const maximum = Number(maxPrice);

    if (Number.isFinite(maximum)) {
      result = result.filter(
        (product) => Number(product.price) <= maximum
      );
    }
  }

  // 5. Sorting
  switch (sort) {
    case "price-low":
      result.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
      break;

    case "price-high":
      result.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
      break;

    case "rating":
      result.sort(
        (a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0)
      );
      break;

    case "newest":
      result.sort(
        (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew))
      );
      break;

    case "featured":
    default:
      result.sort(
        (a, b) =>
          Number(Boolean(b.featured)) -
          Number(Boolean(a.featured))
      );
      break;
  }

  return result;
};

export function useProducts(params = {}) {
  return useQuery({
    queryKey: ["products", params],

    queryFn: async () => {
      if (USE_API) {
        const response = await productsApi.getProducts(params);
        const data = response.data;

        if (Array.isArray(data)) {
          return data;
        }

        if (Array.isArray(data?.products)) {
          return data.products;
        }

        throw new Error(
          "Invalid products API response format."
        );
      }

      return getLocalProducts(params);
    },

    staleTime: 60 * 1000,
  });
}

export { getLocalProducts };
