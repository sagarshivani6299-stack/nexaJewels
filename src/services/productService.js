import products from "../data/products";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchProducts() {
  if (!API_URL) return products;

  const response = await fetch(`${API_URL}/api/products`);

  if (!response.ok) {
    throw new Error("Unable to load the product catalogue.");
  }

  const result = await response.json();
  return Array.isArray(result) ? result : result.products;
}

export async function fetchProductById(id) {
  const allProducts = await fetchProducts();

  const product = allProducts.find(
    (item) => item.id === id || item.slug === id
  );

  if (!product) {
    throw new Error("Product not found.");
  }

  return product;
}