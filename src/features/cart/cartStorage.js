
const CART_STORAGE_PREFIX = "nexajewels_cart_";

function getCartKey(customerId) {
  if (customerId === undefined || customerId === null || String(customerId).trim() === "") {
    return null;
  }

  return `${CART_STORAGE_PREFIX}${encodeURIComponent(String(customerId))}`;
}

export function loadCart(customerId) {
  const key = getCartKey(customerId);
  if (!key || typeof localStorage === "undefined") return [];

  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");

    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (item) =>
          item &&
          item.id != null &&
          String(item.id).trim() !== "" &&
          Number.isFinite(Number(item.price)) &&
          Number(item.price) >= 0 &&
          Number.isInteger(Number(item.quantity)) &&
          Number(item.quantity) > 0
      )
      .map((item) => ({
        ...item,
        id: String(item.id),
        price: Number(item.price),
        quantity: Number(item.quantity),
        stock:
          item.stock == null || !Number.isFinite(Number(item.stock))
            ? null
            : Number(item.stock),
      }));
  } catch (error) {
    console.error("Unable to load customer cart:", error);
    return [];
  }
}

export function saveCart(customerId, items) {
  const key = getCartKey(customerId);

  if (!key || typeof localStorage === "undefined") return false;

  try {
    localStorage.setItem(key, JSON.stringify(Array.isArray(items) ? items : []));
    return true;
  } catch (error) {
    console.error("Unable to save customer cart:", error);
    return false;
  }
}

export function clearCartStorage(customerId) {
  const key = getCartKey(customerId);

  if (!key || typeof localStorage === "undefined") return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Unable to clear customer cart storage:", error);
  }
}
