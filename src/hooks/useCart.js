
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  loadCustomerCart,
  selectCartItems,
  selectCartCount,
  selectCartSubtotal,
} from "../features/cart/cartSlice";

import { selectCustomer } from "../features/auth/authSlice";

export function useCart() {
  const dispatch = useDispatch();
  const customer = useSelector(selectCustomer);
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartSubtotal);

  const customerId = customer?.id == null ? null : String(customer.id);

  useEffect(() => {
    dispatch(loadCustomerCart(customerId));
  }, [dispatch, customerId]);

  const addItem = (product) => dispatch(addToCart(product));

  const removeItem = (productId) =>
    dispatch(removeFromCart(productId));

  const changeQuantity = (productId, quantity) =>
    dispatch(updateQuantity({ productId, quantity }));

  const increaseQuantity = (productId) =>
    dispatch(incrementQuantity(productId));

  const decreaseQuantity = (productId) =>
    dispatch(decrementQuantity(productId));

  const emptyCart = () => dispatch(clearCart());

  return {
    items,
    count,
    subtotal,
    addItem,
    removeItem,
    changeQuantity,
    increaseQuantity,
    decreaseQuantity,
    emptyCart,
    isEmpty: items.length === 0,
  };
}
