
const STORAGE_KEY = "nexacart_products";

function readProducts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export const productsApi = {
  async getProducts(params = {}) {
    let products = readProducts();
    const { search, category, sort, page, limit } = params;

    if (search) {
      const term = String(search).toLowerCase();
      products = products.filter((product) =>
        `${product.name || ""} ${product.description || ""}`
          .toLowerCase()
          .includes(term)
      );
    }

    if (category && category !== "All") {
      products = products.filter(
        (product) => product.category === category
      );
    }

    if (sort === "price-asc") {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      products.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    }

    const total = products.length;
    const pageNumber = Math.max(1, Number(page) || 1);
    const pageSize = Math.max(1, Number(limit) || total || 1);

    if (page || limit) {
      products = products.slice(
        (pageNumber - 1) * pageSize,
        pageNumber * pageSize
      );
    }

    return { products, total };
  },

  async getProductById(id) {
    const product = readProducts().find(
      (item) => String(item.id) === String(id)
    );

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  },

  async createProduct(product) {
    const products = readProducts();
    const newProduct = {
      ...product,
      id: product.id || crypto.randomUUID(),
    };

    products.push(newProduct);
    saveProducts(products);

    return newProduct;
  },

  async updateProduct(id, updates) {
    const products = readProducts();
    const index = products.findIndex(
      (item) => String(item.id) === String(id)
    );

    if (index === -1) {
      throw new Error("Product not found");
    }

    products[index] = { ...products[index], ...updates };
    saveProducts(products);

    return products[index];
  },

  async deleteProduct(id) {
    const products = readProducts();
    const updatedProducts = products.filter(
      (item) => String(item.id) !== String(id)
    );

    if (updatedProducts.length === products.length) {
      throw new Error("Product not found");
    }

    saveProducts(updatedProducts);
    return { success: true, id };
  },
};
