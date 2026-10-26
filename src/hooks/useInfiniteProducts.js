
import { useInfiniteQuery } from "@tanstack/react-query";
import products from "../data/products";
import { getLocalProducts } from "./useProducts";

const PAGE_SIZE = 12;

export function useInfiniteProducts(params = {}) {
  return useInfiniteQuery({
    queryKey: ["infinite-products", params],

    initialPageParam: 0,

    queryFn: async ({ pageParam }) => {
      // Local catalogue mode
      const filteredProducts = getLocalProducts(params);

      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;

      return {
        products: filteredProducts.slice(start, end),
        nextPage:
          end < filteredProducts.length
            ? pageParam + 1
            : undefined,
        total: filteredProducts.length,
      };
    },

    getNextPageParam: (lastPage) => lastPage.nextPage,

    staleTime: 60 * 1000,
  });
}

export { PAGE_SIZE };
