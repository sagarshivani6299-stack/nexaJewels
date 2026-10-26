
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  FiShoppingBag,
  FiHeart,
  FiMenu,
  FiUser,
  FiStar,
  FiLogOut,
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { logoutCustomer, selectCustomer, selectIsCustomerLoggedIn } from "../../features/auth/authSlice";
import MobileMenu from "./MobileMenu";

const links = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customer = useSelector(selectCustomer);
  const isLoggedIn = useSelector(selectIsCustomerLoggedIn);

  const { count: cartCount = 0 } = useCart();
  const { count: wishlistCount = 0 } = useWishlist();

  const hoverAnimation = shouldReduceMotion
    ? {}
    : { y: -2, transition: { duration: 0.2 } };

  const customerName =
    customer?.name ||
    customer?.fullName ||
    customer?.firstName ||
    customer?.email?.split("@")[0] ||
    "My Account";

  const getLoginPath = () =>
    `/login?redirect=${encodeURIComponent(
      window.location.pathname + window.location.search
    )}`;

  const handleProtectedNavigation = (path, feature) => {
    setMenuOpen(false);

    if (!isLoggedIn) {
      toast(`Please log in to access your ${feature}.`, {
        action: {
          label: "Log in",
          onClick: () => navigate(
            `/login?redirect=${encodeURIComponent(path)}`
          ),
        },
      });
      return;
    }

    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logoutCustomer());
    setMenuOpen(false);
    toast.success("You have been logged out.");
    navigate("/", { replace: true });
  };

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? false : { y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.55,
          ease: "easeOut",
        }}
        className="nexa-navbar sticky top-0 z-50 w-full border-b border-[#D9BD82]/25 bg-gradient-to-r from-[#09251E] via-[#123D31] to-[#09251E] text-[#FFFDF7] shadow-[0_8px_35px_rgba(5,25,19,0.28)]"
      >
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D9BD82] to-transparent" />

        <div className="container-wide mx-auto flex min-h-[76px] items-center justify-between gap-3 px-4 sm:px-6 lg:min-h-[86px] lg:px-10 xl:px-12">
          <motion.button
            type="button"
            whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#F4E5BE] transition-colors hover:border-[#D9BD82]/50 hover:bg-[#D9BD82]/10 lg:hidden"
          >
            <FiMenu size={22} strokeWidth={1.7} />
          </motion.button>

          <Link
            to="/"
            aria-label="NexaJewels home"
            className="group flex shrink-0 items-center gap-2.5"
          >
            <motion.div
              whileHover={
                shouldReduceMotion ? undefined : { rotate: -7, scale: 1.05 }
              }
              transition={{ duration: 0.25 }}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#D9BD82]/65 bg-gradient-to-br from-[#EAD8A7] via-[#C5A565] to-[#8D6A35] text-[#12372F] shadow-[0_0_22px_rgba(217,189,130,0.14)] sm:h-12 sm:w-12"
            >
              <span className="font-serif text-xl font-bold">N</span>
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#123D31] bg-[#FFF1C7]" />
            </motion.div>

            <span className="flex flex-col">
              <span className="font-serif text-[24px] font-semibold leading-none tracking-[0.13em] text-[#FFFDF7] transition-colors duration-300 group-hover:text-[#EAD39B] sm:text-[29px]">
                NEXA
              </span>
              <span className="mt-1.5 text-[8px] font-medium uppercase tracking-[0.37em] text-[#D9BD82] sm:text-[9px]">
                Fine Jewellery
              </span>
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex xl:gap-3"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `group relative px-3 py-3 text-[13px] font-medium tracking-wide transition-colors duration-300 xl:px-4 xl:text-sm ${
                    isActive
                      ? "text-[#EAD39B]"
                      : "text-white/70 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="relative inline-flex flex-col items-center">
                    {link.label}
                    <motion.span
                      initial={false}
                      animate={{
                        width: isActive ? "100%" : "0%",
                        opacity: isActive ? 1 : 0,
                      }}
                      className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#B89552] to-[#F0DDA9]"
                    />
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5 lg:gap-3">
            {/* Account: login for guests, name for logged-in customers */}
            <motion.div whileHover={hoverAnimation}>
              {isLoggedIn ? (
                <div className="group relative">
                  <button
                    type="button"
                    aria-label={`Account: ${customerName}`}
                    className="flex h-10 max-w-[150px] items-center gap-2 rounded-xl border border-[#D9BD82]/40 bg-white/[0.04] px-2.5 text-[#F5E8C8] transition hover:bg-[#D9BD82]/10 sm:max-w-[190px] sm:px-3"
                  >
                    <FiUser size={19} />
                    <span className="max-w-[105px] truncate text-xs font-medium sm:max-w-[140px]">
                      {customerName}
                    </span>
                  </button>

                  <div className="invisible absolute right-0 top-full z-50 w-48 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="rounded-xl border border-[#D9BD82]/25 bg-[#0B2A21] p-2 shadow-xl">
                      <Link
                        to="/profile"
                        className="block rounded-lg px-3 py-2.5 text-sm text-white/80 transition hover:bg-white/5 hover:text-[#EAD39B]"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block rounded-lg px-3 py-2.5 text-sm text-white/80 transition hover:bg-white/5 hover:text-[#EAD39B]"
                      >
                        My Orders
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-300 transition hover:bg-red-400/10"
                      >
                        <FiLogOut size={15} />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to={getLoginPath()}
                  aria-label="Log in to your account"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 px-2.5 text-[#F5E8C8] transition-all duration-300 hover:border-[#D9BD82]/50 hover:bg-[#D9BD82]/10 sm:px-3"
                >
                  <FiUser size={19} />
                  <span className="hidden text-xs font-medium md:inline">
                    Login
                  </span>
                </Link>
              )}
            </motion.div>

            {/* Wishlist */}
            <motion.div whileHover={hoverAnimation}>
              <button
                type="button"
                onClick={() =>
                  handleProtectedNavigation("/wishlist", "wishlist")
                }
                aria-label={`Wishlist, ${wishlistCount} items`}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-[#F5E8C8] transition-all duration-300 hover:border-[#D9BD82]/50 hover:bg-[#D9BD82]/10"
              >
                <FiHeart
                  size={21}
                  strokeWidth={1.7}
                  className={
                    wishlistCount > 0
                      ? "fill-[#E8A0A0] text-[#F3B4B4]"
                      : ""
                  }
                />
                {isLoggedIn && wishlistCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border border-[#12372F] bg-[#D9BD82] px-1 text-[9px] font-bold text-[#12372F] shadow-md">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </button>
            </motion.div>

            {/* Shopping bag */}
            <motion.div whileHover={hoverAnimation}>
              <button
                type="button"
                onClick={() =>
                  handleProtectedNavigation("/cart", "shopping bag")
                }
                aria-label={`Shopping bag, ${cartCount} items`}
                className="group relative inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#D9BD82]/65 bg-gradient-to-r from-[#D9BD82] to-[#F0DDA9] px-3 text-[#12372F] shadow-[0_4px_18px_rgba(217,189,130,0.12)] transition-all duration-300 hover:border-[#FFF0C9] hover:from-[#F0DDA9] hover:to-[#FFF0C9] sm:px-3.5"
              >
                <FiShoppingBag size={20} strokeWidth={1.8} />
                <span className="hidden text-xs font-bold tracking-wide sm:inline">
                  Bag
                </span>
                <span className="flex h-[21px] min-w-[21px] items-center justify-center rounded-full bg-[#12372F] px-1 text-[10px] font-bold text-[#FFF5D9]">
                  {isLoggedIn
                    ? cartCount > 99
                      ? "99+"
                      : cartCount
                    : 0}
                </span>
              </button>
            </motion.div>
          </div>
        </div>

        <div className="hidden border-t border-white/[0.07] bg-black/[0.08] sm:block">
          <div className="container-wide mx-auto flex items-center justify-center gap-2 px-4 py-2 text-center text-[9px] font-medium uppercase tracking-[0.19em] text-white/65 sm:text-[10px]">
            <FiStar className="text-[#D9BD82]" size={12} />
            Crafted for your most treasured moments
            <FiStar className="text-[#D9BD82]" size={12} />
          </div>
        </div>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={links}
      />

      {/* Mobile account shortcut */}
      <motion.div
        initial={false}
        animate={{
          opacity: menuOpen ? 0 : 1,
          scale: menuOpen ? 0.9 : 1,
        }}
        className="pointer-events-none fixed bottom-5 right-4 z-40 sm:hidden"
      >
        {isLoggedIn ? (
          <button
            type="button"
            onClick={() => navigate("/profile")}
            aria-label="Open my profile"
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#D9BD82]/60 bg-gradient-to-br from-[#174A3D] to-[#09251E] text-[#EAD39B] shadow-[0_8px_25px_rgba(5,25,19,0.3)]"
          >
            <FiUser size={21} />
          </button>
        ) : (
          <Link
            to={getLoginPath()}
            aria-label="Log in to your account"
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#D9BD82]/60 bg-gradient-to-br from-[#174A3D] to-[#09251E] text-[#EAD39B] shadow-[0_8px_25px_rgba(5,25,19,0.3)]"
          >
            <FiUser size={21} />
          </Link>
        )}
      </motion.div>
    </>
  );
}
