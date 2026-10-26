
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../api/products.api";
import products from "../data/products";

const USE_API = import.meta.env.VITE_USE_API === "true";

export function useProduct(identifier) {
  const query = useQuery({
    queryKey: ["product", identifier],

    queryFn: async () => {
      if (!identifier) {
        throw new Error("Product ID is missing from the URL.");
      }

      const value = decodeURIComponent(String(identifier)).trim();

      let found;

      if (USE_API) {
        const response = await productsApi.getProductById(value);
        const data = response.data;

        found =
          data?.product ??
          data?.data?.product ??
          data?.data ??
          data;

        if (Array.isArray(found)) {
          found = found.find(
            (item) =>
              String(item.id ?? item._id ?? item.productId ?? "") === value ||
              String(item.slug ?? "") === value
          );
        }
      } else {
        found = products.find((item) =>
          [
            item.id,
            item._id,
            item.productId,
            item.slug,
          ].some(
            (itemIdentifier) =>
              itemIdentifier != null &&
              String(itemIdentifier).trim() === value
          )
        );
      }

      if (!found) {
        throw new Error(`Product "${value}" was not found.`);
      }

      console.log("Product successfully loaded:", found);

      return found;
    },

    enabled: Boolean(identifier),
    staleTime: 60 * 1000,
    retry: false,
  });

  return {
    ...query,
    product: query.data,
  };
}
