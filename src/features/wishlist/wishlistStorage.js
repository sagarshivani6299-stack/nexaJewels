
const WISHLIST_STORAGE_PREFIX = "nexajewels_wishlist_";

function getWishlistKey(customerId) {
  if (
    customerId === undefined ||
    customerId === null ||
    String(customerId).trim() === ""
  ) {
    return null;
  }

  return `${WISHLIST_STORAGE_PREFIX}${encodeURIComponent(String(customerId))}`;
}

export function loadWishlist(customerId) {
  const key = getWishlistKey(customerId);

  if (!key || typeof localStorage === "undefined") return [];

  try {
    const items = JSON.parse(localStorage.getItem(key) || "[]");

    if (!Array.isArray(items)) return [];

    return items.filter(
      (item) => item && item.id != null && String(item.id).trim() !== ""
    );
  } catch (error) {
    console.error("Unable to load customer wishlist:", error);
    return [];
  }
}

export function saveWishlist(customerId, items) {
  const key = getWishlistKey(customerId);

  if (!key || typeof localStorage === "undefined") return false;

  try {
    localStorage.setItem(
      key,
      JSON.stringify(Array.isArray(items) ? items : [])
    );
    return true;
  } catch (error) {
    console.error("Unable to save customer wishlist:", error);
    return false;
  }
}

export function clearWishlistStorage(customerId) {
  const key = getWishlistKey(customerId);

  if (!key || typeof localStorage === "undefined") return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Unable to clear customer wishlist:", error);
  }
}
