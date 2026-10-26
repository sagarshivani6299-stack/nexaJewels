
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  loadCustomerWishlist,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  selectWishlistItems,
  selectWishlistCount,
  selectIsWishlisted,
} from "../features/wishlist/wishlistSlice";

import { selectCustomer } from "../features/auth/authSlice";

export function useWishlist() {
  const dispatch = useDispatch();
  const customer = useSelector(selectCustomer);

  const items = useSelector(selectWishlistItems);
  const count = useSelector(selectWishlistCount);

  const customerId = customer?.id == null ? null : String(customer.id);

  useEffect(() => {
    dispatch(loadCustomerWishlist(customerId));
  }, [dispatch, customerId]);

  const addItem = (product) => dispatch(addToWishlist(product));

  const removeItem = (productId) =>
    dispatch(removeFromWishlist(productId));

  const toggleItem = (product) => dispatch(toggleWishlist(product));

  const emptyWishlist = () => dispatch(clearWishlist());

  const isWishlisted = (productId) =>
    Boolean(selectIsWishlisted({ wishlist: { items } }, productId));

  return {
    items,
    count,
    addItem,
    removeItem,
    toggleItem,
    emptyWishlist,
    isWishlisted,
    isEmpty: items.length === 0,
  };
}
