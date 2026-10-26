
import {
  readStorage,
  writeStorage,
  removeStorage,
} from "../../utils/storage";

const CUSTOMER_STORAGE_KEY = "nexajewels_customer";
const CUSTOMER_TOKEN_KEY = "nexajewels_customer_token";
const ADMIN_STORAGE_KEY = "nexajewels_admin";
const ADMIN_TOKEN_KEY = "nexajewels_admin_token";

export function loadCustomer() {
  return readStorage(CUSTOMER_STORAGE_KEY, null);
}

export function saveCustomer(customer) {
  return writeStorage(CUSTOMER_STORAGE_KEY, customer);
}

export function clearCustomer() {
  removeStorage(CUSTOMER_STORAGE_KEY);
  removeStorage(CUSTOMER_TOKEN_KEY);
}

export function loadCustomerToken() {
  return readStorage(CUSTOMER_TOKEN_KEY, null);
}

export function saveCustomerToken(token) {
  return writeStorage(CUSTOMER_TOKEN_KEY, token);
}

export function loadAdmin() {
  return readStorage(ADMIN_STORAGE_KEY, null);
}

export function saveAdmin(admin) {
  return writeStorage(ADMIN_STORAGE_KEY, admin);
}

export function clearAdmin() {
  removeStorage(ADMIN_STORAGE_KEY);
  removeStorage(ADMIN_TOKEN_KEY);
}

export function loadAdminToken() {
  return readStorage(ADMIN_TOKEN_KEY, null);
}

export function saveAdminToken(token) {
  return writeStorage(ADMIN_TOKEN_KEY, token);
}
