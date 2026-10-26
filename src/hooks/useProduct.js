
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../api/products.api";
import products from "../data/products";

const USE_API = import.meta.env.VITE_USE_API === "true";

export function useProduct(identifier) {
  return useQuery({
    queryKey: ["product", identifier],

    queryFn: async () => {
      if (!identifier) {
        throw new Error("Product identifier is required.");
      }

      if (USE_API) {
        const response = await productsApi.getProductById(
          identifier
        );

        return response.data?.product ?? response.data;
      }

      const product = products.find(
        (item) =>
          String(item.id) === String(identifier) ||
          item.slug === identifier
      );

      if (!product) {
        throw new Error("Product not found.");
      }

      return product;
    },

    enabled: Boolean(identifier),
    staleTime: 60 * 1000,
  });
}
