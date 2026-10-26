
export function readStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);

    if (value === null) return fallback;

    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function clearStorageKeys(keys = []) {
  keys.forEach((key) => removeStorage(key));
}

// Legacy cart storage helpers.
// The current Cart page uses Redux Toolkit.
export function getCart() {
  return readStorage("nj_cart", []);
}

export function saveCart(cart) {
  return writeStorage("nj_cart", cart);
}

export function clearCart() {
  return saveCart([]);
}

// Customer storage
export function getCustomer() {
  return (
    readStorage("nj_customer") ??
    readStorage("customer") ??
    readStorage("currentCustomer")
  );
}

// Orders storage
export function getOrders() {
  const orders = readStorage("nj_orders", []);
  return Array.isArray(orders) ? orders : [];
}

export function saveOrders(orders) {
  return writeStorage("nj_orders", orders);
}

export function getOrderById(orderId) {
  if (!orderId) return null;

  const orders = getOrders();

  return (
    orders.find(
      (order) =>
        String(order.id) === String(orderId) ||
        String(order._id) === String(orderId) ||
        String(order.orderNumber) === String(orderId)
    ) || null
  );
}
