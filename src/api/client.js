
const STORAGE_KEYS = {
  users: "nexacart_users",
  currentUser: "nexacart_current_user",
  adminToken: "nexajewels_admin_token",
};

export function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || "[]");
  } catch {
    return [];
  }
}

export function saveStoredUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

export function getCurrentUser() {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEYS.currentUser) || "null"
    );
  } catch {
    return null;
  }
}

export function saveCurrentUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  }
}

export function clearCurrentUser() {
  localStorage.removeItem(STORAGE_KEYS.currentUser);
}

export { STORAGE_KEYS };
