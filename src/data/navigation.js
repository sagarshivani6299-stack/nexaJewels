
export const mainNavigation = [
  { label: "Home", path: "/" },
  { label: "Shop All", path: "/shop" },
  { label: "Necklaces", path: "/shop?category=necklaces" },
  { label: "Earrings", path: "/shop?category=earrings" },
  { label: "Rings", path: "/shop?category=rings" },
  { label: "Bridal", path: "/shop?category=bridal" },
];

export const accountNavigation = [
  { label: "My Profile", path: "/profile" },
  { label: "My Orders", path: "/orders" },
  { label: "Wishlist", path: "/wishlist" },
];

export const footerNavigation = {
  explore: [
    { label: "Shop All", path: "/shop" },
    { label: "About NexaJewels", path: "/about" },
    { label: "Contact Us", path: "/contact" },
  ],
  customerCare: [
    { label: "Frequently Asked Questions", path: "/faq" },
    { label: "Shipping & Returns", path: "/shipping-returns" },
    { label: "My Orders", path: "/orders" },
  ],
  account: [
    { label: "Sign In", path: "/login" },
    { label: "Create Account", path: "/register" },
    { label: "My Wishlist", path: "/wishlist" },
  ],
};

export const adminNavigation = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Manage Products", path: "/admin/products" },
  { label: "Add Product", path: "/admin/products/add" },
  { label: "Manage Orders", path: "/admin/orders" },
  { label: "Customers", path: "/admin/customers" },
  { label: "Settings", path: "/admin/settings" },
];
