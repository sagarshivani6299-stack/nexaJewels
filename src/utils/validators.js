
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    String(email ?? "").trim()
  );
}

export function validatePassword(password) {
  return (
    typeof password === "string" &&
    password.length >= 8
  );
}

export function validateName(name) {
  return (
    typeof name === "string" &&
    name.trim().length >= 2
  );
}

export function validatePhone(phone) {
  const normalized = String(phone ?? "").replace(/[\s()-]/g, "");

  return /^\+?[0-9]{10,15}$/.test(normalized);
}

export function validateRequired(value) {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  return value !== null && value !== undefined && value !== "";
}

export function validateRegistration(form) {
  const errors = {};

  if (!validateName(form.name)) {
    errors.name = "Please enter your full name.";
  }

  if (!validateEmail(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!validatePassword(form.password)) {
    errors.password = "Password must contain at least 8 characters.";
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  // Compatible with the existing Register.jsx:
  // returns true when valid, otherwise returns an error message.
  if (Object.keys(errors).length > 0) {
    return Object.values(errors)[0];
  }

  return true;
}
