
import { createSlice } from "@reduxjs/toolkit";
import { loadWishlist, saveWishlist } from "./wishlistStorage";

const initialState = {
  ownerId: null,
  items: [],
};

const normalizeId = (id) =>
  id === undefined || id === null ? "" : String(id);

function persist(state) {
  if (state.ownerId != null) {
    saveWishlist(state.ownerId, state.items);
  }
}

function toWishlistProduct(product) {
  return {
    id: normalizeId(product.id),
    name: product.name ?? "Product",
    slug: product.slug ?? "",
    price: Math.max(0, Number(product.price) || 0),
    image: product.image ?? product.images?.[0] ?? product.Image ?? "",
    category: product.category ?? "",
  };
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    loadCustomerWishlist(state, action) {
      const customerId = action.payload;

      state.ownerId =
        customerId === undefined || customerId === null
          ? null
          : String(customerId);

      state.items = state.ownerId ? loadWishlist(state.ownerId) : [];
    },

    addToWishlist(state, action) {
      if (state.ownerId == null) return;

      const product = action.payload;

      if (!product || product.id == null) return;

      const alreadySaved = state.items.some(
        (item) => normalizeId(item.id) === normalizeId(product.id)
      );

      if (alreadySaved) return;

      state.items.push(toWishlistProduct(product));
      persist(state);
    },

    removeFromWishlist(state, action) {
      if (state.ownerId == null) return;

      state.items = state.items.filter(
        (item) => normalizeId(item.id) !== normalizeId(action.payload)
      );

      persist(state);
    },

    toggleWishlist(state, action) {
      if (state.ownerId == null) return;

      const product = action.payload;

      if (!product || product.id == null) return;

      const id = normalizeId(product.id);
      const exists = state.items.some(
        (item) => normalizeId(item.id) === id
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => normalizeId(item.id) !== id
        );
      } else {
        state.items.push(toWishlistProduct(product));
      }

      persist(state);
    },

    clearWishlist(state) {
      if (state.ownerId == null) return;

      state.items = [];
      persist(state);
    },

    replaceWishlist(state, action) {
      if (state.ownerId == null) return;

      state.items = Array.isArray(action.payload)
        ? action.payload.filter((item) => item && item.id != null)
        : [];

      persist(state);
    },
  },
});

export const {
  loadCustomerWishlist,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  replaceWishlist,
} = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;

export const selectWishlistCount = (state) => state.wishlist.items.length;

export const selectIsWishlisted = (state, productId) =>
  state.wishlist.items.some(
    (item) => normalizeId(item.id) === normalizeId(productId)
  );

export default wishlistSlice.reducer;
