
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
  FiArrowRight,
  FiHeart,
  FiShield,
  FiGift,
} from "react-icons/fi";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

import { authApi } from "../../api/auth.api";
import { setCustomerSession } from "../../features/auth/authSlice";
import { validateRegistration } from "../../utils/validators";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const benefits = [
  {
    Icon: FiHeart,
    title: "Your Wishlist",
    detail: "Save pieces you love",
  },
  {
    Icon: FiGift,
    title: "Personal Experience",
    detail: "Shopping made special",
  },
  {
    Icon: FiShield,
    title: "Your Account",
    detail: "Manage your orders",
  },
];

function AnimatedLetters({ text, className = "", reducedMotion }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          aria-hidden="true"
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: reducedMotion ? 0 : index * 0.035,
            ease: "easeOut",
          }}
          className="inline-block whitespace-pre"
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducedMotion = useReducedMotion();

  const [form, setForm] = useState(initialForm);
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

    if (loading) return;

    // Validate all registration fields.
    const validation = validateRegistration({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      confirmPassword: form.confirmPassword,
    });

    // Supports validators that return true, a string, or an errors object.
    if (validation !== true) {
      const validationMessage =
        typeof validation === "string"
          ? validation
          : validation && typeof validation === "object"
            ? Object.values(validation).find(
                (message) => typeof message === "string"
              )
            : null;

      toast.error(
        validationMessage ||
          "Please check your details and try again."
      );
      return;
    }

    // Explicit password confirmation check.
    if (form.password !== form.confirmPassword) {
      toast.error("Your passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.register({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      // Support common response formats:
      // { user }, { customer }, { data: { user } }, or an API response.
      const data =
        response?.data?.data ??
        response?.data ??
        response;

      const customer =
        data?.customer ??
        data?.user ??
        data?.profile ??
        (data?.id && data?.email ? data : null);

      const token =
        data?.token ??
        data?.accessToken ??
        "local-session";

      if (!customer) {
        throw new Error(
          data?.message ||
            "Registration response did not contain user details. Please check auth.api.js."
        );
      }

      // Save the customer session in Redux.
      dispatch(
        setCustomerSession({
          customer,
          token,
        })
      );

      toast.success(
        "Welcome to NexaJewels! Your account is ready."
      );

      // Clear the form after successful registration.
      setForm(initialForm);

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Registration failed:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "We couldn't create your account. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const fieldAnimation = (delay) => ({
    initial: reducedMotion ? false : { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    transition: {
      duration: 0.5,
      delay: reducedMotion ? 0 : delay,
      ease: "easeOut",
    },
  });

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#071B15] text-white">
      {/* Animated emerald background */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-400/15 blur-[110px]"
        animate={
          reducedMotion
            ? {}
            : {
                x: [0, 65, 0],
                y: [0, 45, 0],
                scale: [1, 1.2, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-10 h-96 w-96 rounded-full bg-amber-400/10 blur-[120px]"
        animate={
          reducedMotion
            ? {}
            : {
                x: [0, -45, 0],
                y: [0, -35, 0],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-2">
        {/* LEFT: Jewellery image and brand story */}
        <motion.section
          initial={reducedMotion ? false : { opacity: 0, x: -45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative hidden min-h-screen overflow-hidden lg:block"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=85"
            alt="Elegant gold jewellery collection"
            className="absolute inset-0 h-full w-full object-cover"
            initial={reducedMotion ? false : { scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#061710] via-[#071B15]/35 to-[#071B15]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071B15]/35 to-transparent" />

          {/* Brand */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
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

          {/* Animated storytelling */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -65 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.85,
              ease: "easeOut",
            }}
            className="absolute bottom-16 left-10 right-10 xl:left-16"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
              Begin Something Beautiful
            </p>

            <h1 className="mt-5 max-w-xl font-serif text-5xl leading-tight xl:text-6xl">
              <span className="block">
                <AnimatedLetters
                  text="Your Story."
                  reducedMotion={reducedMotion}
                />
              </span>

              <span className="mt-1 block italic text-amber-200">
                <AnimatedLetters
                  text="Your Style."
                  reducedMotion={reducedMotion}
                />
              </span>

              <span className="mt-1 block">
                <AnimatedLetters
                  text="Your Collection."
                  reducedMotion={reducedMotion}
                />
              </span>
            </h1>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="mt-5 max-w-md text-sm leading-7 text-white/75"
            >
              Create your account and keep your favourite jewellery,
              orders and special discoveries together.
            </motion.p>

            <div className="mt-9 flex flex-wrap gap-6 xl:gap-8">
              {benefits.map(({ Icon, title, detail }, index) => (
                <motion.div
                  key={title}
                  initial={
                    reducedMotion ? false : { opacity: 0, y: 20 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reducedMotion ? 0 : 0.8 + index * 0.15,
                    duration: 0.55,
                  }}
                  whileHover={reducedMotion ? {} : { y: -5 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-300/60 text-amber-300">
                    <Icon size={19} />
                  </span>

                  <div>
                    <p className="text-xs font-semibold">{title}</p>
                    <p className="mt-1 text-xs text-white/60">
                      {detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating decorative gold particles */}
          {!reducedMotion &&
            [0, 1, 2, 3, 4].map((item) => (
              <motion.span
                key={item}
                aria-hidden="true"
                className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_15px_rgba(252,211,77,0.8)]"
                style={{
                  left: `${18 + item * 15}%`,
                  top: `${25 + (item % 3) * 17}%`,
                }}
                animate={{
                  y: [0, -18, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3 + item * 0.6,
                  repeat: Infinity,
                  delay: item * 0.4,
                  ease: "easeInOut",
                }}
              />
            ))}
        </motion.section>

        {/* RIGHT: Registration form */}
        <section className="relative flex min-h-screen items-center justify-center px-5 py-12 sm:px-10 lg:px-12 xl:px-16">
          <motion.div
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 35, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-lg"
          >
            {/* Mobile brand */}
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-3 lg:hidden"
            >
              <span className="text-4xl text-amber-300">✧</span>
              <span className="font-serif text-3xl">NexaJewels</span>
            </Link>

            <motion.div
              initial={
                reducedMotion ? false : { opacity: 0, scale: 0.7 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/30 bg-amber-300/10 text-2xl text-amber-300"
            >
              ✧
            </motion.div>

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
              Join NexaJewels
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              <AnimatedLetters
                text="Create Your Account"
                reducedMotion={reducedMotion}
              />
            </h2>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-4 text-sm leading-7 text-white/55"
            >
              A few details are all we need to get your journey started.
            </motion.p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
              noValidate
            >
              {/* Full name */}
              <motion.div {...fieldAnimation(0.2)}>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-white/85"
                >
                  Full Name
                </label>

                <div className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-4 transition-all duration-300 focus-within:border-emerald-300 focus-within:bg-emerald-300/[0.06] focus-within:shadow-[0_0_25px_rgba(52,211,153,0.09)]">
                  <FiUser className="shrink-0 text-white/45 transition group-focus-within:text-emerald-300" />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={updateField}
                    placeholder="Your full name"
                    className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/30"
                  />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div {...fieldAnimation(0.3)}>
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
              <motion.div {...fieldAnimation(0.4)}>
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
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={form.password}
                    onChange={updateField}
                    placeholder="At least 8 characters"
                    className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/30"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="text-white/45 transition hover:text-amber-300"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </motion.div>

              {/* Confirm password */}
              <motion.div {...fieldAnimation(0.5)}>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-white/85"
                >
                  Confirm Password
                </label>

                <div className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-4 transition-all duration-300 focus-within:border-emerald-300 focus-within:bg-emerald-300/[0.06]">
                  <FiLock className="shrink-0 text-white/45 transition group-focus-within:text-emerald-300" />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={form.confirmPassword}
                    onChange={updateField}
                    placeholder="Re-enter your password"
                    className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/30"
                  />
                </div>
              </motion.div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={
                  reducedMotion || loading
                    ? {}
                    : { scale: 1.015, y: -2 }
                }
                whileTap={
                  reducedMotion || loading ? {} : { scale: 0.98 }
                }
                className="group flex w-full items-center justify-center gap-3 rounded-xl border border-emerald-300/30 bg-gradient-to-r from-emerald-800 via-emerald-700 to-[#124C39] px-5 py-4 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(16,185,129,0.12)] transition-shadow duration-300 hover:shadow-[0_8px_35px_rgba(16,185,129,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="text-amber-300">✧</span>

                {loading ? "Creating Account..." : "Create Account"}

                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </form>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-7 text-center text-sm text-white/55"
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-amber-300 transition hover:text-amber-200 hover:underline"
              >
                Sign in →
              </Link>
            </motion.p>

            <p className="mt-8 text-center text-xs leading-6 text-white/35">
              By creating an account, you agree to our shopping policies.
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
