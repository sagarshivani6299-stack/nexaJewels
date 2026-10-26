
const ORDERS_KEY = "nexacart_orders";
const CURRENT_USER_KEY = "nexacart_current_user";

function readOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "null");
  } catch {
    return null;
  }
}

function requireUser() {
  const user = getCurrentUser();

  if (!user) {
    throw new Error("Please log in to continue.");
  }

  return user;
}

function getOrderOwner(order) {
  return order.userId ?? order.user?.id ?? order.userId;
}

function requireAdmin() {
  const user = requireUser();

  if (user.role !== "admin") {
    throw new Error("Admin access required.");
  }

  return user;
}

export const ordersApi = {
  async getMyOrders(params = {}) {
    const user = requireUser();

    let orders = readOrders().filter(
      (order) => String(getOrderOwner(order)) === String(user.id)
    );

    if (params.status) {
      orders = orders.filter((order) => order.status === params.status);
    }

    return orders;
  },

  async getOrderById(id) {
    const user = requireUser();

    const order = readOrders().find(
      (item) =>
        String(item.id) === String(id) &&
        String(getOrderOwner(item)) === String(user.id)
    );

    if (!order) {
      throw new Error("Order not found.");
    }

    return order;
  },

  async createOrder(orderData) {
    const user = requireUser();
    const orders = readOrders();

    const order = {
      ...orderData,
      id: crypto.randomUUID(),
      userId: user.id,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    orders.unshift(order);
    saveOrders(orders);

    return order;
  },

  async cancelOrder(id) {
    const user = requireUser();
    const orders = readOrders();

    const index = orders.findIndex(
      (order) =>
        String(order.id) === String(id) &&
        String(getOrderOwner(order)) === String(user.id)
    );

    if (index === -1) {
      throw new Error("Order not found.");
    }

    if (!["Pending", "Processing"].includes(orders[index].status)) {
      throw new Error("This order can no longer be cancelled.");
    }

    orders[index] = {
      ...orders[index],
      status: "Cancelled",
      cancelledAt: new Date().toISOString(),
    };

    saveOrders(orders);

    return orders[index];
  },

  async getAllOrders(params = {}) {
    requireAdmin();

    let orders = readOrders();

    if (params.status) {
      orders = orders.filter((order) => order.status === params.status);
    }

    return orders;
  },

  async updateOrderStatus(id, status) {
    requireAdmin();

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      throw new Error("Invalid order status.");
    }

    const orders = readOrders();
    const index = orders.findIndex(
      (order) => String(order.id) === String(id)
    );

    if (index === -1) {
      throw new Error("Order not found.");
    }

    orders[index] = { ...orders[index], status };
    saveOrders(orders);

    return orders[index];
  },
};
