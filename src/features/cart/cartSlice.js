
import { createSlice } from "@reduxjs/toolkit";
import { loadCart, saveCart } from "./cartStorage";

const initialState = {
  ownerId: null,
  items: [],
};

const normalizeId = (id) =>
  id === undefined || id === null ? "" : String(id);

function persist(state) {
  if (state.ownerId != null) {
    saveCart(state.ownerId, state.items);
  }
}

function normalizeStock(stock) {
  if (stock === undefined || stock === null || stock === "") {
    return null;
  }

  const value = Number(stock);
  return Number.isFinite(value) && value >= 0 ? value : null;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    loadCustomerCart(state, action) {
      const customerId = action.payload;

      state.ownerId =
        customerId === undefined || customerId === null
          ? null
          : String(customerId);

      state.items = state.ownerId ? loadCart(state.ownerId) : [];
    },

    addToCart(state, action) {
      const product = action.payload;

      if (state.ownerId == null || !product || product.id == null) {
        return;
      }

      const productId = normalizeId(product.id);
      const stock = normalizeStock(product.stock);

      if (stock !== null && stock < 1) return;

      const existingItem = state.items.find(
        (item) => normalizeId(item.id) === productId
      );

      const requested = Math.max(
        1,
        Math.floor(Number(product.quantity) || 1)
      );

      if (existingItem) {
        const nextQuantity = existingItem.quantity + requested;

        existingItem.quantity =
          existingItem.stock !== null
            ? Math.min(nextQuantity, existingItem.stock)
            : nextQuantity;
      } else {
        const quantity =
          stock !== null ? Math.min(requested, stock) : requested;

        if (quantity < 1) return;

        state.items.push({
          id: productId,
          name: product.name ?? "Product",
          slug: product.slug ?? "",
          price: Math.max(0, Number(product.price) || 0),
          image: product.image ?? product.images?.[0] ?? product.Image ?? "",
          category: product.category ?? "",
          quantity,
          stock,
        });
      }

      persist(state);
    },

    removeFromCart(state, action) {
      if (state.ownerId == null) return;

      state.items = state.items.filter(
        (item) => normalizeId(item.id) !== normalizeId(action.payload)
      );

      persist(state);
    },

    updateQuantity(state, action) {
      if (state.ownerId == null) return;

      const { id, productId, quantity } = action.payload ?? {};
      const targetId = productId ?? id;

      if (targetId == null) return;

      const item = state.items.find(
        (product) => normalizeId(product.id) === normalizeId(targetId)
      );

      if (!item) return;

      const requested = Math.floor(Number(quantity));

      if (!Number.isFinite(requested) || requested < 1) return;

      if (item.stock !== null) {
        item.quantity = Math.min(requested, item.stock);
      } else {
        item.quantity = requested;
      }

      if (item.quantity < 1) {
        state.items = state.items.filter(
          (product) => normalizeId(product.id) !== normalizeId(targetId)
        );
      }

      persist(state);
    },

    incrementQuantity(state, action) {
      if (state.ownerId == null) return;

      const item = state.items.find(
        (product) =>
          normalizeId(product.id) === normalizeId(action.payload)
      );

      if (!item) return;

      if (item.stock !== null && item.quantity >= item.stock) return;

      item.quantity += 1;
      persist(state);
    },

    decrementQuantity(state, action) {
      if (state.ownerId == null) return;

      const id = normalizeId(action.payload);

      const item = state.items.find(
        (product) => normalizeId(product.id) === id
      );

      if (!item) return;

      if (item.quantity <= 1) {
        state.items = state.items.filter(
          (product) => normalizeId(product.id) !== id
        );
      } else {
        item.quantity -= 1;
      }

      persist(state);
    },

    clearCart(state) {
      if (state.ownerId == null) return;

      state.items = [];
      persist(state);
    },

    replaceCart(state, action) {
      if (state.ownerId == null) return;

      state.items = Array.isArray(action.payload) ? action.payload : [];
      persist(state);
    },
  },
});

export const {
  loadCustomerCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  replaceCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

export default cartSlice.reducer;
