
import { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiArrowRight,
  FiShield,
  FiTruck,
  FiHeart,
} from "react-icons/fi";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

import { authApi } from "../../api/auth.api";
import { setCustomerSession } from "../../features/auth/authSlice";
import { validateEmail } from "../../utils/validators";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.login({
        email,
        password,
      });

      // Supports local authApi and common API response formats.
      const data =
        response?.data?.data ??
        response?.data ??
        response;

      const customer = data?.customer ?? data?.user;

      if (!customer || !customer.id) {
        throw new Error(
          "Unable to retrieve your account details. Please try again."
        );
      }

      // Local demo authentication may not return a server JWT.
      const token =
        data?.token ??
        data?.accessToken ??
        "local-session";

      // Save the customer session.
      dispatch(
        setCustomerSession({
          customer,
          token,
        })
      );

      toast.success(
        `Welcome back, ${customer.name || "to NexaJewels"}!`
      );

      // Prefer the page requested before login.
      // Supports both location.state.from and ?redirect=.
      const redirectFromState = location.state?.from;

      const redirectFromQuery = searchParams.get("redirect");

      const requestedPath = redirectFromState
        ? `${redirectFromState.pathname ?? ""}${
            redirectFromState.search ?? ""
          }${redirectFromState.hash ?? ""}`
        : redirectFromQuery || "/";

      // Prevent external or protocol-relative redirects.
      const destination =
        requestedPath.startsWith("/") &&
        !requestedPath.startsWith("//")
          ? requestedPath
          : "/";

      navigate(destination, {
        replace: true,
      });
    } catch (error) {
      console.error("Customer login failed:", error);

      toast.error(
        error?.message ||
          "Unable to sign in. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#071B15] text-white">
      {/* Animated background */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-500/15 blur-[110px]"
        animate={{
          x: [0, 70, 0],
          y: [0, 45, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-amber-400/10 blur-[110px]"
        animate={{
          x: [0, -55, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-2">
        {/* Jewellery image section */}
        <motion.section
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden min-h-screen overflow-hidden lg:block"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=85"
            alt="NexaJewels jewellery collection"
            className="absolute inset-0 h-full w-full object-cover"
            animate={{ scale: [1, 1.055, 1] }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#061710] via-[#071B15]/30 to-[#071B15]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071B15]/30 to-transparent" />

          {/* Brand */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7 }}
            className="absolute left-10 top-9 flex items-center gap-3"
          >
            <span className="text-4xl text-amber-300">✧</span>

            <div>
              <p className="font-serif text-3xl tracking-wide">
                NexaJewels
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.42em] text-amber-200">
                Timeless Elegance
              </p>
            </div>
          </motion.div>

          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="absolute bottom-16 left-10 right-10 xl:left-16"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
              Welcome back
            </p>

            <h1 className="mt-5 max-w-xl font-serif text-5xl leading-tight xl:text-6xl">
              The pieces you love,
              <span className="block italic text-amber-200">
                all in one place.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
              Sign in to revisit your favourites and continue
              your jewellery journey.
            </p>

            <div className="mt-10 flex flex-wrap gap-7 xl:gap-10">
              {[
                {
                  Icon: FiHeart,
                  label: "Premium",
                  sub: "Collections",
                },
                {
                  Icon: FiTruck,
                  label: "Fast & Secure",
                  sub: "Delivery",
                },
                {
                  Icon: FiShield,
                  label: "Trusted",
                  sub: "Shopping",
                },
              ].map(({ Icon, label, sub }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-300/60 text-amber-300">
                    <Icon size={19} />
                  </span>

                  <div>
                    <p className="text-xs font-semibold">{label}</p>
                    <p className="mt-1 text-xs text-white/60">{sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Login form */}
        <section className="relative flex min-h-screen items-center justify-center px-5 py-12 sm:px-10 lg:px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            {/* Mobile brand */}
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-3 lg:hidden"
            >
              <span className="text-4xl text-amber-300">✧</span>
              <span className="font-serif text-3xl">
                NexaJewels
              </span>
            </Link>

            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/30 bg-amber-300/10 text-2xl text-amber-300"
              >
                ✧
              </motion.div>

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Your NexaJewels Account
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Welcome Back
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/55">
                Enter your details to access your account and
                discover your favourite collections.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white/85"
                >
                  Email Address
                </label>

                <div className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-4 transition-all duration-300 focus-within:border-emerald-300 focus-within:bg-emerald-300/[0.06] focus-within:shadow-[0_0_25px_rgba(52,211,153,0.09)]">
                  <FiMail className="shrink-0 text-white/45 transition group-focus-within:text-emerald-300" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={updateField}
                    placeholder="you@example.com"
                    className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/30"
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-white/85"
                >
                  Password
                </label>

                <div className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-4 transition-all duration-300 focus-within:border-emerald-300 focus-within:bg-emerald-300/[0.06] focus-within:shadow-[0_0_25px_rgba(52,211,153,0.09)]">
                  <FiLock className="shrink-0 text-white/45 transition group-focus-within:text-emerald-300" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={form.password}
                    onChange={updateField}
                    placeholder="Enter your password"
                    className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/30"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="text-white/45 transition hover:text-amber-300"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>

                <div className="mt-3 flex justify-end">
                  <Link
                    to="/login"
                    className="text-xs text-amber-300/90 transition hover:text-amber-200 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </motion.div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.015, y: -2 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="group flex w-full items-center justify-center gap-3 rounded-xl border border-emerald-300/30 bg-gradient-to-r from-emerald-800 via-emerald-700 to-[#124C39] px-5 py-4 text-sm font-semibold shadow-[0_8px_30px_rgba(16,185,129,0.12)] transition-shadow duration-300 hover:shadow-[0_8px_35px_rgba(16,185,129,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="text-amber-300">✧</span>
                {loading ? "Signing in..." : "Sign In"}
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/35">
                or
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <p className="text-center text-sm text-white/55">
              New to NexaJewels?{" "}
              <Link
                to="/register"
                className="font-semibold text-amber-300 transition hover:text-amber-200 hover:underline"
              >
                Create an account <span aria-hidden="true">→</span>
              </Link>
            </p>

            <p className="mt-8 text-center text-xs leading-6 text-white/35">
              Your account experience is subject to our{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-amber-300"
              >
                privacy policy
              </Link>{" "}
              and{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-amber-300"
              >
                terms
              </Link>.
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
