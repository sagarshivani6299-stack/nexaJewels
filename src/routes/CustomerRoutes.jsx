
import { Routes, Route } from "react-router-dom";
import CustomerLayout from "../layouts/CustomerLayout";

import Home from "../pages/customer/Home";
import Shop from "../pages/customer/Shop";
import ProductDetails from "../pages/customer/ProductDetails";
import Cart from "../pages/customer/Cart";
import Wishlist from "../pages/customer/Wishlist";
import Checkout from "../pages/customer/Checkout";
import Login from "../pages/customer/Login";
import Register from "../pages/customer/Register";
import Profile from "../pages/customer/Profile";
import Orders from "../pages/customer/Orders";
import OrderDetails from "../pages/customer/OrderDetails";
import OrderSuccess from "../pages/customer/OrderSuccess";
import About from "../pages/customer/About";
import Contact from "../pages/customer/Contact";
import FAQ from "../pages/customer/FAQ";
import ShippingReturns from "../pages/customer/ShippingReturns";
import NotFound from "../pages/customer/NotFound";

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Checkout route added */}
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/shipping-returns" element={<ShippingReturns />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
