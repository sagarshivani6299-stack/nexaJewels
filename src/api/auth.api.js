
const USERS_KEY = "nexacart_users";
const CURRENT_USER_KEY = "nexacart_current_user";

function getUsers() {
  try {
    const value = localStorage.getItem(USERS_KEY);
    const users = value ? JSON.parse(value) : [];
    return Array.isArray(users) ? users : [];
  } catch (error) {
    console.error("Unable to read users:", error);
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSafeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

export const authApi = {
  async register(userDetails) {
    const users = getUsers();
    const name = String(userDetails.name ?? "").trim();
    const email = String(userDetails.email ?? "").trim().toLowerCase();
    const password = String(userDetails.password ?? "");

    if (!name || !email || !password) {
      throw new Error("Name, email and password are required.");
    }

    if (users.some(
      (user) => String(user.email ?? "").toLowerCase() === email
    )) {
      throw new Error("An account with this email already exists.");
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      role: "user",
    };

    users.push(newUser);
    saveUsers(users);

    const safeUser = getSafeUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

    return {
      user: safeUser,
      message: "Registration successful.",
    };
  },

  async login(credentials) {
    const email = String(credentials.email ?? "").trim().toLowerCase();
    const password = String(credentials.password ?? "");

    const user = getUsers().find(
      (item) =>
        String(item.email ?? "").toLowerCase() === email &&
        item.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const safeUser = getSafeUser(user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

    return {
      user: safeUser,
      message: "Login successful.",
    };
  },

  async getProfile() {
    try {
      const user = JSON.parse(
        localStorage.getItem(CURRENT_USER_KEY) || "null"
      );

      if (!user) {
        throw new Error("Please log in to continue.");
      }

      return { user };
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error("Saved session is invalid. Please log in again.");
      }
      throw error;
    }
  },

  async updateProfile(profile) {
    const currentUser = JSON.parse(
      localStorage.getItem(CURRENT_USER_KEY) || "null"
    );

    if (!currentUser) {
      throw new Error("Please log in to continue.");
    }

    const users = getUsers();
    const index = users.findIndex(
      (user) => user.id === currentUser.id
    );

    if (index === -1) {
      throw new Error("User account not found.");
    }

    const { id, email, password, role, ...safeUpdates } = profile;

    users[index] = {
      ...users[index],
      ...safeUpdates,
    };

    saveUsers(users);

    const safeUser = getSafeUser(users[index]);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

    return {
      user: safeUser,
      message: "Profile updated successfully.",
    };
  },

  async logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    return { message: "Logout successful." };
  },
};
