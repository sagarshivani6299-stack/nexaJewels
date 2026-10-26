const API_URL = import.meta.env.VITE_API_URL;

async function request(path, body) {
  if (!API_URL) {
    throw new Error("Authentication backend is not configured.");
  }

  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || "Authentication failed.");
  }

  return result;
}

export function loginCustomer(email, password) {
  return request("/api/auth/login", { email, password });
}

export function registerCustomer({ name, email, password }) {
  return request("/api/auth/register", { name, email, password });
}

export function loginAdmin(email, password) {
  return request("/api/auth/admin/login", { email, password });
}